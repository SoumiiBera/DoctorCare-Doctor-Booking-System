const mongoose = require("mongoose");
require("dotenv").config();

const Doctor = require("./models/Doctor");

const doctors = [
  {
    name: "Dr. Amit Sharma",
    specialization: "Cardiologist",
    qualification: "MBBS, MD Cardiology",
    experience: 10,
    hospital: "Apollo Hospital",
    location: "Kolkata",
    consultationFee: 800,
    rating: 4.8,
    image: "",
    availableSlots: ["10:00 AM", "11:00 AM", "4:00 PM"],
  },
  {
    name: "Dr. Priya Sen",
    specialization: "Dermatologist",
    qualification: "MBBS, MD Dermatology",
    experience: 8,
    hospital: "AMRI Hospital",
    location: "Kolkata",
    consultationFee: 700,
    rating: 4.7,
    image: "",
    availableSlots: ["9:00 AM", "12:00 PM", "5:00 PM"],
  },
  {
    name: "Dr. Rahul Mehta",
    specialization: "Neurologist",
    qualification: "MBBS, DM Neurology",
    experience: 12,
    hospital: "Fortis Hospital",
    location: "Kolkata",
    consultationFee: 1000,
    rating: 4.9,
    image: "",
    availableSlots: ["10:30 AM", "2:00 PM", "6:00 PM"],
  },
  {
    name: "Dr. Sneha Roy",
    specialization: "Pediatrician",
    qualification: "MBBS, MD Pediatrics",
    experience: 7,
    hospital: "Narayana Hospital",
    location: "Kolkata",
    consultationFee: 600,
    rating: 4.6,
    image: "",
    availableSlots: ["9:30 AM", "1:00 PM", "5:30 PM"],
  },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    await Doctor.deleteMany();

    await Doctor.insertMany(doctors);

    console.log("Doctors added successfully!");
    console.log(`${doctors.length} doctors inserted.`);

    process.exit(0);
  } catch (error) {
    console.error("Error adding doctors:", error.message);
    process.exit(1);
  }
};

seedDoctors();