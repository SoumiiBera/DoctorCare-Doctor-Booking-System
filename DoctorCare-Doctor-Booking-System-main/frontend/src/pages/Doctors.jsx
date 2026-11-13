import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import Icon from "../components/Icons";
import StateMessage, { DoctorGridSkeleton } from "../components/StateMessage";
import { useDoctors } from "../hooks/useDoctors";
import { useLanguage } from "../hooks/useLanguage";

function Doctors() {
  const { t } = useLanguage();
  const { doctors, loading, error, retry } = useDoctors();
  const [params, setParams] = useSearchParams();

  const search = params.get("search") || "";
  const specialty = params.get("specialty") || "";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const specialties = useMemo(
    () => [...new Set(doctors.map((doctor) => doctor.specialization))].sort(),
    [doctors]
  );

  const visibleDoctors = useMemo(() => {
    const term = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSpecialty = !specialty || doctor.specialization === specialty;
      const matchesSearch =
        !term ||
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialization.toLowerCase().includes(term);
      return matchesSpecialty && matchesSearch;
    });
  }, [doctors, search, specialty]);

  const hasFilters = Boolean(search || specialty);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{t("findDoctor")}</h1>
          <p className="lead">{t("findTrusted")}</p>

          <div className="search-bar" role="search">
            <Icon name="search" size={20} />
            <input
              type="search"
              value={search}
              onChange={(event) => updateParam("search", event.target.value)}
              placeholder={t("searchDoctor")}
              aria-label={t("searchDoctor")}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!loading && !error && specialties.length > 0 && (
            <div className="chip-row" role="group" aria-label={t("browseBySpecialty")}>
              <button
                type="button"
                className={`chip ${!specialty ? "active" : ""}`}
                aria-pressed={!specialty}
                onClick={() => updateParam("specialty", "")}
              >
                {t("allSpecialties")}
              </button>
              {specialties.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`chip ${specialty === item ? "active" : ""}`}
                  aria-pressed={specialty === item}
                  onClick={() => updateParam("specialty", item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {!loading && !error && doctors.length > 0 && (
            <p className="result-count" aria-live="polite">
              {visibleDoctors.length} {t("doctorsCount")}
            </p>
          )}

          {loading && <DoctorGridSkeleton />}

          {error && (
            <StateMessage
              icon="alert"
              tone="error"
              title={t("errorTitle")}
              text={t("loadDoctorsError")}
              action={
                <button type="button" className="btn btn-primary" onClick={retry}>
                  {t("tryAgain")}
                </button>
              }
            />
          )}

          {!loading && !error && doctors.length === 0 && (
            <StateMessage title={t("noDoctorFound")} text={t("noDoctorsYet")} />
          )}

          {!loading && !error && doctors.length > 0 && visibleDoctors.length === 0 && (
            <StateMessage
              icon="search"
              title={t("noDoctorFound")}
              text={t("tryAnotherDoctor")}
              action={
                hasFilters && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setParams({}, { replace: true })}
                  >
                    {t("clearFilters")}
                  </button>
                )
              }
            />
          )}

          {visibleDoctors.length > 0 && (
            <div className="doctor-grid">
              {visibleDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Doctors;
