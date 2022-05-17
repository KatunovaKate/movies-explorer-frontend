import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ movieElement }) {
  const location = useLocation();
  const pathChangeIcon = ["/saved-movies"];

  return (
    <li className="movies-card">
      <img className="movies-card__image" alt={movieElement.title} src={movieElement.image}/>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movieElement.title}</h2>
        <label className="movies-card__button">
          {pathChangeIcon.includes(location.pathname) ? (
            <input className="movies-card__button-remove" type="button" />
          ) : (
            <input className="movies-card__button-radio" type="radio" />
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
