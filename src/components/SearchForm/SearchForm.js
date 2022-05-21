import "./SearchForm.css";

function SearchForm({
  onChangeSearch,
  onChangeShortFilms,
  onSubmit,
  searchData,
}) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label className="search-form_switch_search">
        <input
          className="search-form_input"
          type="search"
          required
          placeholder="Фильм"
          value={searchData || ""}
          name="title"
          onChange={onChangeSearch}
        />
        <button className="search-form_button">Найти</button>
      </label>
      <label className="search-form_checkbox-label" for="short-films">
        Короткометражки
      </label>
      <label className="search-form_switch">
        <input
          onChange={onChangeShortFilms}
          className="search-form_switch-input"
          type="checkbox"
          id="short-films"
          name="short-films"
        />
        <span className="search-form_switch-slider" />
      </label>
    </form>
  );
}

export default SearchForm;
