# DoctorCare – Doctor Booking System

Find verified doctors and book appointments online. React + Vite frontend, Express + MongoDB backend.
The interface is available in English, বাংলা, हिन्दी and मराठी.

## Features

- Browse and search doctors, filter by specialty, view full profiles
- Register / log in (JWT), protected booking and appointment pages
- Book a date and time slot (already-booked slots are disabled and double booking is blocked by the API)
- View and cancel your appointments
- Emergency page with national helpline numbers (112, 108, 102, 1098, 14416)

## Project structure

```
backend/
  server.js            App entry (CORS, routes, 404)
  config/db.js         MongoDB connection
  controllers/         auth, doctor, appointment logic
  middleware/          JWT auth, admin-only guard
  models/              User, Doctor, Appointment
  routes/              API route definitions
  scripts/seedDoctors.js
  utils/generateToken.js

frontend/src/
  components/          Navbar, Footer, DoctorCard, FormField, dialogs, state blocks
  pages/               One file per route
  context/ + hooks/    Auth and language providers and their hooks
  services/            Axios API layer
  i18n/                Translation files (en, bn, hi, mr)
  styles/              base.css (tokens), components.css, pages.css
  utils/, constants/   Helpers and shared static data
```

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env      # set MONGO_URI and a long random JWT_SECRET
npm install
npm run seed              # optional: adds sample doctors
npm run dev               # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # optional, defaults to http://localhost:5000/api
npm install
npm run dev               # http://localhost:5173
```

## API overview

| Method | Endpoint | Access |
| --- | --- | --- |
| POST | `/api/auth/register`, `/api/auth/login` | Public |
| GET | `/api/doctors`, `/api/doctors/:id` | Public |
| POST | `/api/doctors` | Admin |
| POST | `/api/appointments` | Logged in |
| GET | `/api/appointments/my` | Logged in |
| GET | `/api/appointments/booked-slots?doctorId=&date=` | Logged in |
| PUT | `/api/appointments/:id/cancel` | Logged in (own appointments) |

To create an admin, set `role` to `admin` for a user document in MongoDB.
