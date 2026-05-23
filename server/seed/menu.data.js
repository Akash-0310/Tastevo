/**
 * Seed data for MenuItem collection.
 * Matches the hardcoded data in client/src/pages/Menu.jsx.
 * In Phase 3, the frontend will fetch from /api/menu instead.
 */
const menuItems = [
  // ── Starters ────────────────────────────────────────────────
  { name: 'Paneer Tikka',     category: 'starters', price: 279, isVeg: true,  isPopular: true,  rating: 5, reviews: 324, sortOrder: 1,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
    description: 'Chunky paneer marinated in aromatic spices, grilled in tandoor with bell peppers and onions.' },

  { name: 'Chicken 65',       category: 'starters', price: 249, isVeg: false, rating: 4, reviews: 218, sortOrder: 2,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
    description: 'Spicy, deep-fried chicken bites seasoned with fiery red chillies, curry leaves and ginger.' },

  { name: 'Veg Spring Rolls', category: 'starters', price: 199, isVeg: true,  rating: 4, reviews: 156, sortOrder: 3,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    description: 'Crispy golden rolls stuffed with julienned vegetables, served with sweet chilli sauce.' },

  { name: 'Tandoori Prawns',  category: 'starters', price: 449, isVeg: false, isPopular: true, rating: 5, reviews: 189, sortOrder: 4,
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop',
    description: 'Jumbo prawns marinated in tandoori masala, chargrilled to smoky perfection.' },

  { name: 'Hara Bhara Kebab', category: 'starters', price: 219, isVeg: true,  isNewItem: true,  rating: 4, reviews: 142, sortOrder: 5,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    description: 'Spinach and green pea patties with aromatic spices, served with mint chutney.' },

  { name: 'Fish Amritsari',   category: 'starters', price: 349, isVeg: false, rating: 5, reviews: 201, sortOrder: 6,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
    description: 'Crispy battered fish fillets spiced with ajwain and amchur, a Punjabi classic.' },

  // ── Mains ────────────────────────────────────────────────────
  { name: 'Butter Chicken',       category: 'mains', price: 349, isVeg: false, isPopular: true, rating: 5, reviews: 567, sortOrder: 1,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    description: 'Tender chicken pieces simmered in a rich, creamy tomato-butter gravy with aromatic spices.' },

  { name: 'Hyderabadi Biryani',   category: 'mains', price: 399, isVeg: false, isPopular: true, rating: 5, reviews: 489, sortOrder: 2,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    description: 'Fragrant basmati rice layered with succulent meat, saffron, and secret dum spices.' },

  { name: 'Paneer Butter Masala', category: 'mains', price: 299, isVeg: true,  isPopular: true, rating: 5, reviews: 412, sortOrder: 3,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    description: 'Soft paneer cubes in a velvety cashew-tomato gravy, mildly spiced and aromatic.' },

  { name: 'Masala Dosa',          category: 'mains', price: 149, isVeg: true,  rating: 4, reviews: 378, sortOrder: 4,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    description: 'Golden crispy crepe stuffed with spiced potato masala, served with sambar and chutneys.' },

  { name: 'Lamb Rogan Josh',      category: 'mains', price: 449, isVeg: false, isNewItem: true,  rating: 5, reviews: 234, sortOrder: 5,
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=400&h=300&fit=crop',
    description: 'Kashmiri-style slow-cooked lamb in a rich gravy of fennel, ginger, and Kashmiri chillies.' },

  { name: 'Dal Makhani',          category: 'mains', price: 249, isVeg: true,  rating: 5, reviews: 356, sortOrder: 6,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Black lentils slow-cooked overnight with butter and cream, a timeless North Indian classic.' },

  { name: 'Chettinad Chicken',    category: 'mains', price: 379, isVeg: false, rating: 4, reviews: 198, sortOrder: 7,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
    description: 'Bold South Indian curry made with freshly ground spices and coconut.' },

  { name: 'Veg Thali',            category: 'mains', price: 329, isVeg: true,  isPopular: true, rating: 5, reviews: 445, sortOrder: 8,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    description: 'A complete meal with dal, sabzi, rice, roti, raita, papad, and sweet — a feast on a plate.' },

  // ── Desserts ─────────────────────────────────────────────────
  { name: 'Gulab Jamun',        category: 'desserts', price: 129, isVeg: true, isPopular: true, rating: 5, reviews: 312, sortOrder: 1,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=300&fit=crop',
    description: 'Soft, golden milk-solid dumplings soaked in rose and cardamom flavoured sugar syrup.' },

  { name: 'Rasmalai',           category: 'desserts', price: 159, isVeg: true, rating: 5, reviews: 267, sortOrder: 2,
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop',
    description: 'Delicate cottage cheese patties floating in chilled saffron-cardamom flavoured milk.' },

  { name: 'Chocolate Lava Cake', category: 'desserts', price: 249, isVeg: true, isPopular: true, rating: 5, reviews: 389, sortOrder: 3,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    description: 'Warm, gooey chocolate cake with a molten centre, served with vanilla ice cream.' },

  { name: 'Kulfi Falooda',      category: 'desserts', price: 179, isVeg: true, isNewItem: true, rating: 4, reviews: 198, sortOrder: 4,
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
    description: 'Traditional Indian ice cream with falooda sev, rose syrup, and basil seeds.' },

  // ── Drinks ───────────────────────────────────────────────────
  { name: 'Mango Lassi',    category: 'drinks', price: 129, isVeg: true, isPopular: true, rating: 5, reviews: 423, sortOrder: 1,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop',
    description: 'Creamy yogurt blended with fresh Alphonso mango pulp and a hint of cardamom.' },

  { name: 'Masala Chai',    category: 'drinks', price: 79, isVeg: true, isPopular: true, rating: 5, reviews: 534, sortOrder: 2,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    description: 'Aromatic Indian tea brewed with ginger, cardamom, cinnamon, and cloves.' },

  { name: 'Fresh Lime Soda', category: 'drinks', price: 99, isVeg: true, rating: 4, reviews: 278, sortOrder: 3,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
    description: 'Refreshing lime juice mixed with sparkling soda — sweet, salty, or mixed.' },

  { name: 'Cold Coffee',    category: 'drinks', price: 149, isVeg: true, rating: 4, reviews: 312, sortOrder: 4,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    description: 'Thick, creamy iced coffee blended with milk and a scoop of ice cream on top.' },

  { name: 'Virgin Mojito',  category: 'drinks', price: 169, isVeg: true, isNewItem: true, rating: 4, reviews: 256, sortOrder: 5,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
    description: 'Refreshing mix of fresh mint, lime, sugar, and sparkling water over crushed ice.' },
];

module.exports = menuItems;
