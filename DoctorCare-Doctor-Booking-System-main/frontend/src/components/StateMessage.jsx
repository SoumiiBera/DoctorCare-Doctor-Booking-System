import Icon from "./Icons";

// Shared loading / error / empty block used by every data page.
function StateMessage({ icon = "stethoscope", title, text, tone = "neutral", action }) {
  return (
    <div className={`state state-${tone}`} role={tone === "error" ? "alert" : "status"}>
      <span className="state-icon">
        <Icon name={icon} size={28} />
      </span>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action}
    </div>
  );
}

export function Spinner({ label }) {
  return (
    <div className="state" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      {label && <p>{label}</p>}
    </div>
  );
}

export function DoctorGridSkeleton({ count = 6 }) {
  return (
    <div className="doctor-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="card doctor-card skeleton-card" key={index}>
          <div className="skeleton skeleton-avatar" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-block" />
        </div>
      ))}
    </div>
  );
}

export default StateMessage;
