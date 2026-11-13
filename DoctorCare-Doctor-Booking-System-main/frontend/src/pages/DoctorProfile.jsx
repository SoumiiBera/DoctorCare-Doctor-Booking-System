import { Link, useParams } from "react-router-dom";
import { DoctorAvatar } from "../components/DoctorCard";
import Icon from "../components/Icons";
import StateMessage, { Spinner } from "../components/StateMessage";
import { useDoctor } from "../hooks/useDoctor";
import { useLanguage } from "../hooks/useLanguage";
import { formatCurrency } from "../utils/format";

function DoctorProfile() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { doctor, loading, error } = useDoctor(id);

  if (loading) {
    return (
      <div className="container section">
        <Spinner label={t("loading")} />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container section">
        <StateMessage
          icon="alert"
          tone="error"
          title={t("doctorNotFound")}
          text={t("doctorNotFoundMessage")}
          action={
            <Link to="/doctors" className="btn btn-primary">
              <Icon name="arrowLeft" size={18} /> {t("backToDoctors")}
            </Link>
          }
        />
      </div>
    );
  }

  const stats = [
    { label: t("experience"), value: `${doctor.experience} ${t("yearsExperience")}` },
    { label: t("rating"), value: doctor.rating },
    { label: t("qualification"), value: doctor.qualification },
  ];

  return (
    <div className="container section">
      <Link to="/doctors" className="back-link">
        <Icon name="arrowLeft" size={18} /> {t("backToDoctors")}
      </Link>

      <div className="profile-layout">
        <section className="card profile-main">
          <header className="profile-head">
            <DoctorAvatar doctor={doctor} size="lg" />
            <div>
              <span className="badge badge-success">
                <Icon name="check" size={13} /> {t("verifiedDoctor")}
              </span>
              <h1>{doctor.name}</h1>
              <p className="doctor-specialty">{doctor.specialization}</p>
            </div>
          </header>

          <dl className="stat-tiles">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="subheading">{t("aboutDoctor")}</h2>
          <ul className="meta-list meta-list-lg">
            {doctor.hospital && (
              <li>
                <Icon name="hospital" size={20} />
                <span>
                  <small>{t("hospital")}</small>
                  {doctor.hospital}
                </span>
              </li>
            )}
            {doctor.location && (
              <li>
                <Icon name="pin" size={20} />
                <span>
                  <small>{t("location")}</small>
                  {doctor.location}
                </span>
              </li>
            )}
            <li>
              <Icon name="shield" size={20} />
              <span>
                <small>{t("availableForConsultation")}</small>
                {t("onlineInPerson")}
              </span>
            </li>
          </ul>

          <h2 className="subheading">{t("availableSlots")}</h2>
          {doctor.availableSlots?.length > 0 ? (
            <ul className="slot-list">
              {doctor.availableSlots.map((slot) => (
                <li className="slot" key={slot}>
                  <Icon name="clock" size={15} /> {slot}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">{t("noSlotsListed")}</p>
          )}
        </section>

        <aside className="card booking-card">
          <p className="muted">{t("consultationFee")}</p>
          <p className="price">{formatCurrency(doctor.consultationFee)}</p>
          <Link to={`/appointment/${doctor._id}`} className="btn btn-primary btn-block btn-lg">
            <Icon name="calendar" size={20} /> {t("bookYourAppointment")}
          </Link>
          <Link to="/doctors" className="btn btn-ghost btn-block">
            {t("browseOtherDoctors")}
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default DoctorProfile;
