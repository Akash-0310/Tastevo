import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdRestaurantMenu } from 'react-icons/md';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container not-found__container">
        <motion.div
          className="not-found__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="not-found__icon"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <MdRestaurantMenu />
          </motion.div>

          <h1 className="not-found__code">404</h1>
          <h2 className="not-found__title">Page Not Found</h2>
          <p className="not-found__desc">
            Looks like this page went off the menu. Let's get you back to
            something delicious.
          </p>

          <div className="not-found__actions">
            <Link to="/" className="btn btn--primary btn--lg">
              <FiHome /> Back to Home
            </Link>
            <Link to="/menu" className="btn btn--outline btn--lg">
              <MdRestaurantMenu /> View Menu
            </Link>
          </div>

          <button
            className="not-found__back"
            onClick={() => window.history.back()}
          >
            <FiArrowLeft /> Go back to previous page
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
