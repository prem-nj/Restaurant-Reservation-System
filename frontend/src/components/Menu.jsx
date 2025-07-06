import React, { useState, useEffect, useRef } from 'react';
import { data } from '../restApi.json';
import { BiDish } from 'react-icons/bi';
import { motion } from 'framer-motion';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  // Initialize filtered dishes
  useEffect(() => {
    setFilteredDishes(data[0].dishes);
  }, []);

  // Filter dishes by category
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredDishes(data[0].dishes);
    } else {
      setFilteredDishes(data[0].dishes.filter(dish => dish.category === activeCategory));
    }
  }, [activeCategory]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className='menu' id='menu' ref={menuRef}>
      <div className="container">
        <motion.div 
          className="heading_section"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="heading">POPULAR DISHES</h1>
          <p>Discover our chef's signature creations, crafted with the finest ingredients 
            and served with passion.</p>
        </motion.div>

        <motion.div 
          className="category-filter"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="dishes_container"
          variants={containerVariants}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
        >
          {filteredDishes.map((dish, index) => (
            <motion.div 
              className="dish-card" 
              key={dish.id}
              variants={itemVariants}
            >
              <div className="dish-image-container">
                <img src={dish.image} alt={dish.title} className="dish-image" />
                <div className="dish-overlay">
                  <button className="view-dish-btn">
                    <BiDish className="dish-icon" />
                    View
                  </button>
                </div>
              </div>
              <div className="dish-content">
                <h3>{dish.title}</h3>
                <div className="dish-details">
                  <p className="price">{dish.price}</p>
                  <span className="category-tag">{dish.category}</span>
                </div>
                <div className="dish-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < dish.rating ? "star filled" : "star"}>★</span>
                  ))}
                  <span className="rating-count">({dish.reviews})</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;