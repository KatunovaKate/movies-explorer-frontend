import React from "react";
import { NavLink } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h2 className="page-not-found__error">404</h2>
      <p className="page-not-found__error-message">Страница не найдена</p>
      <NavLink className={"page-not-found__link"} to={"/"}>
        Назад
      </NavLink>
    </div>
  );
}

export default PageNotFound;
