import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [isMenuBurgerOpen, setIsMenuBurgerOpen] =
  React.useState(false);
  
  function handleMenuBurger() {
    setIsMenuBurgerOpen(!isMenuBurgerOpen);
  }

  if (!loggedIn) {
    return (
      <div className="header">
        <div className="header__container">
          <NavLink className={"header__link"} to={"/"}>
            <img className="header__logo" src={logo} alt="logo" />
          </NavLink>
          <div className="header__buttons">
            <NavLink className={"header__link"} to={"/signup"}>
              Регистрация
            </NavLink>
            <NavLink className={"header__signin"} to={"/signin"}>
              Войти
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="header header_type_main">
      <div className="header__container">
        <NavLink className={"header__link"} to={"/"}>
          <img onClick={loggedIn} className="header__logo" src={logo} alt="logo" />
        </NavLink>
        <Navigation isOpen={isMenuBurgerOpen} />
        <button className={"header__burger"} onClick={handleMenuBurger}/>
      </div>
    </div>
  );
}

export default Header;
