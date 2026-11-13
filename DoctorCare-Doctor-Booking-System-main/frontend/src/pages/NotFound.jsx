import { Link } from "react-router-dom";
import StateMessage from "../components/StateMessage";
import { useLanguage } from "../hooks/useLanguage";

function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="container section">
      <StateMessage
        icon="search"
        title={t("pageNotFound")}
        text={t("pageNotFoundText")}
        action={
          <Link to="/" className="btn btn-primary">
            {t("backHome")}
          </Link>
        }
      />
    </div>
  );
}

export default NotFound;
