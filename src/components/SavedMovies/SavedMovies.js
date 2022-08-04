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
  const [savedMovies, setSavedMovies] = React.useState([]); //стейт для информации из локалстораджа
  const [films, setFilms] = React.useState([]);
  const savedMoviesCardList = true;

  function handleSubmit(e) {
    e.preventDefault();
    setShowPreloader(true);
    const filteredMovies = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchData);
    });
    if (isShortFilm) {
      const durationCheck = filteredMovies.filter((movie) => {
        return movie.duration < 40;
      });
      localStorage.setItem("shortFilm", true);
      setFilteredMovies(durationCheck);
      // numberOfFilms(durationCheck);
      return;
    }
    localStorage.removeItem("shortFilm");
    setFilteredMovies(filteredMovies);
    // numberOfFilms(filteredMovies);
    setShowPreloader(false);
  }

  React.useEffect(() => {
    
    let ls = JSON.parse( localStorage.getItem('liked-films') ); //парсим лс
    setSavedMovies(ls); //кладем отпаршенный лс в стейт

    setShowPreloader(true);
    Promise.all([mainApi.getMovies()])
      .then((movies) => {
        setFilms(movies[0].data);
        setFilteredMovies(movies[0].data)
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`)) //пользователь консол лог не увидит, ошибка должна быть заметна для юзера
      .finally(setShowPreloader(false));
  }, []);

  const handleDeleteSuccess = (movieElement) => {
    const newFilms = films.filter((item) => item._id !== movieElement.data._id) 
    setFilms(newFilms)
    //!! Вот тут нужно пофильтровать наверно предварительно, решай исходя из своей логике в коде
    setFilteredMovies(newFilms) 
  }

  return (
    <div className="saved-movies">
      <SearchForm
        movies={filteredMovies}
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
          savedMovies={savedMovies} //передаем сохраненные фильмы как пропс
          savedMoviesCardList={savedMoviesCardList}
          handleDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}

export default SavedMovies;
