import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { DoctorAvatar } from "../components/DoctorCard";
import Icon from "../components/Icons";
import StateMessage, { Spinner } from "../components/StateMessage";
import { useAppointments } from "../hooks/useAppointments";
import { useLanguage } from "../hooks/useLanguage";
import { cancelAppointment } from "../services/appointmentService";
import { formatCurrency, formatDate, getErrorMessage } from "../utils/format";

const STATUS = {
  Upcoming: { key: "upcoming", badge: "badge-info" },
  Completed: { key: "completed", badge: "badge-success" },
  Cancelled: { key: "cancelled", badge: "badge-muted" },
};

const TABS = ["All", "Upcoming", "Completed", "Cancelled"];

function MyAppointments() {
  const { t } = useLanguage();
  const { items, loading, error, retry, replaceItem } = useAppointments();

  const [tab, setTab] = useState("All");
  const [pending, setPending] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [notice, setNotice] = useState(null);

  const counts = useMemo(() => {
    const result = { All: items.length };
    items.forEach((item) => {
      result[item.status] = (result[item.status] || 0) + 1;
    });
    return result;
  }, [items]);

  const visible = tab === "All" ? items : items.filter((item) => item.status === tab);

  const handleCancel = async () => {
    setCancelling(true);

    try {
      const data = await cancelAppointment(pending._id);
      replaceItem(data.appointment);
      setNotice({ type: "success", text: t("cancelledOk") });
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err, t("errorTitle")) });
    } finally {
      setCancelling(false);
      setPending(null);
    }
  };

  return (
    <div className="container section">
      <div className="page-title page-title-row">
        <div>
          <h1>{t("myAppointments")}</h1>
          <p className="muted">{t("appointmentsSubtitle")}</p>
        </div>
        <Link to="/doctors" className="btn btn-primary">
          <Icon name="calendar" size={18} /> {t("bookNow")}
        </Link>
      </div>

      {notice && (
        <div
          className={`alert ${notice.type === "success" ? "alert-success" : "alert-error"}`}
          role={notice.type === "error" ? "alert" : "status"}
        >
          <Icon name={notice.type === "success" ? "check" : "alert"} size={18} />
          {notice.text}
        </div>
      )}

      {loading && <Spinner label={t("loading")} />}

      {error && (
        <StateMessage
          icon="alert"
          tone="error"
          title={t("errorTitle")}
          action={
            <button type="button" className="btn btn-primary" onClick={retry}>
              {t("tryAgain")}
            </button>
          }
        />
      )}

      {!loading && !error && items.length === 0 && (
        <StateMessage
          icon="calendar"
          title={t("noAppointmentsTitle")}
          text={t("noAppointmentsText")}
          action={
            <Link to="/doctors" className="btn btn-primary">
              {t("findDoctors")}
            </Link>
          }
        />
      )}

      {!loading && !error && items.length > 0 && (
        <>
          <div className="tabs" role="tablist" aria-label={t("myAppointments")}>
            {TABS.map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={tab === name}
                className={tab === name ? "active" : ""}
                onClick={() => setTab(name)}
              >
                {name === "All" ? t("all") : t(STATUS[name].key)}
                <span className="tab-count">{counts[name] || 0}</span>
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <StateMessage icon="calendar" title={t("nothingHere")} />
          ) : (
            <ul className="appointment-list">
              {visible.map((item) => {
                const doctor = item.doctor;
                const status = STATUS[item.status] || STATUS.Upcoming;

                return (
                  <li className="card appointment" key={item._id}>
                    {doctor && <DoctorAvatar doctor={doctor} />}

                    <div className="appointment-body">
                      <div className="appointment-title">
                        <h3>{doctor?.name || t("doctorLabel")}</h3>
                        <span className={`badge ${status.badge}`}>{t(status.key)}</span>
                      </div>
                      {doctor && <p className="doctor-specialty">{doctor.specialization}</p>}

                      <ul className="meta-list meta-inline">
                        <li>
                          <Icon name="calendar" size={16} /> {formatDate(item.date)}
                        </li>
                        <li>
                          <Icon name="clock" size={16} /> {item.time}
                        </li>
                        {doctor?.hospital && (
                          <li>
                            <Icon name="hospital" size={16} /> {doctor.hospital}
                          </li>
                        )}
                        {doctor && <li>{formatCurrency(doctor.consultationFee)}</li>}
                      </ul>

                      {item.reason && (
                        <p className="appointment-reason">
                          <strong>{t("reason")}:</strong> {item.reason}
                        </p>
                      )}
                    </div>

                    {item.status === "Upcoming" && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          setNotice(null);
                          setPending(item);
                        }}
                      >
                        {t("cancelAppointment")}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      <ConfirmDialog
        open={Boolean(pending)}
        title={t("cancelTitle")}
        text={t("cancelText")}
        confirmLabel={cancelling ? t("cancelling") : t("yesCancel")}
        cancelLabel={t("keepIt")}
        busy={cancelling}
        onConfirm={handleCancel}
        onClose={() => setPending(null)}
      />
    </div>
  );
}

export default MyAppointments;
