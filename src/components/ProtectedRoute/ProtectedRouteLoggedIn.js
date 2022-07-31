import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteLoggedIn = ({ component: Component, ...props }) => {
  
  const jwt = localStorage.getItem("jwt")
  
  return (
    <Route>
      {() => 
        props.loggedIn || jwt ? <Redirect to="/movies" /> : <Component {...props} />
      }
    </Route>
  );
};

export default ProtectedRouteLoggedIn;