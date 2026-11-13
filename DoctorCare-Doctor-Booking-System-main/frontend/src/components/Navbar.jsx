import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "./Icons";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { languages } from "../i18n";

function LanguageMenu() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const close = (event) => {
      if (event.type === "keydown" && event.key !== "Escape") return;
      if (event.type === "mousedown" && ref.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const current = languages.find((item) => item.code === language);

  return (
    <div className="language-menu" ref={ref}>
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="globe" size={17} />
        <span className="lang-label">{current?.name}</span>
      </button>

      {open && (
        <ul className="menu-popover" role="listbox" aria-label={t("language")}>
          {languages.map((item) => (
            <li key={item.code} role="option" aria-selected={item.code === language}>
              <button
                type="button"
                className={item.code === language ? "active" : ""}
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
              >
                {item.name}
                {item.code === language && <Icon name="check" size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AccountActions() {
  const { t } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();

  if (isLoggedIn) {
    return (
      <>
        <span className="nav-user" title={user.email}>
          <Icon name="user" size={16} />
          {user.name.split(" ")[0]}
        </span>
        <button type="button" className="btn btn-outline btn-sm" onClick={logout}>
          <Icon name="logout" size={16} />
          {t("logout")}
        </button>
      </>
    );
  }

  return (
    <>
      <Link to="/login" className="btn btn-ghost btn-sm">
        {t("login")}
      </Link>
      <Link to="/register" className="btn btn-primary btn-sm">
        {t("getStarted")}
      </Link>
    </>
  );
}

function Navbar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  // The menu is "open" only for the page it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState(null);
  const menuOpen = openAt === pathname;

  const links = [
    { to: "/", label: t("home"), end: true },
    { to: "/doctors", label: t("doctors") },
    { to: "/appointments", label: t("appointments") },
    { to: "/about", label: t("about") },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Icon name="logo" size={18} />
          </span>
          <span className="brand-text">
            <span className="brand-name">DoctorCare</span>
            <small>{t("brandTagline")}</small>
          </span>
        </Link>

        <nav
          id="primary-nav"
          className={`nav-links ${menuOpen ? "open" : ""}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/emergency" className="nav-emergency">
            <Icon name="siren" size={16} />
            {t("emergency")}
          </NavLink>

          <div className="nav-account nav-account-mobile">
            <AccountActions />
          </div>
        </nav>

        <div className="nav-actions">
          <LanguageMenu />
          <div className="nav-account-desktop">
            <AccountActions />
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon nav-toggle"
            aria-label={t("menu")}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setOpenAt(menuOpen ? null : pathname)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
