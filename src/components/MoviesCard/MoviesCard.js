import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";

function MoviesCard({
  movieElement,
  savedMoviesCardList,
  handleDeleteSuccess,
  isLikedMovie,
}) {
  const [isLiked, setIsLiked] = React.useState(isLikedMovie);
  const location = useLocation();
  const pathChangeIcon = ["/saved-movies"];

  function onAddClick() {
    if (!isLiked) {
      mainApi
        .addMovie({
          movieId: movieElement.id,
          country: movieElement.country,
          director: movieElement.director,
          duration: movieElement.duration,
          year: movieElement.year,
          description: movieElement.description,
          image: `https://api.nomoreparties.co/${movieElement.image.url}`,
          trailerLink: movieElement.trailerLink,
          thumbnail: `https://api.nomoreparties.co/${movieElement.image.formats.thumbnail.url}`,
          nameRU: movieElement.nameRU,
          nameEN: movieElement.nameEN,
        })
        .then(() => {
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .getMovies()
        .then((savedmovies) => {
          const newFilms = savedmovies.data.filter(
            (item) => item.nameRU === movieElement.nameRU
          );
          console.log(newFilms);
          mainApi
            .deleteMovie(newFilms[0]._id)
            .then(() => {
              console.log("Фильм удален");
              getSavedFilms()
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
      setIsLiked(false);
    }
    getSavedFilms()
  }

  function onDeleteClick() {
    mainApi
      .deleteMovie(movieElement._id)
      .then((movieElement) => {
        handleDeleteSuccess(movieElement);
        getSavedFilms()
      })
      .catch((err) => console.log(err));
  }

  function getSavedFilms() {
    mainApi
      .getMovies()
      .then((res) => {
        localStorage.setItem("savedFilms", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <li className="movies-card">
      <a href={`${movieElement.trailerLink}`} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          alt={movieElement.nameRU}
          src={`${
            savedMoviesCardList
              ? `${movieElement.image}`
              : `https://api.nomoreparties.co/${movieElement.image.url}`
          }`}
        />
      </a>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movieElement.nameRU}</h2>
        <label className="movies-card__button">
          {pathChangeIcon.includes(location.pathname) ? (
            <input
              className="movies-card__button-remove"
              type="button"
              onClick={onDeleteClick}
            />
          ) : (
            <input
              className="movies-card__button-radio"
              type="checkbox"
              id={`like-${movieElement.id}`}
              name="like"
              onClick={onAddClick}
              checked={isLiked ? true : false}
            />
          )}
          {pathChangeIcon.includes(location.pathname) ? (
            ""
          ) : (
            <span className="movies-card__button-label" />
          )}
        </label>
      </div>
      <p className="movies-card__duration">{movieElement.duration}</p>
    </li>
  );
}

export default MoviesCard;
