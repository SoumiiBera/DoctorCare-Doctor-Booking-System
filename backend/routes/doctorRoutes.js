const express = require("express");

const {
  getDoctors,
  getDoctorById,
  createDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

// Get all doctors
router.get("/", getDoctors);

// Get single doctor
router.get("/:id", getDoctorById);

// Add doctor
router.post("/", createDoctor);

module.exports = router;