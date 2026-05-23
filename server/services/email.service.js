const nodemailer = require('nodemailer');

// ── Transporter factory ───────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT) || 587,
    secure: parseInt(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const FROM_NAME  = process.env.FROM_NAME    || 'Tastevo Restaurant';
const FROM_EMAIL = process.env.FROM_EMAIL   || process.env.SMTP_USER;
const NOTIFY_TO  = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

/** Core send — skips silently if SMTP not configured */
const send = async ({ to, subject, html }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[email] SMTP not configured — skipping: "${subject}" → ${to}`);
    return;
  }
  try {
    const info = await createTransporter().sendMail({
      from:    `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log(`[email] Sent: "${subject}" → ${to} (${info.messageId})`);
  } catch (err) {
    // Email failure must never block the main request
    console.error(`[email] Failed to send "${subject}":`, err.message);
  }
};

// ── Shared template wrapper ───────────────────────────────────
const layout = (bodyHtml) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tastevo</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:#fff;border-radius:12px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:28px 32px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">
              🍽️ Tastevo
            </h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">
              Authentic Flavours, Delivered Fresh
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            ${bodyHtml}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;text-align:center;
                     border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">
              © ${new Date().getFullYear()} Tastevo Restaurant &nbsp;·&nbsp;
              ${process.env.BUSINESS_ADDRESS || ''}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ── Helper: info row in emails ────────────────────────────────
const row = (label, value) =>
  value
    ? `<tr>
        <td style="padding:8px 12px;background:#f8fafc;font-size:13px;
                   color:#64748b;width:120px;vertical-align:top;">${label}</td>
        <td style="padding:8px 12px;background:#f8fafc;font-size:14px;
                   color:#1e293b;font-weight:500;">${value}</td>
       </tr>`
    : '';

const infoTable = (rows) => `
  <table width="100%" cellpadding="0" cellspacing="0"
         style="border-collapse:collapse;border-radius:8px;overflow:hidden;
                border:1px solid #e2e8f0;margin:16px 0;">
    ${rows}
  </table>`;

// ─────────────────────────────────────────────────────────────
// 1. Contact notification → owner
// ─────────────────────────────────────────────────────────────
const sendContactNotification = async ({ name, email, phone, message }) => {
  await send({
    to:      NOTIFY_TO,
    subject: `📬 New Contact Message from ${name}`,
    html:    layout(`
      <h2 style="margin:0 0 8px;color:#1e293b;font-size:20px;">New Contact Message</h2>
      <p style="color:#64748b;margin:0 0 20px;font-size:14px;">
        Someone has submitted the contact form on your website.
      </p>

      ${infoTable(`
        ${row('Name',    name)}
        ${row('Email',   `<a href="mailto:${email}" style="color:#3b82f6;">${email}</a>`)}
        ${row('Phone',   phone || '—')}
        ${row('Sent at', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}
      `)}

      <h3 style="color:#1e293b;font-size:15px;margin:20px 0 8px;">Message</h3>
      <div style="background:#f8fafc;border-left:4px solid #3b82f6;padding:16px;
                  border-radius:0 8px 8px 0;color:#1e293b;font-size:14px;
                  line-height:1.6;white-space:pre-wrap;">${message}</div>

      <p style="margin:24px 0 0;text-align:center;">
        <a href="mailto:${email}?subject=Re: Your message to Tastevo"
           style="display:inline-block;background:#1e40af;color:#fff;
                  text-decoration:none;padding:12px 28px;border-radius:8px;
                  font-weight:600;font-size:14px;">
          Reply to ${name}
        </a>
      </p>
    `),
  });
};

// ─────────────────────────────────────────────────────────────
// 2. Contact auto-reply → customer
// ─────────────────────────────────────────────────────────────
const sendContactAutoReply = async ({ name, email, message }) => {
  await send({
    to:      email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html:    layout(`
      <h2 style="margin:0 0 8px;color:#1e293b;font-size:20px;">
        We received your message!
      </h2>
      <p style="color:#64748b;margin:0 0 20px;font-size:14px;line-height:1.6;">
        Hi <strong>${name}</strong>, thank you for getting in touch with Tastevo.
        We've received your message and our team will get back to you within
        <strong>2–4 business hours</strong>.
      </p>

      <h3 style="color:#1e293b;font-size:15px;margin:0 0 8px;">Your message</h3>
      <div style="background:#f8fafc;border-left:4px solid #3b82f6;padding:16px;
                  border-radius:0 8px 8px 0;color:#64748b;font-size:14px;
                  line-height:1.6;white-space:pre-wrap;">${message}</div>

      <div style="background:#eff6ff;border-radius:10px;padding:20px;margin:24px 0;">
        <p style="margin:0;font-size:14px;color:#1e40af;font-weight:600;">
          Need a faster response?
        </p>
        <p style="margin:6px 0 12px;font-size:13px;color:#3b82f6;">
          Message us directly on WhatsApp for instant replies.
        </p>
        <a href="https://wa.me/${process.env.BUSINESS_WHATSAPP || '919876543210'}"
           style="display:inline-block;background:#25d366;color:#fff;
                  text-decoration:none;padding:10px 20px;border-radius:8px;
                  font-weight:600;font-size:13px;">
          💬 Chat on WhatsApp
        </a>
      </div>

      <p style="color:#94a3b8;font-size:12px;margin:0;">
        If you did not send this message, please ignore this email.
      </p>
    `),
  });
};

// ─────────────────────────────────────────────────────────────
// 3. Reservation notification → owner
// ─────────────────────────────────────────────────────────────
const sendReservationNotification = async ({ name, email, phone, date, time, guests, notes }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  await send({
    to:      NOTIFY_TO,
    subject: `🪑 New Booking — ${name} · ${guests} guests · ${formattedDate}`,
    html:    layout(`
      <h2 style="margin:0 0 8px;color:#1e293b;font-size:20px;">New Table Reservation</h2>
      <p style="color:#64748b;margin:0 0 20px;font-size:14px;">
        A new table has been booked through the website.
      </p>

      ${infoTable(`
        ${row('Guest',      name)}
        ${row('Phone',      `<a href="tel:${phone}" style="color:#3b82f6;">${phone}</a>`)}
        ${row('Email',      email ? `<a href="mailto:${email}" style="color:#3b82f6;">${email}</a>` : '—')}
        ${row('Date',       formattedDate)}
        ${row('Time',       time)}
        ${row('Guests',     guests)}
        ${row('Notes',      notes || '—')}
        ${row('Booked at',  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}
      `)}

      <p style="margin:24px 0 0;text-align:center;">
        <a href="tel:${phone}"
           style="display:inline-block;background:#1e40af;color:#fff;
                  text-decoration:none;padding:12px 28px;border-radius:8px;
                  font-weight:600;font-size:14px;margin-right:8px;">
          📞 Call ${name}
        </a>
        ${email ? `<a href="mailto:${email}"
           style="display:inline-block;background:#64748b;color:#fff;
                  text-decoration:none;padding:12px 28px;border-radius:8px;
                  font-weight:600;font-size:14px;">
          ✉️ Email Guest
        </a>` : ''}
      </p>
    `),
  });
};

// ─────────────────────────────────────────────────────────────
// 4. Reservation confirmation → customer
// ─────────────────────────────────────────────────────────────
const sendReservationConfirmation = async ({ name, email, phone, date, time, guests, notes }) => {
  if (!email) return; // Can't send if no email provided

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  await send({
    to:      email,
    subject: `Your table at Tastevo is confirmed! 🎉`,
    html:    layout(`
      <h2 style="margin:0 0 8px;color:#1e293b;font-size:20px;">
        Reservation Confirmed!
      </h2>
      <p style="color:#64748b;margin:0 0 20px;font-size:14px;line-height:1.6;">
        Hi <strong>${name}</strong>, we're looking forward to seeing you!
        Here's a summary of your booking at Tastevo.
      </p>

      <!-- Booking summary card -->
      <div style="background:linear-gradient(135deg,#1e40af,#3b82f6);
                  border-radius:12px;padding:24px;margin:0 0 24px;color:#fff;">
        <p style="margin:0 0 4px;font-size:12px;opacity:0.8;text-transform:uppercase;
                  letter-spacing:1px;">Your Booking</p>
        <p style="margin:0 0 16px;font-size:22px;font-weight:700;">
          📅 ${formattedDate}
        </p>
        <div style="display:flex;gap:24px;flex-wrap:wrap;">
          <div>
            <p style="margin:0;font-size:11px;opacity:0.8;">TIME</p>
            <p style="margin:2px 0 0;font-size:18px;font-weight:600;">⏰ ${time}</p>
          </div>
          <div>
            <p style="margin:0;font-size:11px;opacity:0.8;">GUESTS</p>
            <p style="margin:2px 0 0;font-size:18px;font-weight:600;">👥 ${guests}</p>
          </div>
        </div>
        ${notes ? `<p style="margin:12px 0 0;font-size:13px;opacity:0.85;">
          📝 Note: ${notes}
        </p>` : ''}
      </div>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;
                  padding:16px;margin:0 0 24px;">
        <p style="margin:0;color:#166534;font-size:14px;font-weight:600;">
          ✅ What to expect
        </p>
        <ul style="margin:8px 0 0;padding-left:18px;color:#15803d;font-size:13px;
                   line-height:1.8;">
          <li>Please arrive 5 minutes before your reserved time</li>
          <li>Your table will be held for 15 minutes after your booking time</li>
          <li>For groups of 6+, please call ahead to confirm</li>
        </ul>
      </div>

      <p style="color:#64748b;font-size:13px;margin:0 0 8px;">
        Need to cancel or change your booking? Contact us:
      </p>
      <p style="margin:0 0 24px;">
        <a href="https://wa.me/${process.env.BUSINESS_WHATSAPP || '919876543210'}?text=I%20need%20to%20change%20my%20reservation"
           style="display:inline-block;background:#25d366;color:#fff;
                  text-decoration:none;padding:10px 20px;border-radius:8px;
                  font-weight:600;font-size:13px;">
          💬 Message us on WhatsApp
        </a>
      </p>

      <p style="color:#94a3b8;font-size:12px;margin:0;border-top:1px solid #f1f5f9;
                padding-top:16px;">
        ${process.env.BUSINESS_ADDRESS || ''} &nbsp;·&nbsp;
        ${process.env.BUSINESS_PHONE || ''}
      </p>
    `),
  });
};

module.exports = {
  sendContactNotification,
  sendContactAutoReply,
  sendReservationNotification,
  sendReservationConfirmation,
};
