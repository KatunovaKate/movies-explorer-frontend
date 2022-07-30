import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";

function MoviesCard({
  movieElement,
  savedMoviesCardList,
  handleDeleteSuccess,
}) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [savedFilms, setlikedMovie] = React.useState([]);
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
        .then((res) => {
          setIsLiked(true);
          // setlikedMovie(...savedFilms, res);
          // console.log(savedFilms)
          const likedFilms = JSON.parse(localStorage.getItem("liked-films"))
          Object.values(likedFilms);
          console.log(typeof likedFilms)
          console.log(Object.entries(likedFilms))
          if (likedFilms === null) {
            localStorage.setItem("liked-films", JSON.stringify(movieElement.nameRU));
          } else {
            likedFilms.push(movieElement.nameRU)
            console.log(likedFilms)
            localStorage.setItem('liked-films', JSON.stringify(likedFilms));
          }
          // setlikedMovie(...movieElement.nameRU);
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .getMovies()
        .then((savedmovies) => {
          const newFilms = savedmovies.data.filter(
            (item) => item.nameRU === movieElement.nameRU
          );
          mainApi
            .deleteMovie(newFilms[0]._id)
            .then(() => {
              console.log("1");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
      setIsLiked(false);
    }
  }

  React.useEffect(() => {
    if (pathChangeIcon.includes(location.pathname)) {
      return;
    } else {
      // const films = JSON.parse(localStorage.getItem("films"));
      // console.log(savedFilms)
      // console.log(films)
    }
  }, []);

  function onDeleteClick() {
    mainApi
      .deleteMovie(movieElement._id)
      .then((movieElement) => {
        handleDeleteSuccess(movieElement);
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
