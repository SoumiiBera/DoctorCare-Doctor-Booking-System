import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          padding: "70px 30px",
          background:
            "linear-gradient(135deg, #f8fbff 0%, #eef6ff 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "auto",
            textAlign: "center",
          }}
        >

          {/* WELCOME */}
          <p
            style={{
              color: "#2563eb",
              fontWeight: "800",
              fontSize: "17px",
              letterSpacing: "1px",
              marginBottom: "15px",
            }}
          >
            🩺 {t("welcome")}
          </p>

          {/* HERO TITLE */}
          <h1
            style={{
              fontSize: "52px",
              lineHeight: "1.15",
              margin: "15px 0",
              color: "#0f172a",
            }}
          >
            {t("healthcareMade")}
            <br />

            <span style={{ color: "#2563eb" }}>
              {t("simpleAccessible")}
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              lineHeight: "1.8",
              maxWidth: "700px",
              margin: "20px auto 35px",
            }}
          >
            {t("findTrusted")}
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/doctors"
              style={{
                display: "inline-block",
                padding: "16px 30px",
                borderRadius: "12px",
                background: "#2563eb",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                textDecoration: "none",
                boxShadow:
                  "0 8px 20px rgba(37,99,235,0.25)",
              }}
            >
              🔎 {t("findDoctor")}
            </Link>

            <Link
              to="/emergency"
              style={{
                display: "inline-block",
                padding: "14px 30px",
                border: "2px solid #2563eb",
                borderRadius: "12px",
                background: "white",
                color: "#2563eb",
                fontSize: "16px",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              {t("emergency")}
            </Link>
          </div>

          {/* QUICK SEARCH */}
          <div
            style={{
              maxWidth: "850px",
              margin: "55px auto 0",
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 10px 35px rgba(0,0,0,0.07)",
            }}
          >
            <h3
              style={{
                marginTop: "0",
                color: "#0f172a",
                fontSize: "20px",
              }}
            >
              {t("quickSearch")}
            </h3>

            <p
              style={{
                color: "#64748b",
                marginBottom: "20px",
              }}
            >
              {t("findDoctor")}
            </p>

            <Link
              to="/doctors"
              style={{
                display: "block",
                padding: "15px 20px",
                border: "1px solid #dbe3ef",
                borderRadius: "12px",
                textAlign: "left",
                color: "#94a3b8",
                textDecoration: "none",
                background: "#f8fafc",
              }}
            >
              🔎 {t("findDoctor")}
            </Link>
          </div>

          {/* FEATURES */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "25px",
              marginTop: "55px",
            }}
          >

            {/* VERIFIED DOCTORS */}
            <div style={styles.card}>
              <div style={styles.icon}>👨‍⚕️</div>

              <h3 style={styles.cardTitle}>
                {t("verifiedDoctors")}
              </h3>

              <p style={styles.cardText}>
                {t("findTrusted")}
              </p>

              <Link
                to="/doctors"
                style={styles.cardLink}
              >
                {t("findDoctors")}
              </Link>
            </div>

            {/* EASY BOOKING */}
            <div style={styles.card}>
              <div style={styles.icon}>📅</div>

              <h3 style={styles.cardTitle}>
                {t("easyBooking")}
              </h3>

              <p style={styles.cardText}>
                {t("bookAppointment")}
              </p>

              <Link
                to="/doctors"
                style={styles.cardLink}
              >
                {t("bookNow")}
              </Link>
            </div>

            {/* SAFE & SECURE */}
            <div style={styles.card}>
              <div style={styles.icon}>🛡️</div>

              <h3 style={styles.cardTitle}>
                {t("safeSecure")}
              </h3>

              <p style={styles.cardText}>
                {t("findTrusted")}
              </p>

              <Link
                to="/about"
                style={styles.cardLink}
              >
                {t("learnMore")}
              </Link>
            </div>

          </div>

          {/* EMERGENCY */}
          <div
            style={{
              marginTop: "60px",
              padding: "35px 30px",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, #fff1f2, #ffe4e6)",
              border: "1px solid #fecdd3",
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "10px",
              }}
            >
              🚨
            </div>

            <h2
              style={{
                color: "#9f1239",
                margin: "5px 0 10px",
              }}
            >
              {t("emergencyHelp")}
            </h2>

            <p
              style={{
                color: "#881337",
                maxWidth: "650px",
                margin: "0 auto 20px",
                lineHeight: "1.7",
              }}
            >
              {t("findTrusted")}
            </p>

            <Link
              to="/emergency"
              style={{
                display: "inline-block",
                padding: "13px 25px",
                background: "#dc2626",
                color: "white",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              🚨 {t("emergencyHelp")}
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "30px 25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.07)",
    border: "1px solid #eef2f7",
  },

  icon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 18px",
    borderRadius: "20px",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "35px",
  },

  cardTitle: {
    color: "#0f172a",
    marginBottom: "10px",
  },

  cardText: {
    color: "#64748b",
    lineHeight: "1.7",
    fontSize: "15px",
    marginBottom: "18px",
  },

  cardLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "15px",
  },
};

export default Home;