import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();

        setDoctors(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <Navbar />

      <main className="doctors-page">

        {/* ================= HEADER ================= */}
        <section className="doctors-hero">
          <div>
            <span className="hero-badge">
              🩺 Trusted Healthcare
            </span>

            <h1>
              Find the Right
              <span> Doctor for You</span>
            </h1>

            <p>
              Connect with verified doctors, explore their expertise,
              and book your appointment easily.
            </p>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="doctors-section">

          <div className="section-heading">
            <div>
              <h2>Our Doctors</h2>
              <p>
                Experienced healthcare professionals ready to help you.
              </p>
            </div>

            <div className="doctor-count">
              👨‍⚕️ {doctors.length} Doctors
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="doctor-status">
              <div className="loader"></div>
              <h3>Finding doctors...</h3>
              <p>Please wait a moment.</p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="doctor-status error-box">
              <div className="status-icon">⚠️</div>
              <h3>Something went wrong</h3>
              <p>{error}</p>
            </div>
          )}

          {/* NO DOCTORS */}
          {!loading && !error && doctors.length === 0 && (
            <div className="doctor-status">
              <div className="status-icon">🩺</div>
              <h3>No doctors available</h3>
              <p>Please check again later.</p>
            </div>
          )}

          {/* DOCTOR CARDS */}
          {!loading && !error && doctors.length > 0 && (
            <div className="doctor-grid">

              {doctors.map((doctor) => (
                <article
                  className="doctor-card"
                  key={doctor._id}
                >

                  {/* CARD TOP */}
                  <div className="doctor-card-top">

                    <div className="doctor-avatar">
                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                        />
                      ) : (
                        <span>👨‍⚕️</span>
                      )}
                    </div>

                    <div className="verified">
                      ✓ Verified
                    </div>

                  </div>

                  {/* DOCTOR INFO */}
                  <div className="doctor-card-body">

                    <h3>{doctor.name}</h3>

                    <p className="specialization">
                      {doctor.specialization}
                    </p>

                    <div className="doctor-details">

                      <div>
                        <span>🎓</span>
                        <p>{doctor.qualification}</p>
                      </div>

                      <div>
                        <span>🏥</span>
                        <p>{doctor.hospital}</p>
                      </div>

                      <div>
                        <span>📍</span>
                        <p>{doctor.location}</p>
                      </div>

                    </div>

                    {/* STATS */}
                    <div className="doctor-stats">

                      <div>
                        <strong>
                          ⭐ {doctor.rating}
                        </strong>
                        <small>Rating</small>
                      </div>

                      <div>
                        <strong>
                          {doctor.experience}+
                        </strong>
                        <small>Years Exp.</small>
                      </div>

                      <div>
                        <strong>
                          ₹{doctor.consultationFee}
                        </strong>
                        <small>Consultation</small>
                      </div>

                    </div>

                    {/* BUTTON */}
                    <Link
                      to={`/doctor/${doctor._id}`}
                      state={{ doctor }}
                      className="profile-button"
                    >
                      View Profile
                      <span>→</span>
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </main>
    </>
  );
}

export default Doctors;