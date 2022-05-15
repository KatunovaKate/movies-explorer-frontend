import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  const SavedMoviesCardList = true;


  return (
    <div className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList SavedMoviesCardList={SavedMoviesCardList}/>
    </div>
  );
}

export default SavedMovies;
