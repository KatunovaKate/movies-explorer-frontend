import React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
      .catch((err) => console.log(err));
  };

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
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
  React.useEffect(() => {
    tokenCheck();
  }, []);

  const onChangeSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchData(value);
  };

  const onChangeShortFilms = (e) => {
    setIsShortFilm(!isShortFilm);
  };

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

  function addMovies() {
    // if (middleWidth.matches) {
    //   const newNumber = number + 4;
    //   return;
    // }
  }

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
            numberOfFilms={numberOfFilms}
            numberOfMovies={numberOfMovies}
            isShortFilm={isShortFilm}
            addMovies={addMovies}
            exact
            path="/movies"
            component={Movies}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            onChangeSearch={onChangeSearch}
            onChangeShortFilms={onChangeShortFilms}
            searchData={searchData}
            numberOfFilms={numberOfFilms}
            numberOfMovies={numberOfMovies}
            addMovies={addMovies}
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
          <Route exact path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/signup">
            <Register onLogin={onLogin} />
          </Route>
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
