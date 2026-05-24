import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import MenuCard from '../components/MenuCard';
import { useMenu } from '../hooks/useMenu';
import { FiSearch, FiFilter, FiAlertTriangle, FiRefreshCw, FiWifi } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';

const categories = [
  { key: 'all',      label: 'All Items',    icon: '🍽️' },
  { key: 'starters', label: 'Starters',     icon: '🥗' },
  { key: 'mains',    label: 'Main Course',  icon: '🍛' },
  { key: 'desserts', label: 'Desserts',     icon: '🍮' },
  { key: 'drinks',   label: 'Beverages',    icon: '🥤' },
];

// ── Skeleton card shown while loading ────────────────────────
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton--image" />
    <div className="skeleton-card__body">
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--text" />
      <div className="skeleton skeleton--text skeleton--text-short" />
      <div className="skeleton-card__footer">
        <div className="skeleton skeleton--price" />
        <div className="skeleton skeleton--btn" />
      </div>
    </div>
  </div>
);

// ── Error / offline banner ────────────────────────────────────
const ErrorBanner = ({ message, isFallback, onRetry }) => (
  <div className={`menu-alert ${isFallback ? 'menu-alert--warn' : 'menu-alert--error'}`}>
    <div className="menu-alert__icon">
      {isFallback ? <FiWifi /> : <FiAlertTriangle />}
    </div>
    <div className="menu-alert__body">
      <p className="menu-alert__title">
        {isFallback
          ? 'Showing saved menu — live data unavailable'
          : 'Could not load the menu'}
      </p>
      <p className="menu-alert__msg">
        {isFallback
          ? 'Prices and availability may differ. Check back when you\'re online.'
          : message}
      </p>
    </div>
    <button className="menu-alert__retry" onClick={onRetry}>
      <FiRefreshCw /> Retry
    </button>
  </div>
);

const Menu = () => {
  const { menuData, loading, error, isFallback, refetch } = useMenu();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch]                 = useState('');
  const [dietFilter, setDietFilter]         = useState('all');

  // ── Filtering ─────────────────────────────────────────────
  const getAllItems = () => {
    if (!menuData) return [];
    return Object.entries(menuData).flatMap(([category, items]) =>
      items.map(item => ({ ...item, category }))
    );
  };

  const getFilteredItems = () => {
    if (!menuData) return [];

    let items = activeCategory === 'all'
      ? getAllItems()
      : (menuData[activeCategory] || []).map(item => ({ ...item, category: activeCategory }));

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    if (dietFilter === 'veg')    items = items.filter(item =>  item.isVeg);
    if (dietFilter === 'nonveg') items = items.filter(item => !item.isVeg);

    return items;
  };

  const filteredItems  = getFilteredItems();
  const skeletonCount  = 8;

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
            <p>
              Explore our diverse collection of dishes crafted with passion, fresh
              ingredients, and time-honoured recipes from across India.
            </p>
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
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="menu-filters__diet">
              <FiFilter />
              <select value={dietFilter} onChange={e => setDietFilter(e.target.value)}>
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

      {/* Alert banner (offline / error) */}
      {(error || isFallback) && (
        <div className="container">
          <ErrorBanner message={error} isFallback={isFallback} onRetry={refetch} />
        </div>
      )}

      {/* Menu Items */}
      <section className="menu-items section">
        <div className="container">
          {/* Loading skeletons */}
          {loading && (
            <div className="menu-items__grid">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Loaded content */}
          {!loading && (
            <>
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
                      <MenuCard key={`${item.name}-${item.category}`} item={item} index={i} />
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
