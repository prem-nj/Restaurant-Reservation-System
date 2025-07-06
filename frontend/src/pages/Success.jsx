import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BiCheckCircle } from "react-icons/bi";
import { FaUtensils, FaCalendarCheck, FaClock } from "react-icons/fa";

const Success = () => {
  const [countdown, setCountdown] = useState(10);
  const [animationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();

  // Handle countdown and navigation
  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timeoutId);
          navigate("/");
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [navigate]);

  // Trigger animation after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="success-page">
        <div className="success-container">
          <div className="success-content">
            <div className="success-animation">
              <BiCheckCircle className="success-icon" />
              <img src="/bouncing-circles.svg" alt="success animation" className="bouncing-circles" />
            </div>
            
            <div className={`success-text ${animationComplete ? 'animate-in' : ''}`}>
              <h1 className="success-title">Reservation Confirmed!</h1>
              <p className="success-message">
                Thank you for choosing our restaurant. Your table has been reserved successfully.
                We look forward to serving you an exceptional dining experience.
              </p>
              
              <div className="success-features">
                <div className="feature">
                  <div className="feature-icon">
                    <FaUtensils />
                  </div>
                  <span>Premium Menu</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">
                    <FaCalendarCheck />
                  </div>
                  <span>Confirmed Booking</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">
                    <FaClock />
                  </div>
                  <span>On-time Service</span>
                </div>
              </div>
              
              <div className="countdown-container">
                <div className="countdown-circle">
                  <span className="countdown-number">{countdown}</span>
                </div>
                <p className="countdown-text">Redirecting to home page</p>
              </div>
              
              <Link to={"/"} className="home-btn">
                <span>Back to Home</span>
                <HiOutlineArrowNarrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;