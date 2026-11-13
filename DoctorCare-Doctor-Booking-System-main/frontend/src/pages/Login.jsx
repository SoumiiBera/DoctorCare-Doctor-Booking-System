import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import FormField from "../components/FormField";
import Icon from "../components/Icons";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { loginUser } from "../services/authService";
import { getErrorMessage } from "../utils/format";
import { isValidEmail } from "../utils/validation";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login, isLoggedIn } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from || "/";

  if (isLoggedIn) return <Navigate to={redirectTo} replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!isValidEmail(form.email)) next.email = t("invalidEmail");
    if (!form.password) next.password = t("fieldRequired");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const data = await loginUser({ email: form.email.trim(), password: form.password });
      login(data.user, data.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(getErrorMessage(err, t("errorTitle")));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t("welcomeBack")} subtitle={t("loginHealthcare")}>
      {location.state?.registered && (
        <div className="alert alert-success" role="status">
          <Icon name="check" size={18} /> {t("accountCreated")}
        </div>
      )}
      {location.state?.from && !location.state?.registered && (
        <div className="alert alert-info" role="status">
          <Icon name="user" size={18} /> {t("loginRequired")}
        </div>
      )}
      {serverError && (
        <div className="alert alert-error" role="alert">
          <Icon name="alert" size={18} /> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="form-stack">
        <FormField
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          label={t("emailAddress")}
          placeholder={t("enterEmail")}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PasswordField
          id="password"
          name="password"
          autoComplete="current-password"
          label={t("password")}
          placeholder={t("enterPassword")}
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
          {loading ? t("loggingIn") : t("login")}
        </button>
      </form>

      <p className="auth-switch">
        {t("noAccount")} <Link to="/register">{t("createAccount")}</Link>
      </p>
    </AuthShell>
  );
}

export default Login;
