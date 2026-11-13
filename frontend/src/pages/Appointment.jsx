import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

function Appointment() {
  const { doctorId } = useParams();
  const location = useLocation();
  const { t } = useLanguage();

  const doctor = location.state?.doctor;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  const [booked, setBooked] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  // =========================
  // DOCTOR NOT FOUND
  // =========================

  if (!doctor) {
    return (
      <>
        <Navbar />

        <div style={styles.center}>
          <div style={styles.errorBox}>
            <div style={{ fontSize: "60px" }}>😕</div>

            <h1 style={styles.errorTitle}>
              {t("doctorNotFound")}
            </h1>

            <p style={styles.errorText}>
              {t("doctorNotFoundMessage")}
            </p>

            <Link to="/doctors" style={styles.backButton}>
              ← {t("backToDoctors")}
            </Link>
          </div>
        </div>
      </>
    );
  }

  // =========================
  // TRANSLATED DOCTOR DATA
  // =========================

  const specialty = doctor.specialtyKey
    ? t(doctor.specialtyKey)
    : doctor.specialty || t("specialist");

  const locationName = doctor.locationKey
    ? t(doctor.locationKey)
    : doctor.location || t("kolkata");

  // =========================
  // APPOINTMENT SUCCESS
  // =========================

  if (booked) {
    return (
      <>
        <Navbar />

        <div style={styles.center}>
          <div style={styles.successBox}>
            <div style={{ fontSize: "70px" }}>✅</div>

            <h1 style={styles.successTitle}>
              {t("appointmentBooked")}
            </h1>

            <p style={styles.successText}>
              {t("appointmentSuccessWith")}{" "}
              <strong>{doctor.name}</strong>{" "}
              {t("appointmentSuccessfullyBooked")}
            </p>

            <div style={styles.bookingDetails}>
              <p>
                👨‍⚕️ <strong>{t("doctorLabel")}:</strong>{" "}
                {doctor.name}
              </p>

              <p>
                📅 <strong>{t("dateLabel")}:</strong>{" "}
                {form.date}
              </p>

              <p>
                🕐 <strong>{t("timeLabel")}:</strong>{" "}
                {form.time}
              </p>

              <p>
                💰 <strong>{t("feeLabel")}:</strong>{" "}
                {doctor.fee}
              </p>
            </div>

            <Link
              to="/appointments"
              style={styles.primaryButton}
            >
              {t("viewMyAppointments")}
            </Link>

            <br />

            <Link
              to="/doctors"
              style={styles.backLink}
            >
              ← {t("backToDoctors")}
            </Link>
          </div>
        </div>
      </>
    );
  }

  // =========================
  // MAIN APPOINTMENT PAGE
  // =========================

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>

          {/* BACK */}

          <Link
            to="/doctors"
            style={styles.backLink}
          >
            ← {t("backToDoctors")}
          </Link>

          {/* PAGE TITLE */}

          <div style={styles.heading}>
            <p style={styles.tag}>
              🩺 DOCTORCARE
            </p>

            <h1 style={styles.title}>
              {t("bookYourAppointment")}
            </h1>

            <p style={styles.subtitle}>
              {t("scheduleConsultation")}
            </p>
          </div>

          {/* DOCTOR CARD */}

          <div style={styles.doctorBox}>

            <div style={styles.avatar}>
              {doctor.emoji || "👨‍⚕️"}
            </div>

            <div style={{ flex: 1 }}>

              <p style={styles.verified}>
                ✓ {t("verifiedDoctorUpper")}
              </p>

              <h2 style={styles.doctorName}>
                {doctor.name}
              </h2>

              <p style={styles.specialty}>
                {specialty}
              </p>

              <p style={styles.doctorInfo}>
                ⭐ {doctor.rating}
                &nbsp;&nbsp;•&nbsp;&nbsp;
                🩺 {doctor.experience}{" "}
                {t("yearsExperience")}
              </p>

              <p style={styles.location}>
                📍 {locationName}
              </p>

            </div>

            <div style={styles.feeBox}>
              <span>
                {t("consultationFee")}
              </span>

              <strong>
                {doctor.fee}
              </strong>
            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >

            <h2 style={styles.formTitle}>
              {t("patientInformation")}
            </h2>

            <p style={styles.formSubtitle}>
              {t("patientInformationSubtitle")}
            </p>

            <div style={styles.grid}>

              {/* NAME */}

              <div style={styles.field}>
                <label style={styles.label}>
                  {t("fullName")}
                </label>

                <input
                  style={styles.input}
                  type="text"
                  name="name"
                  placeholder={t("enterFullName")}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}

              <div style={styles.field}>
                <label style={styles.label}>
                  {t("emailAddress")}
                </label>

                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder={t("enterEmail")}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}

              <div style={styles.field}>
                <label style={styles.label}>
                  {t("phoneNumber")}
                </label>

                <input
                  style={styles.input}
                  type="tel"
                  name="phone"
                  placeholder={t("enterPhone")}
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DATE */}

              <div style={styles.field}>
                <label style={styles.label}>
                  {t("appointmentDate")}
                </label>

                <input
                  style={styles.input}
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* TIME */}

              <div style={styles.field}>
                <label style={styles.label}>
                  {t("preferredTime")}
                </label>

                <select
                  style={styles.input}
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    {t("selectPreferredTime")}
                  </option>

                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                  <option>06:00 PM</option>
                  <option>08:00 PM</option>

                </select>
              </div>

              {/* REASON */}

              <div style={styles.field}>
                <label style={styles.label}>
                  {t("reasonForVisit")}
                </label>

                <input
                  style={styles.input}
                  type="text"
                  name="reason"
                  placeholder={t("reasonPlaceholder")}
                  value={form.reason}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* SECURITY NOTE */}

            <div style={styles.note}>
              🔒 {t("privacyNote")}
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              style={styles.bookButton}
            >
              📅 {t("confirmAppointment")}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

/* =========================
   STYLES
========================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7faff",
    padding: "50px 7%",
  },

  container: {
    maxWidth: "1000px",
    margin: "auto",
  },

  heading: {
    textAlign: "center",
    margin: "35px 0",
  },

  tag: {
    color: "#2563eb",
    fontWeight: "800",
    letterSpacing: "2px",
    fontSize: "14px",
  },

  title: {
    fontSize: "42px",
    color: "#0f172a",
    margin: "10px 0",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "17px",
    lineHeight: "1.6",
  },

  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "15px",
  },

  doctorBox: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    background: "white",
    padding: "28px",
    borderRadius: "20px",
    marginBottom: "30px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
    flexWrap: "wrap",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#e0edff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
  },

  verified: {
    color: "#16a34a",
    fontWeight: "800",
    fontSize: "13px",
  },

  doctorName: {
    margin: "5px 0",
    color: "#0f172a",
  },

  specialty: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: "16px",
  },

  doctorInfo: {
    color: "#64748b",
  },

  location: {
    color: "#64748b",
  },

  feeBox: {
    marginLeft: "auto",
    padding: "18px 25px",
    background: "#eff6ff",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    color: "#475569",
  },

  form: {
    background: "white",
    padding: "40px",
    borderRadius: "22px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
  },

  formTitle: {
    marginBottom: "5px",
    color: "#0f172a",
  },

  formSubtitle: {
    color: "#64748b",
    marginBottom: "30px",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },

  field: {
    width: "100%",
  },

  label: {
    display: "block",
    marginBottom: "9px",
    fontSize: "16px",
    fontWeight: "700",
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "58px",
    padding: "16px 18px",
    border: "1px solid #dbe3ef",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#1e293b",
    background: "white",
    outline: "none",
  },

  note: {
    marginTop: "30px",
    padding: "16px 20px",
    background: "#f8fafc",
    borderRadius: "12px",
    color: "#64748b",
    fontSize: "14px",
  },

  bookButton: {
    width: "100%",
    marginTop: "25px",
    padding: "17px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  center: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7faff",
    padding: "30px",
  },

  errorBox: {
    background: "white",
    padding: "50px",
    borderRadius: "25px",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
  },

  errorTitle: {
    color: "#0f172a",
  },

  errorText: {
    color: "#64748b",
    lineHeight: "1.6",
  },

  successBox: {
    background: "white",
    padding: "45px",
    borderRadius: "25px",
    textAlign: "center",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },

  successTitle: {
    color: "#16a34a",
  },

  successText: {
    color: "#64748b",
    fontSize: "17px",
    lineHeight: "1.7",
  },

  bookingDetails: {
    textAlign: "left",
    background: "#f8fbff",
    padding: "20px",
    borderRadius: "15px",
    marginTop: "25px",
    marginBottom: "25px",
  },

  primaryButton: {
    display: "inline-block",
    padding: "14px 25px",
    background: "#2563eb",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "700",
    marginBottom: "20px",
  },

  backButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "13px 25px",
    background: "#2563eb",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "700",
  },
};

export default Appointment;