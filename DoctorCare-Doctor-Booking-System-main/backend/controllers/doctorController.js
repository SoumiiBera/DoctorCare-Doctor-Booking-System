const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getDoctors = async (req, res) => {
  try {
    const { search, specialization } = req.query;
    const filter = {};

    if (search) {
      const pattern = new RegExp(escapeRegex(String(search)), "i");
      filter.$or = [{ name: pattern }, { specialization: pattern }];
    }

    if (specialization) {
      filter.specialization = new RegExp(escapeRegex(String(specialization)), "i");
    }

    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error.message);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    console.error("Get doctor error:", error.message);
    res.status(500).json({ message: "Failed to fetch doctor" });
  }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = { getDoctors, getDoctorById, createDoctor };
