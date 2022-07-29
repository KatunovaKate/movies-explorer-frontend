import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";

function MoviesCard({ movieElement, savedMoviesCardList, numberOfMovies, films, setFilms }) {
  
  const [isLiked, setIsLiked] = React.useState(false);
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
      console.log(movieElement)
      //найти по названию этот же фильм, но на сервере = вытащить оттуда шв = перекинкть в функцию
      // onDeleteClick()
      setIsLiked(false)
    } 
  }

  // React.useEffect(() => {
  //   if (pathChangeIcon.includes(location.pathname)) {
  //     return;
  //   } else {
  //     const input = document.getElementById('like');
  //     const like = localStorage.getItem("likes");
  //     if (like) {
  //       input.checked = true;
  //       setIsLiked(true)
  //     } else {
  //       input.checked = false;
  //       setIsLiked(false)
  //     }
  //   }
  // }, [isLiked]);

  function onDeleteClick() {
    mainApi
      .deleteMovie(movieElement._id)
      .then((movieElement) => {
        const newFilms = films.filter((item) => item._id !== movieElement.data._id) 
        setFilms(newFilms)
      })
      .catch((err) => console.log(err));
  }

  return (
    <li className="movies-card">
      <a href={`${movieElement.trailerLink}`} target="_blank" rel="noreferrer"><img
        className="movies-card__image"
        alt={movieElement.nameRU}
        src={`${savedMoviesCardList ? `${movieElement.image}` : `https://api.nomoreparties.co/${movieElement.image.url}`
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
              id="like"
              name="like"
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
