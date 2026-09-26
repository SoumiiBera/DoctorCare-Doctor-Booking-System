import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Arjun Sharma",
      specialty: "Cardiologist",
      emoji: "👨‍⚕️",
      date: "20 September 2026",
      time: "10:00 AM",
      fee: "₹800",
      status: "Upcoming",
      location: "Kolkata",
    },
    {
      id: 2,
      doctor: "Dr. Priya Sen",
      specialty: "Dermatologist",
      emoji: "👩‍⚕️",
      date: "12 September 2026",
      time: "04:00 PM",
      fee: "₹600",
      status: "Upcoming",
      location: "Kolkata",
    },
    {
      id: 3,
      doctor: "Dr. Rahul Das",
      specialty: "Neurologist",
      emoji: "👨‍⚕️",
      date: "05 September 2026",
      time: "06:00 PM",
      fee: "₹1000",
      status: "Completed",
      location: "Kolkata",
    },
  ];

  const upcoming = appointments.filter(
    (item) => item.status === "Upcoming"
  );

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  );

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>

          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <p style={styles.tag}>🩺 DOCTORCARE</p>

              <h1 style={styles.title}>
                My Appointments
              </h1>

              <p style={styles.subtitle}>
                Manage and track all your doctor appointments
                in one place.
              </p>
            </div>

            <Link
              to="/doctors"
              style={styles.bookButton}
            >
              + Book New Appointment
            </Link>
          </div>

          {/* SUMMARY CARDS */}
          <div style={styles.summaryGrid}>

            <div style={styles.summaryCard}>
              <div style={styles.summaryIcon}>📅</div>
              <div>
                <p>Upcoming</p>
                <h2>{upcoming.length}</h2>
              </div>
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryIcon}>✅</div>
              <div>
                <p>Completed</p>
                <h2>{completed.length}</h2>
              </div>
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryIcon}>📋</div>
              <div>
                <p>Total Appointments</p>
                <h2>{appointments.length}</h2>
              </div>
            </div>

          </div>

          {/* UPCOMING */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2>📅 Upcoming Appointments</h2>

              <span style={styles.countBadge}>
                {upcoming.length} Appointments
              </span>
            </div>

            {upcoming.length === 0 ? (
              <EmptyState text="No upcoming appointments." />
            ) : (
              upcoming.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))
            )}
          </section>

          {/* COMPLETED */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2>✅ Completed Appointments</h2>

              <span
                style={{
                  ...styles.countBadge,
                  background: "#f0fdf4",
                  color: "#16a34a",
                }}
              >
                {completed.length} Completed
              </span>
            </div>

            {completed.length === 0 ? (
              <EmptyState text="No completed appointments." />
            ) : (
              completed.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))
            )}
          </section>

          {/* CANCELLED SECTION */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2>❌ Cancelled Appointments</h2>

              <span
                style={{
                  ...styles.countBadge,
                  background: "#fff1f2",
                  color: "#dc2626",
                }}
              >
                0 Cancelled
              </span>
            </div>

            <EmptyState
              text="You don't have any cancelled appointments."
            />
          </section>

        </div>
      </div>
    </>
  );
}


/* =========================
   APPOINTMENT CARD
========================= */

function AppointmentCard({ appointment }) {
  const isCompleted =
    appointment.status === "Completed";

  return (
    <div style={styles.appointmentCard}>

      {/* DOCTOR */}
      <div style={styles.doctorSection}>

        <div style={styles.avatar}>
          {appointment.emoji}
        </div>

        <div>
          <p style={styles.verified}>
            ✓ VERIFIED DOCTOR
          </p>

          <h2 style={styles.doctorName}>
            {appointment.doctor}
          </h2>

          <p style={styles.specialty}>
            {appointment.specialty}
          </p>

          <p style={styles.location}>
            📍 {appointment.location}
          </p>
        </div>

      </div>


      {/* DETAILS */}
      <div style={styles.details}>

        <div style={styles.detailItem}>
          <span>📅</span>

          <div>
            <small>Date</small>
            <strong>{appointment.date}</strong>
          </div>
        </div>

        <div style={styles.detailItem}>
          <span>🕐</span>

          <div>
            <small>Time</small>
            <strong>{appointment.time}</strong>
          </div>
        </div>

        <div style={styles.detailItem}>
          <span>💰</span>

          <div>
            <small>Consultation Fee</small>
            <strong>{appointment.fee}</strong>
          </div>
        </div>

      </div>


      {/* STATUS + ACTION */}
      <div style={styles.actionSection}>

        <span
          style={{
            ...styles.status,
            background: isCompleted
              ? "#f0fdf4"
              : "#eff6ff",
            color: isCompleted
              ? "#16a34a"
              : "#2563eb",
          }}
        >
          {isCompleted ? "✓ Completed" : "● Upcoming"}
        </span>

        <button
          style={styles.detailsButton}
          onClick={() =>
            alert(
              `Appointment with ${appointment.doctor}\nDate: ${appointment.date}\nTime: ${appointment.time}`
            )
          }
        >
          View Details →
        </button>

      </div>

    </div>
  );
}


/* =========================
   EMPTY STATE
========================= */

function EmptyState({ text }) {
  return (
    <div style={styles.emptyState}>
      <div style={{ fontSize: "45px" }}>📭</div>

      <p>{text}</p>

      <Link
        to="/doctors"
        style={styles.emptyButton}
      >
        Find a Doctor
      </Link>
    </div>
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
    maxWidth: "1100px",
    margin: "auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },

  tag: {
    color: "#2563eb",
    fontWeight: "800",
    letterSpacing: "2px",
    fontSize: "13px",
  },

  title: {
    fontSize: "42px",
    color: "#0f172a",
    margin: "8px 0",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "16px",
  },

  bookButton: {
    padding: "14px 22px",
    background: "#2563eb",
    color: "white",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },

  summaryCard: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow: "0 7px 25px rgba(0,0,0,0.06)",
  },

  summaryIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "15px",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  section: {
    marginBottom: "40px",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },

  countBadge: {
    padding: "7px 13px",
    borderRadius: "20px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "700",
  },

  appointmentCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "18px",
    boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
  },

  doctorSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#e0edff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
  },

  verified: {
    color: "#16a34a",
    fontWeight: "800",
    fontSize: "12px",
    margin: "0 0 5px",
  },

  doctorName: {
    margin: "0 0 5px",
    color: "#0f172a",
    fontSize: "22px",
  },

  specialty: {
    color: "#2563eb",
    fontWeight: "700",
    margin: "5px 0",
  },

  location: {
    color: "#64748b",
    margin: "5px 0",
  },

  details: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    padding: "20px",
    background: "#f8fbff",
    borderRadius: "15px",
    marginBottom: "20px",
  },

  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    flexWrap: "wrap",
  },

  status: {
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
  },

  detailsButton: {
    border: "none",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "11px 18px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  emptyState: {
    background: "white",
    padding: "35px",
    textAlign: "center",
    borderRadius: "18px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },

  emptyButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 18px",
    background: "#2563eb",
    color: "white",
    borderRadius: "9px",
    textDecoration: "none",
    fontWeight: "700",
  },
};

export default MyAppointments;