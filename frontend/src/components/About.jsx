import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" }
    })
  };
  
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <motion.div 
            className="banner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="top" variants={fadeIn} custom={1}>
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </motion.div>
            <motion.p className="mid" variants={fadeIn} custom={2}>
              At our restaurant, we believe dining is more than just eating—it's an experience. 
              Founded in 2010, we've combined culinary excellence with warm hospitality 
              to create a place where memories are made. Our chefs source the finest 
              local ingredients to craft dishes that honor both tradition and innovation,
              ensuring every bite tells a story of passion and craftsmanship.
            </motion.p>
            <motion.div variants={fadeIn} custom={3}>
              <Link to={"/"}>
                Explore Menu{" "}
                <span>
                  <HiOutlineArrowRight />
                </span>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="banner"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src="about.png" alt="Our restaurant's ambiance and food" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;