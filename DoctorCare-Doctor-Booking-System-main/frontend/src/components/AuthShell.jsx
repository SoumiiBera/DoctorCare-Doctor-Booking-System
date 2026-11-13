import Icon from "./Icons";
import { useLanguage } from "../hooks/useLanguage";

// Two-column wrapper shared by Login and Register.
function AuthShell({ title, subtitle, children }) {
  const { t } = useLanguage();

  return (
    <div className="container auth-layout">
      <aside className="auth-aside">
        <h2>{t("healthcareMade")}</h2>
        <ul className="check-list">
          {["why1", "why2", "why3", "why4"].map((key) => (
            <li key={key}>
              <span className="check-dot">
                <Icon name="check" size={14} />
              </span>
              {t(key)}
            </li>
          ))}
        </ul>
      </aside>

      <section className="card auth-card">
        <h1>{title}</h1>
        <p className="muted">{subtitle}</p>
        {children}
      </section>
    </div>
  );
}

export default AuthShell;
