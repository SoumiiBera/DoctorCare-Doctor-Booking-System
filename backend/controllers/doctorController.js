const Doctor = require("../models/Doctor");

// =========================
// GET ALL DOCTORS
// =========================
const getDoctors = async (req, res) => {
  try {
    console.log("GET /api/doctors called");

    console.log("Database:", Doctor.db.name);

    const { search, specialization } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          specialization: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (specialization) {
      filter.specialization = {
        $regex: specialization,
        $options: "i",
      };
    }

    const doctors = await Doctor.find(filter).sort({
      createdAt: -1,
    });

    console.log("Doctors found:", doctors.length);

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);

    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

// =========================
// GET SINGLE DOCTOR
// =========================
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Get doctor error:", error);

    res.status(500).json({
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};

// =========================
// CREATE DOCTOR
// =========================
const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json(doctor);
  } catch (error) {
    console.error("Create doctor error:", error);

    res.status(500).json({
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
};