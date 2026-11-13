import Icon from "../components/Icons";
import { useLanguage } from "../hooks/useLanguage";

const HELPLINES = [
  { number: "112", label: "helpline112" },
  { number: "108", label: "helpline108" },
  { number: "102", label: "helpline102" },
  { number: "1098", label: "helpline1098" },
  { number: "14416", label: "helpline14416" },
];

const CHECKLIST = [
  { icon: "hospital", text: "check1" },
  { icon: "phone", text: "check2" },
  { icon: "stethoscope", text: "check3" },
  { icon: "shield", text: "check4" },
];

function Emergency() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero page-hero-danger">
        <div className="container">
          <span className="hero-icon">
            <Icon name="siren" size={30} />
          </span>
          <h1>{t("emergencyHelp")}</h1>
          <p className="lead">{t("emergencyBody")}</p>
          <a href="tel:112" className="btn btn-danger btn-lg">
            <Icon name="phone" size={20} /> {t("call")} 112
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{t("helplines")}</h2>
            <p className="muted">{t("emergencyIntro")}</p>
          </div>

          <ul className="helpline-grid">
            {HELPLINES.map((line) => (
              <li key={line.number}>
                <a className="card helpline" href={`tel:${line.number}`}>
                  <strong>{line.number}</strong>
                  <span>{t(line.label)}</span>
                  <Icon name="phone" size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="section-head">
            <h2>{t("emergencyChecklist")}</h2>
          </div>
          <ul className="steps">
            {CHECKLIST.map((item) => (
              <li className="card step" key={item.text}>
                <span className="step-icon">
                  <Icon name={item.icon} size={24} />
                </span>
                <p className="step-text-strong">{t(item.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Emergency;
