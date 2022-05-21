import "./SavedMovies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as mainApi from "../../utils/MainApi";

function SavedMovies({
  onChangeSearch,
  onChangeShortFilms,
  searchData,
  numberOfFilms,
  numberOfMovies,
  isShortFilm,
  addMovies
}) {
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const savedMoviesCardList = true;

  function handleSubmit(e) {
    e.preventDefault();
    setShowPreloader(true);
    mainApi
      .getMovies()
      .then((films) => {
        setMovies(films);
        const filteredMovies = films.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(searchData);
        });
        if (isShortFilm) {
          const durationCheck = filteredMovies.filter((movie) => {
            return movie.duration < 40;
          })
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

  React.useEffect(() => {
    setShowPreloader(true);
    Promise.all([mainApi.getMovies()])
      .then((movies) => {
        setMovies(movies[0].data);
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
      .finally(setShowPreloader(false));
  }, []);

  React.useEffect(() => {
    numberOfFilms(movies);
  }, []);

  return (
    <div className="saved-movies">
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
        <MoviesCardList
          numberOfMovies={movies}
          savedMoviesCardList={savedMoviesCardList}
          addMovies={addMovies}
        />
      )}
    </div>
  );
}

export default SavedMovies;
