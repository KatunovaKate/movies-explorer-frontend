import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import api from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";

function Movies({
  onChangeSearch,
  onChangeShortFilms,
  searchData,
  numberOfFilms,
  numberOfMovies,
  isShortFilm,
  // addMovies,
  setIsShortFilm,
}) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [showPreloader, setShowPreloader] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setShowPreloader(true);
    const films = JSON.parse(localStorage.getItem("films"));
    if (films === null) {
      api
        .getMovies()
        .then((movies) => {
          localStorage.setItem("films", JSON.stringify(movies));
          filter();
        })
        .finally(() => setShowPreloader(false))
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
    }
    filter();
    setShowPreloader(false);
  }

  function filter() {
    const films = JSON.parse(localStorage.getItem("films"));
    const filteredMovies = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchData);
    });
    if (isShortFilm) {
      const durationCheck = filteredMovies.filter((movie) => {
        return movie.duration < 40;
      });
      localStorage.setItem("searchedFilms", JSON.stringify(durationCheck));
      localStorage.setItem("shortFilm", true);
      setFilteredMovies(durationCheck);
      // numberOfFilms(durationCheck);
      return;
    }
    localStorage.setItem("searchedFilms", JSON.stringify(filteredMovies));
    localStorage.removeItem("shortFilm");
    setFilteredMovies(filteredMovies);
    // numberOfFilms(filteredMovies);
  }

  React.useEffect(() => {
    mainApi
      .getMovies()
      .then((savedMovies) => {setSavedMovies(savedMovies)})
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
    console.log(savedMovies)
  }, []);

  React.useEffect(() => {
    const searchedFilms = JSON.parse(localStorage.getItem("searchedFilms"));
    setFilteredMovies(searchedFilms);
    // numberOfFilms(searchedFilms);
  }, []);

  const debounce = (func, wait, immediate) => {
    var timeout;
    return () => {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
    console.log(windowWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  // window.addEventListener(
  //   "resize",
  //   debounce(() => setFilteredMovies(filteredMovies), 200, false),
  //   false
  // );

  return (
    <div className="movies">
      <SearchForm
        onChangeSearch={onChangeSearch}
        onChangeShortFilms={onChangeShortFilms}
        onSubmit={handleSubmit}
        searchData={searchData}
        isShortFilm={isShortFilm}
      />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          numberOfMovies={filteredMovies}
          // addMovies={addMovies}
        />
      )}
    </div>
  );
}

export default Movies;