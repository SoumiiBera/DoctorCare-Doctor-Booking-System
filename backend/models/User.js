const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    language: {
      type: String,
      enum: [
        "English",
        "Bengali",
        "Hindi",
        "Marathi",
        "Tamil",
        "Telugu",
        "Kannada",
      ],
      default: "English",
    },

    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);