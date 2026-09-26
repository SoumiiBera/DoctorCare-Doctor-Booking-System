import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    language: "English",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <form
          onSubmit={handleRegister}
          style={{
            maxWidth: "500px",
            margin: "50px auto",
            background: "white",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1>
            {t("createAccount") || "Create Account"}
          </h1>

          <p>
            {t("createAccountSubtitle") ||
              "Create your DoctorCare account."}
          </p>

          {error && (
            <div
              style={{
                background: "#ffe5e5",
                color: "#d00000",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <input
            name="name"
            placeholder={t("fullName") || "Full Name"}
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder={t("emailAddress") || "Email"}
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder={t("phoneNumber") || "Phone"}
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <select
            name="language"
            value={form.language}
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="Bengali">বাংলা</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
          </select>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
            style={{
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
