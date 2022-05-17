import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register({ loggedIn }) {
  return (
    <div className="register">
      <NavLink onClick={loggedIn} className={"register__link-logo"} to={"/"}>
        <img className="register__logo" src={logo} alt="logo" />
      </NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <label className="register__input-label" for="signup-name">
          Имя
        </label>
        <input
          className="register__input"
          type="text"
          id="signup-name"
          name="signup-name"
          required
          minLength={3}
          maxLength={30}
          placeholder="Иван"
        />
        <span
          className="register__input-error signup-name-error"
          id="signup-name-error"
        ></span>
        <label className="register__input-label" for="signup-email">
          E-mail
        </label>
        <input
          className="register__input"
          type="email"
          id="signup-email"
          name="signup-email"
          required
          minLength={3}
          maxLength={30}
          placeholder="email@gmail.com"
        />
        <span
          className="register__input-error signup-email-error"
          id="signup-email-error"
        ></span>
        <label className="register__input-label" for="signup-password">
          Пароль
        </label>
        <input
          className="register__input"
          type="password"
          id="signup-password"
          name="signup-password"
          required
          minLength={3}
          placeholder="123456"
        />
        <span
          className="register_input-error signup-password-error"
          id="signup-password-error"
        ></span>
        <button className="register__button">Зарегистрироваться</button>
        <p className="register__text">
          Уже зарегистрированы?{" "}
          <NavLink className={"register__link-signout"} to={"/signin"}>
            Войти
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
