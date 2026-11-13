function SearchBar({
  value,
  onChange,
  onSearch,
}) {
  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search doctors..."
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;