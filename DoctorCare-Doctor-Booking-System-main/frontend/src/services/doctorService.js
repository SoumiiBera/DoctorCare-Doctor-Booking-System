import api from "./api";

export const getDoctors = async () => (await api.get("/doctors")).data;

export const getDoctorById = async (id) =>
  (await api.get(`/doctors/${id}`)).data;
