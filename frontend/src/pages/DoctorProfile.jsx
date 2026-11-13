import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { getDoctorById } from "../services/doctorService";

function DoctorProfile() {
  const { id } = useParams();
  const { t } = useLanguage();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDoctorById(id);

        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setError("Doctor not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#2563eb",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Loading doctor profile...
        </div>
      </>
    );
  }

  if (error || !doctor) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h2>{t("doctorNotFound") || "Doctor Not Found"}</h2>

          <p>
            {t("doctorNotFoundMessage") ||
              "The requested doctor could not be found."}
          </p>

          <Link
            to="/doctors"
            style={{
              textDecoration: "none",
              background: "#2563eb",
              color: "white",
              padding: "12px 22px",
              borderRadius: "10px",
              fontWeight: "600",
            }}
          >
            ← {t("backToDoctors") || "Back to Doctors"}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#f7faff",
          padding: "50px 7%",
        }}
      >
        <div
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
          }}
        >
          {/* Back Button */}

          <Link
            to="/doctors"
            style={{
              display: "inline-block",
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: "600",
              marginBottom: "25px",
            }}
          >
            ← {t("backToDoctors") || "Back to Doctors"}
          </Link>

          {/* Main Profile Card */}

          <section
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 12px 35px rgba(15, 23, 42, 0.08)",
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "40px",
            }}
          >
            {/* LEFT SIDE */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: "220px",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "25px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "220px",
                    height: "220px",
                    borderRadius: "25px",
                    background:
                      "linear-gradient(135deg, #dbeafe, #eff6ff)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "90px",
                  }}
                >
                  👨‍⚕️
                </div>
              )}

              <div
                style={{
                  marginTop: "15px",
                  background: "#dcfce7",
                  color: "#15803d",
                  padding: "8px 15px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                ✓ VERIFIED DOCTOR
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div>
              {/* Doctor Name */}

              <h1
                style={{
                  margin: "0 0 8px",
                  color: "#0f172a",
                  fontSize: "36px",
                }}
              >
                {doctor.name}
              </h1>

              {/* Specialization */}

              <h3
                style={{
                  margin: "0 0 25px",
                  color: "#2563eb",
                  fontSize: "20px",
                }}
              >
                {doctor.specialization}
              </h3>

              {/* Information Boxes */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "15px",
                  marginBottom: "25px",
                }}
              >
                <InfoBox
                  title="Qualification"
                  value={doctor.qualification || "MBBS"}
                />

                <InfoBox
                  title="Experience"
                  value={`${doctor.experience || 0} years`}
                />

                <InfoBox
                  title="Rating"
                  value={`⭐ ${doctor.rating || 0}`}
                />

                <InfoBox
                  title="Consultation Fee"
                  value={`₹${doctor.consultationFee || 0}`}
                />
              </div>

              {/* Hospital */}

              <div
                style={{
                  background: "#f8fafc",
                  padding: "18px",
                  borderRadius: "14px",
                  marginBottom: "15px",
                }}
              >
                <strong
                  style={{
                    color: "#0f172a",
                    fontSize: "16px",
                  }}
                >
                  🏥 Hospital
                </strong>

                <p
                  style={{
                    margin: "7px 0 0",
                    color: "#64748b",
                  }}
                >
                  {doctor.hospital || "Hospital not specified"}
                </p>
              </div>

              {/* Location */}

              <div
                style={{
                  background: "#f8fafc",
                  padding: "18px",
                  borderRadius: "14px",
                  marginBottom: "25px",
                }}
              >
                <strong
                  style={{
                    color: "#0f172a",
                    fontSize: "16px",
                  }}
                >
                  📍 Location
                </strong>

                <p
                  style={{
                    margin: "7px 0 0",
                    color: "#64748b",
                  }}
                >
                  {doctor.location || "Location not specified"}
                </p>
              </div>

              {/* Available Slots */}

              {doctor.availableSlots &&
                doctor.availableSlots.length > 0 && (
                  <div
                    style={{
                      marginBottom: "25px",
                    }}
                  >
                    <h3
                      style={{
                        color: "#0f172a",
                        marginBottom: "12px",
                      }}
                    >
                      Available Consultation Slots
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      {doctor.availableSlots.map((slot) => (
                        <span
                          key={slot}
                          style={{
                            background: "#eff6ff",
                            color: "#2563eb",
                            padding: "8px 14px",
                            borderRadius: "20px",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          🕐 {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Book Appointment */}

              <Link
                to={`/appointment/${doctor._id}`}
                state={{ doctor }}
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "16px",
                  boxShadow:
                    "0 8px 20px rgba(37, 99, 235, 0.25)",
                }}
              >
                📅 Book Your Appointment
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function InfoBox({ title, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "16px",
        borderRadius: "14px",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          color: "#64748b",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {title}
      </p>

      <strong
        style={{
          color: "#0f172a",
          fontSize: "16px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

export default DoctorProfile;