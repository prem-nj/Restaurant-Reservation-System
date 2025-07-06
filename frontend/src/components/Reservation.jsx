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
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",
        reservationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Reservation successful:", data);
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setTime("");
      setDate("");
      navigate("/success");
    } catch (error) {
      console.error("Reservation error:", error);
      
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        toast.error(`Error: ${error.response.data.message || "Something went wrong with your reservation"}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        toast.error("No response from server. Please check your connection or try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        toast.error("An error occurred while making your reservation.");
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