import { Link } from "react-router-dom";
import Icon from "../components/Icons";
import { STEPS } from "../constants/steps";
import { useLanguage } from "../hooks/useLanguage";

const BENEFITS = ["why1", "why2", "why3", "why4", "why5"];

function About() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{t("about")} DoctorCare</h1>
          <p className="lead">{t("aboutSubtitle")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <article className="card prose-card">
            <h2>{t("missionTitle")}</h2>
            <p>{t("missionText")}</p>
          </article>

          <article className="card prose-card">
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
          </article>
        </div>
      </section>

      <section className="section section-tight">
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
          <div className="center-actions">
            <Link to="/doctors" className="btn btn-primary btn-lg">
              {t("findDoctors")} <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
