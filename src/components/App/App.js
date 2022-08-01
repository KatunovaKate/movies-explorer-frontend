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
  const [currentUser, setCurrentUser] = React.useState({});
  const location = useLocation();
  const history = useHistory();

  const pathWithHeader = ["/", "/movies", "/saved-movies", "/profile"];
  const pathWithFooter = ["/", "/movies", "/saved-movies"];

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
          setCurrentUser(res.data);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const initialCount = (windowWidth) => {
    if (windowWidth >= 1280) {
      return 12;
    } else if (windowWidth >= 768) {
      return 8;
    }
    return 5;
  };

  const getLoadStep = (windowWidth) => {
    if (windowWidth >= 1280) {
      return 4;
    } else if (windowWidth >= 768) {
      return 2;
    }
    return 2;
  };

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(
    initialCount(windowWidth)
  );

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  function addMovies() {
    setVisibleMoviesCount((prevCount) => prevCount + getLoadStep(windowWidth));
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
            addMovies={addMovies}
            visibleMoviesCount={visibleMoviesCount}
            exact
            path="/movies"
            component={Movies}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            addMovies={addMovies}
            visibleMoviesCount={visibleMoviesCount}
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
