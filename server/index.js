const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Log the contact submission (in production, save to DB or send email)
  console.log('New contact submission:', { name, email, phone, message });

  res.json({ success: true, message: 'Thank you! We will get back to you soon.' });
});

// Newsletter subscription endpoint
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  console.log('New subscription:', email);
  res.json({ success: true, message: 'Successfully subscribed to our newsletter!' });
});

// Reservation endpoint
app.post('/api/reserve', (req, res) => {
  const { name, email, phone, date, time, guests, notes } = req.body;

  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  console.log('New reservation:', { name, email, phone, date, time, guests, notes });
  res.json({ success: true, message: 'Reservation confirmed! We look forward to serving you.' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
