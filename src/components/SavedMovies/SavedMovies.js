import "./SavedMovies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as mainApi from "../../utils/MainApi";

function SavedMovies({ addMovies, visibleMoviesCount }) {
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]); //стейт для информации из локалстораджа
  const [films, setFilms] = React.useState([]);
  const savedMoviesCardList = true;
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [searchData, setSearchData] = React.useState("");

  function isShortFilmCheck() {
    const shortFilm = localStorage.getItem("shortSaveFilm");
    if (shortFilm === null) {
      setIsShortFilm(false);
    } else {
      setIsShortFilm(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowPreloader(true);
    localStorage.setItem("save-data", searchData);
    const filteredMovies = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchData);
    });
    if (isShortFilm) {
      const durationCheck = filteredMovies.filter((movie) => {
        return movie.duration < 40;
      });
      localStorage.setItem("shortSaveFilm", true);
      setFilteredMovies(durationCheck);
      setShowPreloader(false);
      return;
    }
    localStorage.removeItem("shortSaveFilm");
    setFilteredMovies(filteredMovies);
    setShowPreloader(false);
  }

  const [length, checkLength] = React.useState(true);

  React.useEffect(() => {
    
    let ls = JSON.parse( localStorage.getItem('liked-films') ); //парсим лс
    setSavedMovies(ls); //кладем отпаршенный лс в стейт

    setShowPreloader(true);
    Promise.all([mainApi.getMovies()])
      .then((movies) => {
        setFilms(movies[0].data);
        setFilteredMovies(movies[0].data);
        isShortFilmCheck();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`)) //пользователь консол лог не увидит, ошибка должна быть заметна для юзера
      .finally(setShowPreloader(false));
  }, []);

  React.useEffect(() => {
    if (
      films === null ||
      films.length === 0 ||
      filteredMovies === null ||
      filteredMovies.length === 0
    ) {
      checkLength(true);
    } else {
      checkLength(false);
    }
  }, [films, filteredMovies]);

  const handleDeleteSuccess = (movieElement) => {
    const newFilms = films.filter((item) => item._id !== movieElement.data._id);
    setFilms(newFilms);
    //!! Вот тут нужно пофильтровать наверно предварительно, решай исходя из своей логике в коде
    setFilteredMovies(newFilms);
  };

  return (
    <div className="saved-movies">
      <SearchForm
        movies={filteredMovies}
        setSearchData={setSearchData}
        onSubmit={handleSubmit}
        searchData={searchData}
        isShortFilm={isShortFilm}
        setIsShortFilm={setIsShortFilm}
        savedMoviesCardList={savedMoviesCardList}
      />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          numberOfMovies={filteredMovies}
          savedMovies={savedMovies} //передаем сохраненные фильмы как пропс
          savedMoviesCardList={savedMoviesCardList}
          handleDeleteSuccess={handleDeleteSuccess}
          visibleMoviesCount={visibleMoviesCount}
          addMovies={addMovies}
          length={length}
        />
      )}
    </div>
  );
}

export default SavedMovies;
