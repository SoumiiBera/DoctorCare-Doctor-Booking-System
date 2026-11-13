import { Link } from "react-router-dom";
import Icon from "./Icons";
import { useLanguage } from "../hooks/useLanguage";
import { formatCurrency, getInitials } from "../utils/format";

export function DoctorAvatar({ doctor, size = "md" }) {
  return (
    <div className={`avatar avatar-${size}`}>
      {doctor.image ? (
        <img src={doctor.image} alt={doctor.name} loading="lazy" />
      ) : (
        <span aria-hidden="true">{getInitials(doctor.name)}</span>
      )}
    </div>
  );
}

function DoctorCard({ doctor }) {
  const { t } = useLanguage();

  return (
    <article className="card doctor-card">
      <header className="doctor-card-head">
        <DoctorAvatar doctor={doctor} />
        <div>
          <h3>{doctor.name}</h3>
          <p className="doctor-specialty">{doctor.specialization}</p>
          <span className="badge badge-success">
            <Icon name="check" size={13} /> {t("verifiedDoctor")}
          </span>
        </div>
      </header>

      <ul className="meta-list">
        <li>
          <Icon name="graduation" size={17} />
          {doctor.qualification}
        </li>
        {doctor.hospital && (
          <li>
            <Icon name="hospital" size={17} />
            {doctor.hospital}
          </li>
        )}
        {doctor.location && (
          <li>
            <Icon name="pin" size={17} />
            {doctor.location}
          </li>
        )}
      </ul>

      <dl className="stat-row">
        <div>
          <dt>{t("rating")}</dt>
          <dd>
            <Icon name="star" size={14} className="icon-star" /> {doctor.rating}
          </dd>
        </div>
        <div>
          <dt>{t("yearsShort")}</dt>
          <dd>{doctor.experience}+</dd>
        </div>
        <div>
          <dt>{t("consultation")}</dt>
          <dd>{formatCurrency(doctor.consultationFee)}</dd>
        </div>
      </dl>

      <div className="card-actions">
        <Link to={`/doctor/${doctor._id}`} className="btn btn-outline">
          {t("viewProfile")}
        </Link>
        <Link to={`/appointment/${doctor._id}`} className="btn btn-primary">
          {t("bookNow")}
        </Link>
      </div>
    </article>
  );
}

export default DoctorCard;
