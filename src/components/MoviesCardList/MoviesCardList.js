import "./MoviesCardList.css";
import imageMovie from "../../images/imageMovie.png";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
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
    <section className="movies-list">
      <ul className="movies-list_cards">
        {movies.map((movie) => {
          return <MoviesCard key={movie._id} movieElement={movie} />;
        })}
      </ul>
      <button className="movies-list_button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
