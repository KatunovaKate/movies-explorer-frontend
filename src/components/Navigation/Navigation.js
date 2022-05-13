import React from "react";
import { NavLink } from "react-router-dom";
import icon from "../../images/icon__COLOR_icon-main.svg";

import "./Navigation.css";

function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen ? "navigation_opened" : ""}`}>
      <div className="navigation__buttons navigation__buttons_type_main">
        <NavLink
          activeClassName={`navigation__link_type_bold`}
          className={"navigation__link navigation__link_type_main"}
          to={"/movies"}
        >
          Фильмы
        </NavLink>
        <NavLink
          activeClassName={`navigation__link_type_bold`}
          className={"navigation__link navigation__link_type_main"}
          to={"/saved-movies"}
        >
          Сохраненные фильмы
        </NavLink>
      </div>
      <NavLink className={"navigation__account navigation__account_type_main"} to={"/profile"}>
        <img className={"navigation__account-img"} src={icon} alt="account-icon" />
        <p className={"navigation__account-text"}>Аккаунт</p>
      </NavLink>
      
      <div className="navigation__container">
        <button className="navigation__button-close" />
        <div className="navigation__buttons">
          <NavLink
            activeClassName={`navigation__link_type_bold`}
            className={"navigation__link navigation__link_type_main"}
            to={"/saved-movies"}
          >
            Главная
          </NavLink>
          <NavLink
            activeClassName={`navigation__link_type_bold`}
            className={"navigation__link navigation__link_type_main"}
            to={"/movies"}
          >
            Фильмы
          </NavLink>
          <NavLink
            activeClassName={`navigation__link_type_bold`}
            className={"navigation__link navigation__link_type_main"}
            to={"/saved-movies"}
          >
            Сохраненные фильмы
          </NavLink>
        </div>
        <NavLink
          activeClassName="navigation__link_type_disabled"
          className={"navigation__account"}
          to={"/profile"}
        >
          <img
            className={"navigation__account-img"}
            src={icon}
            alt="account-icon"
          />
          <p className={"navigation__account-text"}>Аккаунт</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
