const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// =========================
// ROUTES
// =========================
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// =========================
// MODEL
// =========================
const Doctor = require("./models/Doctor");

// =========================
// APP
// =========================
const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

// =========================
// HOME
// =========================
app.get("/", (req, res) => {
  res.json({
    message: "DoctorCare Server Running",
    status: "success",
  });
});

// =========================
// DIRECT DOCTORS API
// =========================
app.get("/api/doctors", async (req, res) => {
  try {
    console.log("GET /api/doctors");

    const { search, specialization } = req.query;

    let filter = {};

    // Search by doctor name or specialization
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

    // Filter by specialization
    if (specialization) {
      filter.specialization = {
        $regex: specialization,
        $options: "i",
      };
    }

    const doctors = await Doctor.find(filter).sort({
      createdAt: -1,
    });

    console.log("Doctors returned:", doctors.length);

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Doctors API error:", error);

    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
});

// =========================
// SINGLE DOCTOR API
// =========================
app.get("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Single doctor error:", error);

    res.status(500).json({
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
});

// =========================
// ADD DOCTOR API
// =========================
app.post("/api/doctors", async (req, res) => {
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
});

// =========================
// TEST DOCTORS
// =========================
app.get("/api/test-doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});

    res.status(200).json({
      database: mongoose.connection.db.databaseName,
      count: doctors.length,
      doctors: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// OTHER API ROUTES
// =========================
app.use("/api/auth", authRoutes);

app.use("/api/appointments", appointmentRoutes);

// =========================
// MONGODB
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("=================================");
    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.db.databaseName);

    const doctorCount = await Doctor.countDocuments();

    console.log("Doctors in database:", doctorCount);
    console.log("=================================");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });