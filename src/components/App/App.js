import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

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

function App() {
  const [isNotStartHeader, setIsNotStartHeader] = React.useState(false);
  
  const location = useLocation();

  const pathWithHeader = ["/", "/movies", "/saved-movies", "/profile"];

  const pathChangeHeader = ["/movies", "/saved-movies", "/profile"];

  const pathWithFooter = ["/", "/movies", "/saved-movies"];

  React.useEffect(() => {
    if (pathChangeHeader.includes(location.pathname)) {
       setIsNotStartHeader(true);
    }
  }, []);

  return (
    <div className="app">
      {pathWithHeader.includes(location.pathname) ? (
        <Header 
        loggedIn={isNotStartHeader} />
      ) : null}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signin">
          <Login loggedIn={isNotStartHeader}/>
        </Route>
        <Route exact path="/signup">
          <Register loggedIn={isNotStartHeader}/>
        </Route>
        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>
      {pathWithFooter.includes(location.pathname) ? <Footer /> : null}
    </div>
  );
}

export default App;
