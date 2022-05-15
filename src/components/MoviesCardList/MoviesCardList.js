import "./MoviesCardList.css";
import imageMovie from "../../images/imageMovie.png";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const movies = [
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 1,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 2,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 3,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 1,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 2,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 3,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 1,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 2,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 3,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 1,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 2,
    },
    {
      title: "33 слова о дизайне",
      duration: "1ч42м",
      image: imageMovie,
      _id: 3,
    },
  ];

  return (
    <section className={`movies-list ${props.SavedMoviesCardList ? "movies-list_saved-movies" : ""}`}>
      <ul className="movies-list__cards">
        {movies.map((movie) => {
          return <MoviesCard key={movie._id} movieElement={movie} />;
        })}
      </ul>
      <button className={`movies-list__button ${props.SavedMoviesCardList ? "movies-list__button_disabled" : ""}`}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
