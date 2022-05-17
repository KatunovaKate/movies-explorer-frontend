import React from "react";
import { NavLink } from "react-router-dom";

import "./Profile.css";

function Profile() {
  const userName = "Виталий";
  const userEmail = "pochta@yandex.ru";

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {userName}!</h2>
      <form className="profile__form">
        <div className="profile__inputs">
          <label className="profile__input-title" for="input-name">
            Имя
          </label>
          <input
            className="profile__input"
            type="text"
            id="input-name"
            name="input-name"
            placeholder={userName}
            disabled
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <div className="profile__inputs">
          <label className="profile__input-title" for="input-email">
            E-mail
          </label>
          <input
            className="profile__input"
            type="email"
            id="input-email"
            name="input-email"
            placeholder={userEmail}
            disabled
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <button className="profile__button">Редактировать</button>
        <NavLink
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
