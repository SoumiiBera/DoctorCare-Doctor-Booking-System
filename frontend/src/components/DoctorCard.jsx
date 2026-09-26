import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function DoctorCard({ doctor }) {
  const { t } = useLanguage();

  // Safe translation
  const translate = (key, fallback) => {
    const result = t(key);
    return result === key ? fallback : result;
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "25px",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* DOCTOR ICON */}
      <div
        style={{
          width: "90px",
          height: "90px",
          margin: "0 auto 15px",
          borderRadius: "50%",
          background: "#e8f1ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "45px",
        }}
      >
        {doctor?.emoji || "👨‍⚕️"}
      </div>

      {/* DOCTOR NAME */}
      <h2
        style={{
          color: "#0f172a",
          fontSize: "21px",
          margin: "10px 0",
        }}
      >
        {doctor?.name || "Doctor"}
      </h2>

      {/* VERIFIED */}
      <span
        style={{
          display: "inline-block",
          background: "#ecfdf5",
          color: "#059669",
          padding: "5px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        ✓ {translate("verifiedDoctor", "Verified Doctor")}
      </span>

      {/* SPECIALIZATION */}
      <p
        style={{
          color: "#2563eb",
          fontWeight: "700",
          fontSize: "16px",
          margin: "8px 0",
        }}
      >
        {translate(
          doctor?.specialtyKey,
          doctor?.specialty || "Specialist"
        )}
      </p>

      {/* RATING */}
      <p
        style={{
          color: "#64748b",
          margin: "8px 0",
        }}
      >
        ⭐ {doctor?.rating || "4.8"}
      </p>

      {/* EXPERIENCE */}
      <p
        style={{
          color: "#64748b",
          margin: "8px 0",
        }}
      >
        🩺 {doctor?.experience || 0}{" "}
        {translate("yearsExperience", "Years Experience")}
      </p>

      {/* LOCATION */}
      <p
        style={{
          color: "#64748b",
          margin: "8px 0",
        }}
      >
        📍{" "}
        {translate(
          doctor?.locationKey,
          doctor?.location || "Kolkata"
        )}
      </p>

      {/* QUALIFICATION */}
      <p
        style={{
          color: "#64748b",
          fontSize: "14px",
          margin: "10px 0",
        }}
      >
        🎓{" "}
        {translate(
          doctor?.qualificationKey,
          doctor?.qualification || "MBBS"
        )}
      </p>

      {/* CONSULTATION FEE */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "15px",
        }}
      >
        <span
          style={{
            display: "block",
            color: "#94a3b8",
            fontSize: "12px",
            marginBottom: "3px",
          }}
        >
          {translate(
            "consultationFee",
            "Consultation Fee"
          )}
        </span>

        <strong
          style={{
            color: "#0f172a",
            fontSize: "22px",
          }}
        >
          {doctor?.fee || "₹500"}
        </strong>
      </div>

      {/* VIEW PROFILE */}
      <Link
        to={`/doctor/${doctor?.id}`}
        state={{ doctor }}
        style={{
          display: "block",
          marginTop: "18px",
          padding: "13px 20px",
          background: "#2563eb",
          color: "#ffffff",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        {translate("viewProfile", "View Profile")} →
      </Link>
    </div>
  );
}

export default DoctorCard;