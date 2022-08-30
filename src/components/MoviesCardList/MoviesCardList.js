import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  numberOfMovies,
  savedMoviesCardList,
  handleDeleteSuccess,
  addMovies,
  visibleMoviesCount,
  length,
}) {

  function isMovieInSavedArray(movieID) {
    const savedFilms = JSON.parse(localStorage.getItem("savedFilms"));
    if (savedFilms === null) {
      return;
    }
    let isLiked;
    savedFilms.some((film) => {
      if (movieID === film.movieId) {
        return isLiked = true;
      } else {
        return isLiked = false;
      }
    });
    return isLiked;
  }

  return (
    <section
      className={`movies-list ${
        savedMoviesCardList ? "movies-list_saved-movies" : ""
      }`}
    >
      <ul className="movies-list__cards">
        {length ? (
          <p>Ничего не найдено</p>
        ) : (
          numberOfMovies.slice(0, visibleMoviesCount).map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movieElement={movie}
                savedMoviesCardList={savedMoviesCardList}
                handleDeleteSuccess={handleDeleteSuccess}
                isLikedMovie={isMovieInSavedArray(movie.id)}
              />
            );
          }) || ""
        )}
      </ul>
      {numberOfMovies === null ||
      numberOfMovies.length <= visibleMoviesCount ? (
        ""
      ) : (
        <button onClick={addMovies} className={`movies-list__button`}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;