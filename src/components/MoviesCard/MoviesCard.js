import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";

function MoviesCard({
  movieElement,
  savedMoviesCardList,
  handleDeleteSuccess,
  isLikedMovie,
  setIsLikedMovie
}) {
  const [isLiked, setIsLiked] = React.useState(false);
  const location = useLocation();
  const pathChangeIcon = ["/saved-movies"];

  const createLikedFilmsLs = () => !localStorage.getItem('liked-films') ? localStorage.setItem('liked-films', '[]') : null; //если в локалсторадже нет массива создаем его

  const findHelper = (ls, movieName) => ls.find(e => e[0] == movieName) ? true : false; //вспомогательная функция ищущая в локалсторадже есть ли там фильм. Вообще все хелперы нужно выносить в отдельный файл и оттуда импортировать. Принцип единой ответственности применяется также и к компонентам Реакта

  const getLs = () => JSON.parse(localStorage.getItem("liked-films")); //получаем локалсторадж

  



  const removeAddToLs = movieName => { //добавляем или удаляем в локалсторадж фильм
    let ls = getLs(); 
    let found = findHelper(ls, movieName);
    if ( found ) { //если фильм там есть...
      let filteredLs = ls.filter(e => e[0] !== movieName); //удаляем из массива фильм
      localStorage.setItem('liked-films', JSON.stringify(filteredLs)); //кладем в локалсторадж
      setIsLiked(!isLiked); //меняем стейт на противоположный
    } else { //...а если фильма там нет
      ls.push([movieName, movieElement]); //пушим его в массив
      localStorage.setItem('liked-films', JSON.stringify(ls)); //кладем в локалсторадж
      setIsLiked(!isLiked); //меняем стейт на противоположный
    }
  };



  function onAddClick() { //функция onDeleteClick не нужна, принцип единой ответственности - одна функция удаляет и добавляет
    createLikedFilmsLs();  //если в локалсторадже нет массива создаем его
    removeAddToLs(movieElement.nameRU); //добавляем или удаляем в локалсторадж фильм
    if (!isLiked) {
    
      // const ls = localStorage.getItem('liked-films');
      // if (!ls) {
      //   localStorage.setItem('liked-films', '[]');
      // }
      // let likedFilms = JSON
      //   .parse(localStorage.getItem("liked-films"))
      //   .concat(movieElement.nameRU);    
      //   localStorage.setItem('liked-films', JSON. stringify(likedFilms));

        console.log(localStorage.getItem('liked-films'));
        
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
          //setIsLiked(true);
          // setlikedMovie(...savedFilms, res);
          // console.log(savedFilms)

          
          // Object.values(likedFilms);
          // console.log(typeof likedFilms)
          // console.log(Object.entries(likedFilms))
          // if (likedFilms === null) {
          //   localStorage.setItem("liked-films", JSON.stringify(movieElement.nameRU));
          // } else {
          //   likedFilms.push(movieElement.nameRU)
          //   console.log(likedFilms)
          //   localStorage.setItem('liked-films', JSON.stringify(likedFilms));
          // }
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
      //setIsLiked(false);
    }
  }

  React.useEffect(() => {
    //ниже псевдокод на подумать на тему того, как можно реализовать запоминание лайкнутого фильма в основной выдаче
    let ls = getLs();
    if (ls) {
      let found = findHelper(ls, movieElement.nameRU);

      console.log(found)

      if ( found ) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }

      if (pathChangeIcon.includes(location.pathname) || found) {
        setIsLiked(true)
      } else {
       setIsLiked(false)
        // const films = JSON.parse(localStorage.getItem("films"));
        // console.log(savedFilms)
        // console.log(films)
      }
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
          {pathChangeIcon.includes(location.pathname) || isLiked ? ( //вебапи не работало, добавил стейт
            <input
              className="movies-card__button-remove"
              type="button"
              onClick={onAddClick}
            />
          ) : (
            <input
              className="movies-card__button-radio"
              type="checkbox"
              id="like"
              name="like"
              onChange={setIsLiked} 

              onClick={onAddClick}
              checked={
                isLikedMovie
                  ? true
                  : false
              }
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
