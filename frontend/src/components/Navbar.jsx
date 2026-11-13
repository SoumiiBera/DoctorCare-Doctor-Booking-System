import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "bn", name: "বাংলা" },
    { code: "hi", name: "हिन्दी" },
    { code: "mr", name: "मराठी" },
  ];

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setShowLanguages(false);
  };

  const currentLanguage =
    languages.find((item) => item.code === language)?.name || "English";

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <div className="logo-icon">✚</div>

          <div className="logo-text">
            <span>DoctorCare</span>
            <small>Healthcare, Simplified</small>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div className="nav-links">
          <Link to="/">{t("home")}</Link>

          <Link to="/doctors">{t("doctors")}</Link>

          <Link to="/appointments">
            {t("appointments")}
          </Link>

          <Link to="/about">
            {t("about")}
          </Link>

          <Link to="/emergency" className="emergency-link">
            {t("emergency")}
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">

          {/* LANGUAGE */}
          <div className="language-wrapper">

            <button
              className="language-btn"
              onClick={() =>
                setShowLanguages(!showLanguages)
              }
            >
              🌐 {currentLanguage} ▾
            </button>

            {showLanguages && (
              <div className="language-menu">

                {languages.map((item) => (
                  <button
                    key={item.code}
                    className={
                      language === item.code
                        ? "language-option active"
                        : "language-option"
                    }
                    onClick={() =>
                      handleLanguageChange(item.code)
                    }
                  >
                    <span>{item.name}</span>

                    {language === item.code && (
                      <span>✓</span>
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* LOGIN */}
          <Link
            to="/login"
            className="login-btn"
          >
            {t("login")}
          </Link>

          {/* GET STARTED */}
          <Link
            to="/register"
            className="register-btn"
          >
            {t("getStarted")}
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;