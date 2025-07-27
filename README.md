# 🏨 Restaurant Reservation System

A full-stack web app that enables customers to browse restaurants, see real‑time seating availability, and book reservations, while restaurant owners manage bookings and capacity.

## Demo

Visit the live version: https://restaurant‑reservation‑system‑2wnb.vercel.app/

---

## Table of Contents

- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Architecture](#architecture)  
- [Prerequisites](#prerequisites)  
- [Installation & Run](#installation--run)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [Licensing](#licensing)

---

## Features

- **User roles**: Customer and restaurant owner/accounts  
- **Browse restaurants**: Filter by location, cuisine, capacity  
- **View availability**: Real‑time seat / table availability  
- **Reservation management**: Book, cancel, or modify reservations  
- **Restaurant dashboard**: Owners can manage tables, capacity, view reservations  
- **Interactive maps**: Location-based search & map view (*if included*)  
- **Secure authentication**: Login/sign‑up and session management with hashed passwords—powered by JWT/Bcrypt/Helmet for backend security  
- **Notifications**: Email/SMS confirmations and reminders (*if implemented*)

---

## Technology Stack

- **Frontend**: React (with Hooks/Context API), Sass/Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB with Mongoose ODM  
- **Auth & Security**: bcryptjs, helmet, jsonwebtoken  
- **Utilities**: CORS, dotenv, morgan for logging, RESTful routing  
- **Deployment**: Vercel (frontend + API endpoints)

---
## Prerequisites

- Node.js v14+ / npm  
- MongoDB (local or Atlas)  
- Optional: `.env` file for sensitive keys (e.g. `JWT_SECRET`, `DB_URI`)

---

## Installation & Local Setup

```bash
git clone <repo-url>
cd restaurant-reservation-system
npm install

## Project Structure
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  └── middleware/
  
/frontend
  ├── components/
  ├── pages/
  └── context/

----------
## License

This project is released under the **MIT License**.

---

## Credits & References

- Inspired by MERN-stack tutorials and examples (e.g. React + Node + Express + MongoDB reservation systems)
- Project plan references and architecture ideas from typical reservation app templates

