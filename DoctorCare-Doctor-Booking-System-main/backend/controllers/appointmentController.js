const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const todayISO = () => new Date().toISOString().slice(0, 10);

const createAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    if (!doctor || !date || !time) {
      return res
        .status(400)
        .json({ message: "Doctor, date and time are required" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayISO()) {
      return res.status(400).json({ message: "Please choose today or a future date" });
    }

    if (!mongoose.isValidObjectId(doctor) || !(await Doctor.exists({ _id: doctor }))) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const slotTaken = await Appointment.exists({
      doctor,
      date,
      time,
      status: { $ne: "Cancelled" },
    });

    if (slotTaken) {
      return res.status(409).json({
        message: "This time slot is already booked. Please choose another slot.",
      });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      date,
      time,
      reason: reason?.trim() || "",
    });

    await appointment.populate("doctor");

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This time slot is already booked. Please choose another slot.",
      });
    }
    console.error("Create appointment error:", error.message);
    res.status(500).json({ message: "Could not book the appointment" });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor")
      .sort({ date: -1, createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error.message);
    res.status(500).json({ message: "Could not load appointments" });
  }
};

// Booked slots for one doctor on one date, so the booking form can disable them.
const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!mongoose.isValidObjectId(doctorId) || !date) {
      return res.json([]);
    }

    const booked = await Appointment.find({
      doctor: doctorId,
      date,
      status: { $ne: "Cancelled" },
    }).select("time -_id");

    res.json(booked.map((item) => item.time));
  } catch (error) {
    console.error("Booked slots error:", error.message);
    res.status(500).json({ message: "Could not load booked slots" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, patient: req.user.id, status: "Upcoming" },
      { status: "Cancelled" },
      { new: true }
    ).populate("doctor");

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Upcoming appointment not found" });
    }

    res.json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    console.error("Cancel appointment error:", error.message);
    res.status(500).json({ message: "Could not cancel the appointment" });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getBookedSlots,
  cancelAppointment,
};
