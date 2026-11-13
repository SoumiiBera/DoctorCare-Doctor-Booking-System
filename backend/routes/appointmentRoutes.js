const express = require("express");

const {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create appointment
router.post("/", protect, createAppointment);

// Get logged-in user's appointments
router.get("/my", protect, getMyAppointments);

// Cancel appointment
router.put("/:id/cancel", protect, cancelAppointment);

module.exports = router;