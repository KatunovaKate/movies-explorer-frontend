import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import api from "../../utils/MoviesApi";

function Movies({
  onChangeSearch,
  onChangeShortFilms,
  searchData,
  numberOfFilms,
  numberOfMovies,
  isShortFilm,
  addMovies,
  setMovies,
  movies,
}) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [showPreloader, setShowPreloader] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setShowPreloader(true);
    api
      .getMovies()
      .then((films) => {
        setMovies(films);
        const filteredMovies = films.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(searchData);
        });
        if (isShortFilm) {
          const durationCheck = filteredMovies.filter((movie) => {
            return movie.duration < 40;
          });
          setFilteredMovies(durationCheck);
          numberOfFilms(durationCheck);
          return;
        }
        setFilteredMovies(filteredMovies);
        numberOfFilms(filteredMovies);
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
      .finally(setShowPreloader(false));
  }

  // React.useEffect(() => {
  //   numberOfFilms(filteredMovies);
  // }, []);

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

  window.addEventListener(
    "resize",
    debounce(() => numberOfFilms(filteredMovies), 200, false),
    false
  );

  return (
    <div className="movies">
      <SearchForm
        movies={movies}
        onChangeSearch={onChangeSearch}
        onChangeShortFilms={onChangeShortFilms}
        onSubmit={handleSubmit}
        searchData={searchData}
      />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList numberOfMovies={numberOfMovies} addMovies={addMovies} />
      )}
    </div>
  );
}

export default Movies;
