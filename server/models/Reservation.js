const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true, trim: true, maxlength: 100 },
    email:  { type: String, trim: true, lowercase: true, default: '' },
    phone:  { type: String, required: true, trim: true },
    date:   { type: String, required: true },  // stored as YYYY-MM-DD string
    time:   { type: String, required: true },  // stored as HH:MM string
    guests: { type: String, required: true },
    notes:  { type: String, trim: true, maxlength: 500, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
