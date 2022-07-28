import React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedRouteLoggedIn from "../ProtectedRoute/ProtectedRouteLoggedIn";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import "./App.css";

import * as mainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = React.useState(false);
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [searchData, setSearchData] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [numberOfMovies, setNumberOfMovies] = React.useState([]);
  const location = useLocation();
  const history = useHistory();

  const pathWithHeader = ["/", "/movies", "/saved-movies", "/profile"];
  const pathWithFooter = ["/", "/movies", "/saved-movies"];
  const middleWidth = window.matchMedia(
    "(max-width: 989px) and (min-width: 589px)"
  );
  const smallWidth = window.matchMedia("(max-width: 589px)");

  function handleUpdateUser({ name, email }) {
    mainApi
      .updateUserInfo({ name, email })
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((err) => console.log(err));
  }

  const onLogin = (data) => {
    mainApi
      .authorize(data)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        history.push("/movies");
      })
      .catch((err) => setWrongEmailOrPassword(true));
  };

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  };

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getContent(jwt)
        .then((res) => {
          console.log(res);
          setCurrentUser(res.data);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }

  function isShortFilmCheck() {
    const shortFilm = localStorage.getItem("shortFilm");
    if (shortFilm === null) {
      setIsShortFilm(false)
    } else {
      setIsShortFilm(true)
    }
  }

  React.useEffect(() => {
    tokenCheck();
    isShortFilmCheck();
  }, []);

  const onChangeSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchData(value);
  };

  const onChangeShortFilms = (e) => {
    setIsShortFilm(!isShortFilm);
  };
  const [newNumberSmall, setNewNumberSmall] = React.useState(8);
  const [newNumberMiddle, setNewNumberMiddle] = React.useState(5);
  const [newNumber, setNewNumber] = React.useState(12);

  function numberOfFilms(filteredMovies) {
    if (middleWidth.matches) {
      const number = 8;
      const numberOfMovies = filteredMovies.slice(0, number);
      setNumberOfMovies(numberOfMovies);
      console.log(filteredMovies);
      return;
    } else if (smallWidth.matches) {
      const numberOfMovies = filteredMovies.slice(0, 5);
      setNumberOfMovies(numberOfMovies);
      return;
    }
    const numberOfMovies = filteredMovies.slice(0, 12);
    setNumberOfMovies(numberOfMovies);
  }

  // function addMovies() {
  //   const searchedFilms = JSON.parse(localStorage.getItem("searchedFilms"));
  //   if (middleWidth.matches) {
  //     setNewNumberMiddle(newNumberMiddle + 2);
  //     const filteredMovies = searchedFilms.slice(0, newNumberMiddle);
  //     numberOfFilms(filteredMovies);
  //     return;
  //   } else if (smallWidth.matches) {
  //     setNewNumberSmall(newNumberSmall + 5);
  //     const filteredMovies = searchedFilms.slice(0, newNumberSmall);
  //     numberOfFilms(filteredMovies);
  //     return;
  //   }
  //   setNewNumber(newNumber + 4);
  //   const filteredMovies = searchedFilms.slice(0, newNumber + 4);
  //   numberOfFilms(filteredMovies);
  // }

  // function numberOfFilms(filteredMovies) {
  //   if (middleWidth.matches) {
  //     const numberOfMovies = filteredMovies.slice(0, newNumberSmall);
  //     setNumberOfMovies(numberOfMovies);
  //     return;
  //   } else if (smallWidth.matches) {
  //     const numberOfMovies = filteredMovies.slice(0, newNumberMiddle);
  //     setNumberOfMovies(numberOfMovies);
  //     return;
  //   }
  //   const numberOfMovies = filteredMovies.slice(0, newNumber);
  //   setNumberOfMovies(numberOfMovies);
  // }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {pathWithHeader.includes(location.pathname) ? (
          <Header loggedIn={loggedIn} />
        ) : null}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            onChangeSearch={onChangeSearch}
            onChangeShortFilms={onChangeShortFilms}
            searchData={searchData}
            // numberOfFilms={numberOfFilms}
            numberOfMovies={numberOfMovies}
            isShortFilm={isShortFilm}
            // addMovies={addMovies}
            setIsShortFilm={setIsShortFilm}
            exact
            path="/movies"
            component={Movies}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            onChangeSearch={onChangeSearch}
            onChangeShortFilms={onChangeShortFilms}
            searchData={searchData}
            // numberOfFilms={numberOfFilms}
            numberOfMovies={numberOfMovies}
            // addMovies={addMovies}
            isShortFilm={isShortFilm}
            exact
            path="/saved-movies"
            component={SavedMovies}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/profile"
            component={Profile}
            onLogout={onLogout}
            handleUpdateUser={handleUpdateUser}
          />
          <ProtectedRouteLoggedIn
            loggedIn={loggedIn}
            onLogin={onLogin}
            wrongEmailOrPassword={wrongEmailOrPassword}
            exact
            path="/signin"
            component={Login}
          />
          <ProtectedRouteLoggedIn
            loggedIn={loggedIn}
            onLogin={onLogin}
            exact
            path="/signup"
            component={Register}
          />
          <Route exact path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {pathWithFooter.includes(location.pathname) ? <Footer /> : null}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
