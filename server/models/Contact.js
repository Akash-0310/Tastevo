const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 100 },
    email:   { type: String, required: true, trim: true, lowercase: true },
    phone:   { type: String, trim: true, default: '' },
    message: { type: String, required: true, minlength: 10, maxlength: 1000 },
    read:    { type: Boolean, default: false },   // for future admin panel
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
