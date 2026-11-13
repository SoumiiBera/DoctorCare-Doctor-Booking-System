import { useState } from "react";
import FormField from "./FormField";
import Icon from "./Icons";
import { useLanguage } from "../hooks/useLanguage";

function PasswordField(props) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          className="field-toggle"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? t("hidePassword") : t("showPassword")}
          aria-pressed={visible}
        >
          <Icon name={visible ? "eyeOff" : "eye"} size={19} />
        </button>
      }
    />
  );
}

export default PasswordField;
