import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  numberOfMovies,
  savedMoviesCardList,
  addMovies,
  setNumberOfMovies,
}) {
  return (
    <section
      className={`movies-list ${
        savedMoviesCardList ? "movies-list_saved-movies" : ""
      }`}
    >
      <ul className="movies-list__cards">
        {numberOfMovies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              movieElement={movie}
              savedMoviesCardList={savedMoviesCardList}
            />
          );
        }) || ""}
      </ul>
      {numberOfMovies.length < 10 ? (
        ""
      ) : (
        <button
          onClick={addMovies}
          className={`movies-list__button ${
            savedMoviesCardList ? "movies-list__button_disabled" : ""
          }`}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
