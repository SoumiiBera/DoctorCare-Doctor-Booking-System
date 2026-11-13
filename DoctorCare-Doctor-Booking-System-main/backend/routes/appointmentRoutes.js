const express = require("express");
const {
  createAppointment,
  getMyAppointments,
  getBookedSlots,
  cancelAppointment,
} = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/my", protect, getMyAppointments);
router.get("/booked-slots", protect, getBookedSlots);
router.put("/:id/cancel", protect, cancelAppointment);

module.exports = router;
