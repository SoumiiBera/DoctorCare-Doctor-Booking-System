function LanguageSelector() {
  const changeLanguage = (language) => {
    localStorage.setItem(
      "language",
      language
    );

    alert(`Language changed to ${language}`);
  };

  return (
    <select
      onChange={(e) =>
        changeLanguage(e.target.value)
      }
      defaultValue="English"
    >
      <option>English</option>
      <option>বাংলা</option>
      <option>Hindi</option>
      <option>Marathi</option>
      <option>Tamil</option>
      <option>Telugu</option>
      <option>Kannada</option>
    </select>
  );
}

export default LanguageSelector;