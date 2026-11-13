import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DoctorAvatar } from "../components/DoctorCard";
import FormField from "../components/FormField";
import Icon from "../components/Icons";
import StateMessage, { Spinner } from "../components/StateMessage";
import { useAuth } from "../hooks/useAuth";
import { useDoctor } from "../hooks/useDoctor";
import { useLanguage } from "../hooks/useLanguage";
import { createAppointment, getBookedSlots } from "../services/appointmentService";
import { formatCurrency, formatDate, getErrorMessage, todayISO } from "../utils/format";

function Appointment() {
  const { doctorId } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { doctor, loading, error } = useDoctor(doctorId);

  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmed, setConfirmed] = useState(null);
  const latestRequest = useRef(0);

  const loadBookedSlots = async (date) => {
    const requestId = ++latestRequest.current;

    try {
      const slots = await getBookedSlots(doctorId, date);
      if (requestId === latestRequest.current) setBookedSlots(slots);
    } catch {
      if (requestId === latestRequest.current) setBookedSlots([]);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setForm((current) => ({ ...current, date, time: "" }));
    setBookedSlots([]);
    setFormError("");
    if (date) loadBookedSlots(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.date || !form.time) {
      setFormError(`${t("chooseDate")} / ${t("chooseTime")}`);
      return;
    }

    setFormError("");
    setSubmitting(true);

    try {
      const data = await createAppointment({ doctor: doctorId, ...form });
      setConfirmed(data.appointment);
      window.scrollTo({ top: 0 });
    } catch (err) {
      setFormError(getErrorMessage(err, t("bookingFailed")));

      if (err.response?.status === 409) {
        setForm((current) => ({ ...current, time: "" }));
        loadBookedSlots(form.date);
      }
    } finally {
      setSubmitting(false);
    }
  };

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

  if (confirmed) {
    return (
      <div className="container section">
        <div className="card confirmation">
          <span className="confirmation-icon">
            <Icon name="check" size={32} />
          </span>
          <h1>{t("appointmentBooked")}</h1>
          <p>
            {t("appointmentSuccessWith")} <strong>{doctor.name}</strong>{" "}
            {t("appointmentSuccessfullyBooked")}
          </p>

          <dl className="summary-list">
            <div>
              <dt>{t("doctorLabel")}</dt>
              <dd>{doctor.name}</dd>
            </div>
            <div>
              <dt>{t("dateLabel")}</dt>
              <dd>{formatDate(confirmed.date)}</dd>
            </div>
            <div>
              <dt>{t("timeLabel")}</dt>
              <dd>{confirmed.time}</dd>
            </div>
            <div>
              <dt>{t("feeLabel")}</dt>
              <dd>{formatCurrency(doctor.consultationFee)}</dd>
            </div>
          </dl>

          <div className="confirmation-actions">
            <Link to="/appointments" className="btn btn-primary">
              {t("viewMyAppointments")}
            </Link>
            <Link to="/doctors" className="btn btn-outline">
              {t("backToDoctors")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const slots = doctor.availableSlots || [];

  return (
    <div className="container section">
      <Link to={`/doctor/${doctor._id}`} className="back-link">
        <Icon name="arrowLeft" size={18} /> {doctor.name}
      </Link>

      <div className="page-title">
        <h1>{t("bookYourAppointment")}</h1>
        <p className="muted">{t("scheduleConsultation")}</p>
      </div>

      <div className="booking-layout">
        <form className="card form-card" onSubmit={handleSubmit} noValidate>
          <h2 className="subheading">{t("bookingFor")}</h2>
          <div className="form-grid">
            <FormField id="patient-name" label={t("fullName")} value={user.name} readOnly />
            <FormField
              id="patient-email"
              label={t("emailAddress")}
              type="email"
              value={user.email}
              readOnly
            />
            <FormField
              id="patient-phone"
              label={t("phoneNumber")}
              type="tel"
              value={user.phone || ""}
              readOnly
            />
          </div>

          <h2 className="subheading">{t("appointmentDate")}</h2>
          <FormField
            id="date"
            label={t("chooseDate")}
            type="date"
            min={todayISO()}
            value={form.date}
            onChange={handleDateChange}
            required
          />

          <fieldset className="slot-picker">
            <legend>{t("chooseTime")}</legend>

            {slots.length === 0 && <p className="muted">{t("noSlotsListed")}</p>}
            {slots.length > 0 && !form.date && <p className="muted">{t("pickDateFirst")}</p>}

            {slots.length > 0 && form.date && (
              <div className="slot-options">
                {slots.map((slot) => {
                  const taken = bookedSlots.includes(slot);

                  return (
                    <label
                      key={slot}
                      className={`slot-option ${taken ? "disabled" : ""}`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={slot}
                        checked={form.time === slot}
                        disabled={taken}
                        onChange={() => setForm((current) => ({ ...current, time: slot }))}
                      />
                      <span>
                        {slot}
                        {taken && <small>{t("slotTaken")}</small>}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </fieldset>

          <FormField
            id="reason"
            as="textarea"
            rows={3}
            label={`${t("reasonForVisit")} (${t("optional")})`}
            placeholder={t("reasonPlaceholder")}
            maxLength={300}
            value={form.reason}
            onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))}
          />

          {formError && (
            <div className="alert alert-error" role="alert">
              <Icon name="alert" size={18} /> {formError}
            </div>
          )}

          <p className="privacy-note">
            <Icon name="shield" size={16} /> {t("privacyNote")}
          </p>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            disabled={submitting || slots.length === 0}
          >
            {submitting ? t("confirming") : t("confirmAppointment")}
          </button>
        </form>

        <aside className="card summary-card">
          <DoctorAvatar doctor={doctor} size="lg" />
          <h2>{doctor.name}</h2>
          <p className="doctor-specialty">{doctor.specialization}</p>
          <ul className="meta-list">
            {doctor.hospital && (
              <li>
                <Icon name="hospital" size={17} /> {doctor.hospital}
              </li>
            )}
            {doctor.location && (
              <li>
                <Icon name="pin" size={17} /> {doctor.location}
              </li>
            )}
          </ul>
          <div className="fee-box">
            <span>{t("consultationFee")}</span>
            <strong>{formatCurrency(doctor.consultationFee)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Appointment;
