import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icons";
import { useLanguage } from "../hooks/useLanguage";
import { QUICK_SPECIALTIES } from "../constants/specialties";
import { STEPS } from "../constants/steps";

const BENEFITS = ["why1", "why2", "why3", "why4"];

function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const search = query.trim();
    navigate(search ? `/doctors?search=${encodeURIComponent(search)}` : "/doctors");
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="badge badge-soft">
              <Icon name="stethoscope" size={15} /> {t("welcome")}
            </span>
            <h1>{t("healthcareMade")}</h1>
            <p className="lead">
              {t("simpleAccessible")} {t("findTrusted")}
            </p>

            <form className="search-bar" onSubmit={handleSearch} role="search">
              <Icon name="search" size={20} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchDoctor")}
                aria-label={t("quickSearch")}
              />
              <button type="submit" className="btn btn-primary">
                {t("search")}
              </button>
            </form>

            <div className="chip-row">
              <span className="chip-label">{t("browseBySpecialty")}:</span>
              {QUICK_SPECIALTIES.map((specialty) => (
                <Link
                  key={specialty}
                  to={`/doctors?specialty=${encodeURIComponent(specialty)}`}
                  className="chip"
                >
                  {specialty}
                </Link>
              ))}
            </div>
          </div>

          <aside className="hero-panel card" aria-label={t("whyTitle")}>
            <h2>{t("whyTitle")}</h2>
            <ul className="check-list">
              {BENEFITS.map((key) => (
                <li key={key}>
                  <span className="check-dot">
                    <Icon name="check" size={14} />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
            <Link to="/doctors" className="btn btn-primary btn-block">
              {t("findDoctors")} <Icon name="arrow" size={18} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{t("howItWorks")}</h2>
          </div>
          <ol className="steps">
            {STEPS.map((step, index) => (
              <li className="card step" key={step.title}>
                <span className="step-number">{index + 1}</span>
                <span className="step-icon">
                  <Icon name={step.icon} size={24} />
                </span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="banner banner-danger">
            <span className="banner-icon">
              <Icon name="siren" size={26} />
            </span>
            <div className="banner-text">
              <h2>{t("emergencyBannerTitle")}</h2>
              <p>{t("emergencyBannerText")}</p>
            </div>
            <div className="banner-actions">
              <a href="tel:112" className="btn btn-danger">
                <Icon name="phone" size={18} /> {t("call")} 112
              </a>
              <Link to="/emergency" className="btn btn-outline-light">
                {t("emergencyHelp")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
