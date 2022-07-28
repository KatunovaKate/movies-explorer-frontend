import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ numberOfMovies, savedMoviesCardList, addMovies }) {
  const [length, checkLength] = React.useState(true);

  // не работает if --- мб в movies
  React.useEffect(() => {
    const searchedFilms = JSON.parse(localStorage.getItem("searchedFilms"));
    if (searchedFilms === null) {
      checkLength(true);
      console.log(1)
    } else {
      checkLength(false);
      console.log(2)
    }
  }, []);

  return (
    <section
      className={`movies-list ${
        savedMoviesCardList ? "movies-list_saved-movies" : ""
      }`}
    >
      <ul className="movies-list__cards">
        {length ? (
          <p>Ничего не найдено</p>
        ) : 
        (
          numberOfMovies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movieElement={movie}
                savedMoviesCardList={savedMoviesCardList}
              />
            );
          }) || ""
        )}
      </ul>
      {/* {numberOfMovies.length >= 12
      // searchedFilms.length 
      ? (
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
      )} */}
    </section>
  );
}

export default MoviesCardList;
