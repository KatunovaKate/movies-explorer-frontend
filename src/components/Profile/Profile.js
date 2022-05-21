import React from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({ onLogout, handleUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name: name,
      email: email,
    });
  }

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__inputs">
          <label className="profile__input-title" htmlFor="input-name">
            Имя
          </label>
          <input
            onChange={handleNameChange}
            className="profile__input"
            type="text"
            id="input-name"
            name="input-name"
            placeholder={currentUser.name}
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <div className="profile__inputs">
          <label className="profile__input-title" htmlFor="input-email">
            E-mail
          </label>
          <input
            onChange={handleEmailChange}
            className="profile__input"
            type="email"
            id="input-email"
            name="input-email"
            placeholder={currentUser.email}
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <button className="profile__button">Редактировать</button>
        <NavLink
          onClick={handleLogout}
          className={"profile__button profile__button_type_signout"}
          to={"/signin"}
        >
          Выйти из аккаунта
        </NavLink>
      </form>
    </div>
  );
}

export default Profile;
