import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      // Save user and token through AuthContext
      login(data.user, data.token);

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
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
          onSubmit={handleLogin}
          style={{
            maxWidth: "450px",
            margin: "50px auto",
            background: "white",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1>{t("welcomeBack") || "Welcome Back"}</h1>

          <p>
            {t("loginHealthcare") ||
              "Login to manage your healthcare."}
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
            type="email"
            placeholder={t("emailAddress") || "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              {t("getStarted") || "Register"}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
