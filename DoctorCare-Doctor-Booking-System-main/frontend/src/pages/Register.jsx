import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import FormField from "../components/FormField";
import Icon from "../components/Icons";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { registerUser } from "../services/authService";
import { getErrorMessage } from "../utils/format";
import { isValidEmail, isValidPhone } from "../utils/validation";

// Values must match the backend User.language enum.
const LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Bengali", label: "বাংলা" },
  { value: "Hindi", label: "हिन्दी" },
  { value: "Marathi", label: "मराठी" },
  { value: "Tamil", label: "தமிழ்" },
  { value: "Telugu", label: "తెలుగు" },
  { value: "Kannada", label: "ಕನ್ನಡ" },
];

const UI_TO_PROFILE_LANGUAGE = { en: "English", bn: "Bengali", hi: "Hindi", mr: "Marathi" };

function Register() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { isLoggedIn } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    language: UI_TO_PROFILE_LANGUAGE[language] || "English",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/" replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t("fieldRequired");
    if (!isValidEmail(form.email)) next.email = t("invalidEmail");
    if (!isValidPhone(form.phone)) next.phone = t("invalidPhone");
    if (form.password.length < 6) next.password = t("passwordTooShort");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      await registerUser({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      navigate("/login", { replace: true, state: { registered: true } });
    } catch (err) {
      setServerError(getErrorMessage(err, t("errorTitle")));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t("createAccount")} subtitle={t("createAccountSubtitle")}>
      {serverError && (
        <div className="alert alert-error" role="alert">
          <Icon name="alert" size={18} /> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="form-stack">
        <FormField
          id="name"
          name="name"
          autoComplete="name"
          label={t("fullName")}
          placeholder={t("enterFullName")}
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
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
        <FormField
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          label={t("phoneNumber")}
          placeholder={t("enterPhone")}
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <PasswordField
          id="password"
          name="password"
          autoComplete="new-password"
          label={t("password")}
          placeholder={t("enterPassword")}
          hint={t("passwordHint")}
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FormField
          id="language"
          name="language"
          as="select"
          label={t("preferredLanguage")}
          value={form.language}
          onChange={handleChange}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormField>

        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
          {loading ? t("creatingAccount") : t("createAccount")}
        </button>
      </form>

      <p className="auth-switch">
        {t("haveAccount")} <Link to="/login">{t("login")}</Link>
      </p>
    </AuthShell>
  );
}

export default Register;
