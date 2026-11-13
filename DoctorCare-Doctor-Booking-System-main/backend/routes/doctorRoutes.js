const express = require("express");
const {
  getDoctors,
  getDoctorById,
  createDoctor,
} = require("../controllers/doctorController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", protect, adminOnly, createDoctor);

module.exports = router;
