import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";

function MoviesCard({ movieElement, savedMoviesCardList }) {
  const location = useLocation();
  const pathChangeIcon = ["/saved-movies"];

  function onAddClick() {
    mainApi
      .addMovie({
        movieId: "123",
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
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function onDeleteClick() {
    mainApi
      .deleteMovie(movieElement._id)
      .then(() => {
        // setNumberOfMovies((state) => state.filter((item) => item._id !== movieElement._id))
      })
      .catch((err) => console.log(err));
  }

  return (
    <li className="movies-card">
      <img
        className="movies-card__image"
        alt={movieElement.nameRU}
        src={`${savedMoviesCardList ? `${movieElement.image}` : `https://api.nomoreparties.co/${movieElement.image.url}`
        }`}
      />
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
              onClick={onAddClick}
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
