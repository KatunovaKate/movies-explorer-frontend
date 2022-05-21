import React from "react";
import { NavLink } from "react-router-dom";
import * as auth from '../../utils/MainApi'
import logo from "../../images/logo.svg";
import "./Register.css";

function Register({ onLogin }) {
  const [registerData, setRegisterData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(registerData)
      .then(() => {
        onLogin(registerData).catch((err) =>
        console.log(err.message || "Что-то пошло не так")
      );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="register">
      <NavLink className={"register__link-logo"} to={"/"}>
        <img className="register__logo" src={logo} alt="logo" />
      </NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__input-label" htmlFor="name">
          Имя
        </label>
        <input
          className="register__input"
          value={registerData.name || ""}
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
          required
          minLength={3}
          maxLength={30}
          placeholder="Иван"
        />
        <span
          className="register__input-error signup-name-error"
          id="name-error"
        ></span>
        <label className="register__input-label" htmlFor="email">
          E-mail
        </label>
        <input
          className="register__input"
          value={registerData.email || ""}
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          required
          minLength={3}
          maxLength={30}
          placeholder="email@gmail.com"
        />
        <span
          className="register__input-error signup-email-error"
          id="email-error"
        ></span>
        <label className="register__input-label" htmlFor="password">
          Пароль
        </label>
        <input
          className="register__input"
          value={registerData.password || ""}
          onChange={handleChange}
          type="password"
          id="password"
          name="password"
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
