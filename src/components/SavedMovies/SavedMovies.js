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
  addMovies,
}) {
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const savedMoviesCardList = true;

  function handleSubmit(e) {
    e.preventDefault();
    setShowPreloader(true);
    const filteredMovies = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchData);
    });
    if (isShortFilm) {
      const durationCheck = filteredMovies.filter((movie) => {
        return movie.duration < 40;
      });
      setFilteredMovies(durationCheck);
      numberOfFilms(durationCheck);
      setShowPreloader(false);
      return;
    }
    setFilteredMovies(filteredMovies);
    numberOfFilms(filteredMovies);
    setShowPreloader(false);
  }

  React.useEffect(() => {
    setShowPreloader(true);
    Promise.all([mainApi.getMovies()])
      .then((movies) => {
        setMovies(movies[0].data);
        setFilteredMovies(movies[0].data)
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
        movies={filteredMovies}
        onChangeSearch={onChangeSearch}
        onChangeShortFilms={onChangeShortFilms}
        onSubmit={handleSubmit}
        searchData={searchData}
      />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          numberOfMovies={filteredMovies}
          savedMoviesCardList={savedMoviesCardList}
          addMovies={addMovies}
        />
      )}
    </div>
  );
}

export default SavedMovies;
