import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {

  const jwt = localStorage.getItem("jwt")

  return (
    <Route>
      {() => 
        props.loggedIn || jwt ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;