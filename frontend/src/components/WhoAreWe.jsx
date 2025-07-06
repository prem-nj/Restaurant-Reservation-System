import React, { useState, useEffect, useRef } from 'react';
import { data } from '../restApi.json';
import { motion, useAnimation } from 'framer-motion';

const WhoAreWe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const sectionRef = useRef(null);
  const controls = useAnimation();

  // Use Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          startCounting();
          // Disconnect after animation starts
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  // Initialize counters state with zeros
  useEffect(() => {
    const initialCounters = {};
    data[0].who_we_are.forEach(item => {
      initialCounters[item.id] = 0;
    });
    setCounters(initialCounters);
  }, []);

  // Start counting animation when section becomes visible
  const startCounting = () => {
    data[0].who_we_are.forEach(item => {
      const target = parseInt(item.number.replace(/\D/g, ''));
      const duration = 2000; // 2 seconds
      const step = Math.ceil(target / (duration / 50)); // Update every 50ms
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [item.id]: current
        }));
      }, 50);
    });
  };

  // Format number with suffix (+ or K+)
  const formatNumber = (item) => {
    const countValue = counters[item.id] || 0;
    const suffix = item.number.includes('K+') ? 'K+' : 
                   item.number.includes('+') ? '+' : '';
    return `${countValue}${suffix}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className='who_are_we' id='who_are_we' ref={sectionRef}>
      <div className="container">
        <motion.div 
          className="heading_section"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading">WHO WE ARE</h1>
          <p>Numbers tell our story of excellence, dedication, and the trust our customers place in us.</p>
        </motion.div>
        <div className="who_are_we_container">
          <div className="left">
            <motion.div 
              className="box"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {data[0].who_we_are.map((element) => (
                <motion.div 
                  className="card" 
                  key={element.id}
                  variants={itemVariants}
                >
                  <div className="stat-content">
                    <h1>{formatNumber(element)}</h1>
                    <div className="stat-icon-container">
                      {element.title === "Restaurants" && 
                        <div className="stat-icon restaurant-icon"></div>}
                      {element.title === "Chef In Kitchen" && 
                        <div className="stat-icon chef-icon"></div>}
                      {element.title === "Years Of Experience" && 
                        <div className="stat-icon experience-icon"></div>}
                      {element.title === "Happy Customers" && 
                        <div className="stat-icon customer-icon"></div>}
                    </div>
                    <p>{element.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div 
            className="right"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img src="/whoweare.png" alt="who we are" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe