import api from "./api";

export const createAppointment = async (payload) =>
  (await api.post("/appointments", payload)).data;

export const getMyAppointments = async () =>
  (await api.get("/appointments/my")).data;

export const getBookedSlots = async (doctorId, date) =>
  (await api.get("/appointments/booked-slots", { params: { doctorId, date } }))
    .data;

export const cancelAppointment = async (id) =>
  (await api.put(`/appointments/${id}/cancel`)).data;
