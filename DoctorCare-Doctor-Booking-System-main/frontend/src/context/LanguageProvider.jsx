import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./language-context";
import { languages, translations } from "../i18n";

const STORAGE_KEY = "doctorcare_language";

function readStoredLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return translations[saved] ? saved : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  useEffect(() => {
    const current = languages.find((item) => item.code === language);
    document.documentElement.lang = current?.htmlLang || "en";
  }, [language]);

  const setLanguage = useCallback((code) => {
    if (!translations[code]) return;
    localStorage.setItem(STORAGE_KEY, code);
    setLanguageState(code);
  }, []);

  const t = useCallback(
    (key) => translations[language]?.[key] ?? translations.en[key] ?? key,
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
