import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BiPlay } from "react-icons/bi";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaStar, FaClock, FaUtensils } from "react-icons/fa";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideChanged, setSlideChanged] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  
  const heroSlides = [
    {
      title: "Exquisite",
      subtitle: "Culinary Experience",
      description: "Discover the perfect blend of traditional flavors and modern gastronomy at our award-winning restaurant",
      image: "./hero1.png",
      accent: "Experience"
    },
    {
      title: "Authentic",
      subtitle: "Fine Dining",
      description: "Where every dish tells a story of passion and culinary excellence crafted by our master chefs",
      image: "./hero2.png",
      accent: "Flavors"
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideChanged(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      
      // Reset animation state after animation completes
      const timer = setTimeout(() => {
        setSlideChanged(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const floatingCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: index => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8,
        delay: 0.6 + (index * 0.2),
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="hero-modern" id="heroSection" ref={ref}>
      <div className="hero-particles">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="floating-elements">
          <motion.div 
            className="float-circle circle-1"
            animate={{
              x: [0, 30, 0, -30, 0],
              y: [0, -30, -10, 20, 0],
              scale: [1, 1.1, 0.9, 1.05, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div 
            className="float-circle circle-2"
            animate={{
              x: [0, -40, -20, 30, 0],
              y: [0, 20, -20, 10, 0],
              scale: [1, 0.9, 1.1, 0.95, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div 
            className="float-circle circle-3"
            animate={{
              x: [0, 20, -10, -20, 0],
              y: [0, -10, 30, -20, 0],
              scale: [1, 1.05, 0.95, 1.1, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>
      
      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="hero-content">
          <div className="hero-text">
            <motion.div 
              className="hero-badge"
              variants={itemVariants}
              custom={1}
            >
              <span className="badge-icon">✨</span>
              <span className="badge-text">Premium Restaurant</span>
            </motion.div>
            
            <div className="hero-title-container">
              <motion.h1 
                className="hero-title"
                variants={itemVariants}
                custom={2}
                animate={slideChanged ? { opacity: [0.5, 1], y: [10, 0] } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="title-line-1">{heroSlides[currentSlide].title}</span>
                <span className="title-line-2">{heroSlides[currentSlide].subtitle}</span>
                <motion.span 
                  className="title-accent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {heroSlides[currentSlide].accent}
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="hero-description"
              variants={itemVariants}
              custom={3}
              animate={slideChanged ? { opacity: [0.5, 1], y: [10, 0] } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {heroSlides[currentSlide].description}
            </motion.p>
            
            <motion.div 
              className="hero-stats"
              variants={itemVariants}
              custom={4}
            >
              <div className="stat-item">
                <FaUtensils className="stat-icon" />
                <motion.span 
                  className="stat-number"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  50+
                </motion.span>
                <span className="stat-label">Signature Dishes</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <FaStar className="stat-icon" />
                <motion.span 
                  className="stat-number"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  4.9
                </motion.span>
                <span className="stat-label">Customer Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <FaClock className="stat-icon" />
                <motion.span 
                  className="stat-number"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                >
                  10K+
                </motion.span>
                <span className="stat-label">Happy Customers</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="hero-actions"
              variants={itemVariants}
              custom={5}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="reservation"
                  smooth={true}
                  duration={500}
                  className="cta-primary"
                >
                  <span>Reserve Table</span>
                  <HiOutlineArrowNarrowRight className="btn-icon" />
                </Link>
              </motion.div>
              
              <motion.button 
                className="cta-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BiPlay className="play-icon" />
                <span>Watch Story</span>
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-visual"
            variants={itemVariants}
            custom={6}
          >
            <motion.div 
              className="hero-image-container"
              variants={imageVariants}
              animate={slideChanged ? { opacity: [0.7, 1], scale: [0.98, 1] } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="image-frame"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  key={currentSlide} // Add a key to force proper re-rendering
                  src={heroSlides[currentSlide].image} 
                  alt="hero" 
                  className="hero-image"
                  initial={{ opacity: 0.8, y: 5 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -10, 0]
                  }}
                  transition={{
                    opacity: { duration: 0.5 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <div className="image-overlay-gradient"></div>
                <div className="image-glow"></div>
              </motion.div>
              
              <motion.div 
                className="floating-card card-1"
                variants={floatingCardVariants}
                custom={0}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <div className="card-content">
                  <span className="card-emoji">🍽️</span>
                  <span className="card-text">Fine Dining</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="floating-card card-2"
                variants={floatingCardVariants}
                custom={1}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="card-content">
                  <span className="card-emoji">⭐</span>
                  <span className="card-text">5-Star Service</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="floating-card card-3"
                variants={floatingCardVariants}
                custom={2}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <div className="card-content">
                  <span className="card-emoji">👨‍🍳</span>
                  <span className="card-text">Expert Chefs</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="hero-decoration"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <img src="./threelines.svg" alt="decoration" className="decoration-svg" />
            </motion.div>
          </motion.div>
        </div>
        
        <div className="hero-slider-dots">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div 
          className="scroll-line"
          animate={{
            opacity: [0.5, 1, 0.5],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.span 
          className="scroll-text"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Scroll Down
        </motion.span>
      </motion.div>
    </section>
  );
};

export default HeroSection;