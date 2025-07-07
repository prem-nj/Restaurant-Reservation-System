import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt, FaClock, FaRegEnvelope, FaPhoneAlt, FaUser, FaUserTie } from "react-icons/fa";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();

  // Generate available time slots for the reservation
  useEffect(() => {
    // Generate time slots from 10:00 AM to 10:00 PM with 30-minute intervals
    const generateTimeSlots = () => {
      const slots = [];
      const startHour = 10; // 10:00 AM
      const endHour = 22;   // 10:00 PM
      
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minutes of ['00', '30']) {
          if (hour === endHour && minutes === '30') continue; // Don't add 10:30 PM
          
          const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
          const amPm = hour < 12 ? 'AM' : 'PM';
          const timeString = `${formattedHour}:${minutes} ${amPm}`;
          const timeValue = `${hour.toString().padStart(2, '0')}:${minutes}`;
          
          slots.push({ label: timeString, value: timeValue });
        }
      }
      return slots;
    };
    
    setAvailableTimes(generateTimeSlots());
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    else if (firstName.length < 3) newErrors.firstName = "First name must be at least 3 characters";
    
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    else if (lastName.length < 3) newErrors.lastName = "Last name must be at least 3 characters";
    
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
    
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (phone.length < 10) newErrors.phone = "Phone number must be at least 10 digits";
    else if (!/^[0-9]+$/.test(phone)) newErrors.phone = "Phone number must contain only digits";
    
    if (!date) newErrors.date = "Please select a date";
    else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }
    
    if (!time) newErrors.time = "Please select a time";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to attempt reservation with multiple endpoints to bypass ad blockers
  const attemptReservation = async (reservationData, endpoints) => {
    for (let i = 0; i < endpoints.length; i++) {
      try {
        const { data } = await fetch(endpoints[i], {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'include',
          body: JSON.stringify(reservationData)
        }).then(res => {
          if (!res.ok) {
            throw new Error(`Server responded with ${res.status}`);
          }
          return res.json();
        });
        
        console.log("Reservation successful using endpoint:", endpoints[i]);
        return { success: true, data };
      } catch (err) {
        console.log(`Endpoint ${endpoints[i]} failed:`, err);
        // Continue to next endpoint
        if (i === endpoints.length - 1) {
          throw err; // Re-throw the error if all endpoints fail
        }
      }
    }
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      const reservationData = {
        firstName,
        lastName,
        email,
        phone: phone.toString(),
        date,
        time
      };
      
      console.log("Sending reservation request to backend...");
      
      // Define multiple endpoints to try (to bypass ad blockers)
      const endpoints = [
        "http://localhost:4000/api/v1/reservation/book",  // Try alternative endpoint first
        "http://localhost:4000/api/v1/bookings/create",   // Another alternative path
        "http://localhost:4000/api/v1/reservation/send"   // Original endpoint as fallback
      ];
      
      // Try to make the reservation using multiple endpoints
      const result = await attemptReservation(reservationData, endpoints);
      
      if (result && result.success) {
        console.log("Reservation successful:", result.data);
        toast.success(result.data.message || "Reservation successful!");
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setTime("");
        setDate("");
        navigate("/success");
      }
    } catch (error) {
      console.error("All reservation attempts failed:", error);
      
      // Fallback to using the Fetch API directly as a last resort
      try {
        console.log("Attempting direct fetch as fallback...");
        const response = await fetch("http://localhost:4000/api/test", {
          method: 'GET',
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          credentials: 'include'
        });
        
        if (response.ok) {
          console.log("API is accessible, but reservation endpoints are blocked");
          toast.error("Your browser may be blocking the reservation system. Please try disabling ad blockers or try a different browser.");
        } else {
          toast.error("Unable to connect to the reservation system. Please try again later.");
        }
      } catch (fetchError) {
        console.error("Even test endpoint failed:", fetchError);
        toast.error("Unable to connect to the server. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date for date picker (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">BOOK A TABLE</h1>
          <p>Reserve your table for an unforgettable dining experience</p>
        </div>
        <div className="reservation_container">
          <div className="left">
            <img src="/reservation.png" alt="reservation" />
            <div className="reservation-info">
              <h3>Reservation Hours</h3>
              <p>Monday to Friday: 10:00 AM - 10:00 PM</p>
              <p>Saturday & Sunday: 11:00 AM - 11:00 PM</p>
              <p>For special events and large groups, please call us directly.</p>
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleReservation}>
              <div className="form_group">
                <div className="input_group">
                  <div className="input-icon-wrapper">
                    <FaUser className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={errors.firstName ? "error" : ""}
                    />
                  </div>
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="input_group">
                  <div className="input-icon-wrapper">
                    <FaUserTie className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={errors.lastName ? "error" : ""}
                    />
                  </div>
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form_group">
                <div className="input_group">
                  <div className="input-icon-wrapper">
                    <FaRegCalendarAlt className="input-icon" />
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={getMinDate()}
                      className={errors.date ? "error" : ""}
                    />
                  </div>
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>
                <div className="input_group">
                  <div className="input-icon-wrapper">
                    <FaClock className="input-icon" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={errors.time ? "error" : ""}
                    >
                      <option value="">Select Time</option>
                      {availableTimes.map((timeSlot, index) => (
                        <option key={index} value={timeSlot.value}>
                          {timeSlot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>
              </div>
              <div className="form_group">
                <div className="input_group">
                  <div className="input-icon-wrapper">
                    <FaRegEnvelope className="input-icon" />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "error" : ""}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="input_group">
                  <div className="input-icon-wrapper">
                    <FaPhoneAlt className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Phone" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={errors.phone ? "error" : ""}
                    />
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  'Book Your Table'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;