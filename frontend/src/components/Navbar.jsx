import React, { useState, useEffect } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("heroSection");

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      // Update active link based on scroll position
      const sections = ["heroSection", "about", "qualities", "menu", "who_are_we", "team", "reservation"];
      
      let currentSection = "heroSection";
      let minDistance = Infinity;
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const distance = Math.abs(section.getBoundingClientRect().top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      });
      
      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="logo">
          <img src="/logo.svg" alt="logo" className="logo-img" />
          <span>REserve it</span>
        </div>
        
        <div className={`navLinks ${show ? 'navActive' : ''}`}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                offset={-100}
                key={element.id}
                className={`navLink ${activeLink === element.link ? 'active-link' : ''}`}
                onClick={() => setShow(false)}
              >
                {element.title}
              </Link>
            ))}
          </div>
          
          <Link 
            to="reservation" 
            spy={true} 
            smooth={true} 
            duration={500} 
            offset={-100}
            className="menuBtn"
            onClick={() => setShow(false)}
          >
            <FaRegCalendarAlt className="reservation-icon" />
            <span>RESERVE A TABLE</span>
          </Link>
        </div>
        
        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
