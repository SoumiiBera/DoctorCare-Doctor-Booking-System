const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      default: "MBBS",
    },

    experience: {
      type: Number,
      default: 0,
    },

    hospital: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    consultationFee: {
      type: Number,
      default: 500,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    image: {
      type: String,
      default: "",
    },

    availableSlots: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);