const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      date,
      time,
      reason,
    });

    const result = await appointment.populate("doctor");

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        patient: req.user.id,
      },
      {
        status: "Cancelled",
      },
      {
        new: true,
      }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json({
      message: "Appointment cancelled",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
};