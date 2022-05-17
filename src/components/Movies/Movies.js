import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
    </div>
  );
}

export default Movies;
