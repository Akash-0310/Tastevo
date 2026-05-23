import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import MenuCard from '../components/MenuCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';

const menuData = {
  starters: [
    {
      name: 'Paneer Tikka',
      price: 279,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Chunky paneer marinated in aromatic spices, grilled in tandoor with bell peppers and onions.',
      rating: 5,
      reviews: 324,
      isPopular: true,
    },
    {
      name: 'Chicken 65',
      price: 249,
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
      isVeg: false,
      description: 'Spicy, deep-fried chicken bites seasoned with fiery red chillies, curry leaves and ginger.',
      rating: 4,
      reviews: 218,
    },
    {
      name: 'Veg Spring Rolls',
      price: 199,
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Crispy golden rolls stuffed with julienned vegetables, served with sweet chilli sauce.',
      rating: 4,
      reviews: 156,
    },
    {
      name: 'Tandoori Prawns',
      price: 449,
      image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop',
      isVeg: false,
      description: 'Jumbo prawns marinated in tandoori masala, chargrilled to smoky perfection.',
      rating: 5,
      reviews: 189,
      isPopular: true,
    },
    {
      name: 'Hara Bhara Kebab',
      price: 219,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Spinach and green pea patties with aromatic spices, served with mint chutney.',
      rating: 4,
      reviews: 142,
      isNew: true,
    },
    {
      name: 'Fish Amritsari',
      price: 349,
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
      isVeg: false,
      description: 'Crispy battered fish fillets spiced with ajwain and amchur, a Punjabi classic.',
      rating: 5,
      reviews: 201,
    },
  ],
  mains: [
    {
      name: 'Butter Chicken',
      price: 349,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
      isVeg: false,
      description: 'Tender chicken pieces simmered in a rich, creamy tomato-butter gravy with aromatic spices.',
      rating: 5,
      reviews: 567,
      isPopular: true,
    },
    {
      name: 'Hyderabadi Biryani',
      price: 399,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      isVeg: false,
      description: 'Fragrant basmati rice layered with succulent meat, saffron, and secret dum spices.',
      rating: 5,
      reviews: 489,
      isPopular: true,
    },
    {
      name: 'Paneer Butter Masala',
      price: 299,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Soft paneer cubes in a velvety cashew-tomato gravy, mildly spiced and aromatic.',
      rating: 5,
      reviews: 412,
      isPopular: true,
    },
    {
      name: 'Masala Dosa',
      price: 149,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Golden crispy crepe stuffed with spiced potato masala, served with sambar and chutneys.',
      rating: 4,
      reviews: 378,
    },
    {
      name: 'Lamb Rogan Josh',
      price: 449,
      image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=400&h=300&fit=crop',
      isVeg: false,
      description: 'Kashmiri-style slow-cooked lamb in a rich gravy of fennel, ginger, and Kashmiri chillies.',
      rating: 5,
      reviews: 234,
      isNew: true,
    },
    {
      name: 'Dal Makhani',
      price: 249,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Black lentils slow-cooked overnight with butter and cream, a timeless North Indian classic.',
      rating: 5,
      reviews: 356,
    },
    {
      name: 'Chettinad Chicken',
      price: 379,
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
      isVeg: false,
      description: 'Bold South Indian curry made with freshly ground spices and coconut.',
      rating: 4,
      reviews: 198,
    },
    {
      name: 'Veg Thali',
      price: 329,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'A complete meal with dal, sabzi, rice, roti, raita, papad, and sweet — a feast on a plate.',
      rating: 5,
      reviews: 445,
      isPopular: true,
    },
  ],
  desserts: [
    {
      name: 'Gulab Jamun',
      price: 129,
      image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Soft, golden milk-solid dumplings soaked in rose and cardamom flavoured sugar syrup.',
      rating: 5,
      reviews: 312,
      isPopular: true,
    },
    {
      name: 'Rasmalai',
      price: 159,
      image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Delicate cottage cheese patties floating in chilled saffron-cardamom flavoured milk.',
      rating: 5,
      reviews: 267,
    },
    {
      name: 'Chocolate Lava Cake',
      price: 249,
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Warm, gooey chocolate cake with a molten centre, served with vanilla ice cream.',
      rating: 5,
      reviews: 389,
      isPopular: true,
    },
    {
      name: 'Kulfi Falooda',
      price: 179,
      image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Traditional Indian ice cream with falooda sev, rose syrup, and basil seeds.',
      rating: 4,
      reviews: 198,
      isNew: true,
    },
  ],
  drinks: [
    {
      name: 'Mango Lassi',
      price: 129,
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Creamy yogurt blended with fresh Alphonso mango pulp and a hint of cardamom.',
      rating: 5,
      reviews: 423,
      isPopular: true,
    },
    {
      name: 'Masala Chai',
      price: 79,
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Aromatic Indian tea brewed with ginger, cardamom, cinnamon, and cloves.',
      rating: 5,
      reviews: 534,
      isPopular: true,
    },
    {
      name: 'Fresh Lime Soda',
      price: 99,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Refreshing lime juice mixed with sparkling soda — sweet, salty, or mixed.',
      rating: 4,
      reviews: 278,
    },
    {
      name: 'Cold Coffee',
      price: 149,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Thick, creamy iced coffee blended with milk and a scoop of ice cream on top.',
      rating: 4,
      reviews: 312,
    },
    {
      name: 'Virgin Mojito',
      price: 169,
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
      isVeg: true,
      description: 'Refreshing mix of fresh mint, lime, sugar, and sparkling water over crushed ice.',
      rating: 4,
      reviews: 256,
      isNew: true,
    },
  ],
};

const categories = [
  { key: 'all', label: 'All Items', icon: '🍽️' },
  { key: 'starters', label: 'Starters', icon: '🥗' },
  { key: 'mains', label: 'Main Course', icon: '🍛' },
  { key: 'desserts', label: 'Desserts', icon: '🍮' },
  { key: 'drinks', label: 'Beverages', icon: '🥤' },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [dietFilter, setDietFilter] = useState('all');

  const getAllItems = () => {
    const all = [];
    Object.entries(menuData).forEach(([category, items]) => {
      items.forEach(item => all.push({ ...item, category }));
    });
    return all;
  };

  const getFilteredItems = () => {
    let items = activeCategory === 'all'
      ? getAllItems()
      : menuData[activeCategory].map(item => ({ ...item, category: activeCategory }));

    if (search) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dietFilter === 'veg') {
      items = items.filter(item => item.isVeg);
    } else if (dietFilter === 'nonveg') {
      items = items.filter(item => !item.isVeg);
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="menu-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=600&fit=crop"
            alt="Restaurant ambience"
          />
          <div className="page-hero__overlay"></div>
        </div>
        <div className="container page-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__badge">Discover Deliciousness</span>
            <h1>Our Menu</h1>
            <p>Explore our diverse collection of dishes crafted with passion, fresh ingredients, and time-honoured recipes from across India.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="menu-filters">
        <div className="container">
          <div className="menu-filters__bar">
            <div className="menu-filters__search">
              <FiSearch />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="menu-filters__diet">
              <FiFilter />
              <select value={dietFilter} onChange={(e) => setDietFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="veg">Veg Only</option>
                <option value="nonveg">Non-Veg Only</option>
              </select>
            </div>
          </div>

          <div className="menu-filters__categories">
            {categories.map(cat => (
              <motion.button
                key={cat.key}
                className={`menu-filters__cat ${activeCategory === cat.key ? 'menu-filters__cat--active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="menu-filters__cat-icon">{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="menu-items section">
        <div className="container">
          {activeCategory !== 'all' && (
            <AnimatedSection className="section__header">
              <h2 className="section__title">
                {categories.find(c => c.key === activeCategory)?.icon}{' '}
                {categories.find(c => c.key === activeCategory)?.label}
              </h2>
              <p className="menu-items__count">{filteredItems.length} items found</p>
            </AnimatedSection>
          )}

          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={activeCategory + dietFilter + search}
                className="menu-items__grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredItems.map((item, i) => (
                  <MenuCard key={item.name + item.category} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="menu-items__empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MdRestaurantMenu className="menu-items__empty-icon" />
                <h3>No items found</h3>
                <p>Try a different search or filter combination.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Menu;
