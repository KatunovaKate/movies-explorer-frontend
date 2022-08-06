import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ numberOfMovies, savedMoviesCardList, handleDeleteSuccess, savedMovies }) { //добавил массив лайкнутых фильмов как пропс
  const [length, checkLength] = React.useState(true);

  React.useEffect(() => {
    const savedFilms = localStorage.getItem("savedFilms");
    const films = JSON.parse(localStorage.getItem("films"));
    if (savedFilms === null || films === null) {
      return;
    }
    films.map((i) => {
      const likedMovies = JSON.parse(savedFilms).includes(i.nameRU);
      if (true) {
        // setIsLikedMovie(true);
      }
      console.log(likedMovies)
    });
    // console.log(isLikedMovie)
    
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
          !savedMoviesCardList ? 
          numberOfMovies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movieElement={movie}
                savedMoviesCardList={savedMoviesCardList}
                handleDeleteSuccess={handleDeleteSuccess}
                // setIsLikedMovie={setIsLikedMovie}
                // isLikedMovie={isLikedMovie}

              />
            );
          }) || ""
          : savedMovies?.map((movie) => { //маппим массив сохраненных фильмов
  
            return (
              <MoviesCard
                key={movie[1].id}
                movieElement={movie[1]}
                savedMoviesCardList={savedMoviesCardList}
                handleDeleteSuccess={handleDeleteSuccess}
              />
            );
          }) || ""
        )}
      </ul>
      {/* {numberOfMovies === null ||
      numberOfMovies.length <= visibleMoviesCount ? (
        ""
      ) : (
        <button 
        // onClick={addMovies}
         className={`movies-list__button`}>
          Ещё
        </button>
      )} */}
    </section>
  );
}

export default MoviesCardList;
