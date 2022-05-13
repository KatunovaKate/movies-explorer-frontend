import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

import "./Login.css";

function Login({ loggedIn }) {
  return (
    <div className="login">
      <NavLink onClick={loggedIn} className={"login__link-logo"} to={"/"}>
        <img className="login__logo" src={logo} alt="logo" />
      </NavLink>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__input-label" for="signin-email">
          E-mail
        </label>
        <input
          className="login__input"
          type="email"
          id="signin-email"
          name="signin-email"
          required
          minLength={3}
          maxLength={30}
          placeholder="email@gmail.com"
        />
        <span
          className="login__input-error signin-email-error"
          id="signup-email-error"
        ></span>
        <label className="login__input-label" for="signin-password">
          Пароль
        </label>
        <input
          className="login__input"
          type="password"
          id="signin-password"
          name="signin-password"
          required
          minLength={3}
          placeholder="123456"
        />
        <span
          className="login__input-error signin-password-error"
          id="signin-password-error"
        ></span>
        <button className="login__button">Войти</button>
        <p className="login__text">
          Ещё не зарегистрированы?{" "}
          <NavLink className={"login__link-signout"} to={"/signup"}>
            Регистрация
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
