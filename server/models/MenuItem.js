const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    category:    { type: String, required: true, enum: ['starters', 'mains', 'desserts', 'drinks'] },
    price:       { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image:       { type: String, default: '' },   // URL; Phase 3: Cloudinary URL
    isVeg:       { type: Boolean, default: false },
    isPopular:   { type: Boolean, default: false },
    isNewItem:   { type: Boolean, default: false },  // renamed: 'isNew' is reserved by Mongoose
    isAvailable: { type: Boolean, default: true },
    rating:      { type: Number, min: 1, max: 5, default: null },
    reviews:     { type: Number, default: 0 },
    sortOrder:   { type: Number, default: 0 },    // for admin ordering
  },
  { timestamps: true }
);

// Index for fast category + availability queries
menuItemSchema.index({ category: 1, isAvailable: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
