import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";

import "./Login.css";

function Login({ onLogin }) {
  const [loginData, setRegisterData] = React.useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...loginData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(loginData).catch((err) => console.log(err));
    pushOnMovies();
  }

  function pushOnMovies() {
    history.push("/movies");
  }

  return (
    <div className="login">
      <NavLink className={"login__link-logo"} to={"/"}>
        <img className="login__logo" src={logo} alt="logo" />
      </NavLink>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__input-label" for="email">
          E-mail
        </label>
        <input
          className="login__input"
          value={loginData.email || ""}
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
          className="login__input-error signin-email-error"
          id="email-error"
        ></span>
        <label className="login__input-label" for="password">
          Пароль
        </label>
        <input
          className="login__input"
          value={loginData.password || ""}
          onChange={handleChange}
          type="password"
          id="password"
          name="password"
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
