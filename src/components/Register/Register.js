import React from "react";
import { NavLink } from "react-router-dom";
import * as auth from "../../utils/MainApi";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register({ onLogin }) {
  const [registerData, setRegisterData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [conflict, setConflict] = React.useState(false);
  const [isValidName, setValidityName] = React.useState(false);
  const [errorName, setErrorName] = React.useState("");
  const [isValidEmail, setValidityEmail] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState("");
  const [isValidPassword, setValidityPassword] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState("");


  function isValiEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      setValidityEmail(false);
    } else {
      setValidityEmail(true);
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameInput = document.getElementById("name");
    setValidityName(nameInput.validity.valid);
    if (!isValidName) {
      setErrorName(nameInput.validationMessage);
    } else {
      setErrorName("");
    }
    const emailInput = document.getElementById("email");
    isValiEmail(emailInput.value)
    if (!isValidEmail) {
      setErrorEmail("Введите корректный email");
    } else {
      setErrorEmail("");
    }
    const namePassword = document.getElementById("password");
    setValidityPassword(namePassword.validity.valid);
    if (!isValidPassword) {
      setErrorPassword(namePassword.validationMessage);
    } else {
      setErrorPassword("");
    }
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
      .catch((err) => setConflict(true));
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
          className="register__input-err"
          id="name-error"
        >
          {errorName}
        </span>
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
          className="register__input-err"
          id="email-error"
        >
          {errorEmail}
        </span>
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
          className="register__input-err"
          id="signup-password-error"
        >
          {errorPassword}
        </span>
        <button
          disabled={!isValidName || !isValidEmail || !isValidPassword}
          className="register__button"
        >
          Зарегистрироваться
        </button>
        {conflict ? (
          <p className="register__text register__text_type_error">Этот е-майл уже зарегистрирован</p>
        ) : (
          ""
        )}
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