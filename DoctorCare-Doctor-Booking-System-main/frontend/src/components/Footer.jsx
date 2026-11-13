import { Link } from "react-router-dom";
import Icon from "./Icons";
import { useLanguage } from "../hooks/useLanguage";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand brand-light">
            <span className="brand-mark">
              <Icon name="logo" size={18} />
            </span>
            <span className="brand-name">DoctorCare</span>
          </Link>
          <p className="footer-note">{t("footerNote")}</p>
        </div>

        <nav aria-label={t("quickLinks")}>
          <h4>{t("quickLinks")}</h4>
          <Link to="/doctors">{t("doctors")}</Link>
          <Link to="/appointments">{t("appointments")}</Link>
          <Link to="/about">{t("about")}</Link>
          <Link to="/emergency">{t("emergency")}</Link>
        </nav>

        <div>
          <h4>{t("helplines")}</h4>
          <a href="tel:112">112 · {t("helpline112")}</a>
          <a href="tel:108">108 · {t("helpline108")}</a>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          © {new Date().getFullYear()} DoctorCare. {t("rights")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
