import React from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({ onLogout, handleUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEditable, setIsEditable] = React.useState(false);
  const [isValidName, setValidityName] = React.useState(true);
  const [errorName, setErrorName] = React.useState("");
  const [isValidEmail, setValidityEmail] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState("");

  React.useEffect(() => {
    const nameInput = document.getElementById("input-name");
    nameInput.value = currentUser.name;
    const emailInput = document.getElementById("input-email");
    emailInput.value = currentUser.email;
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function letEdit() {
    document.getElementById("input-name").disabled = false;
    document.getElementById("input-email").disabled = false;
    setIsEditable(true);
  }

  function handleNameChange(e) {
    setName(e.target.value);
    const nameInput = document.getElementById("input-name");
    setValidityName(nameInput.validity.valid);
    if (!isValidName) {
      setErrorName(nameInput.validationMessage);
    } else {
      setErrorName("");
    }
  }

  function isValiEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      setValidityEmail(false);
    } else {
      setValidityEmail(true);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    const emailInput = document.getElementById("input-email");
    isValiEmail(emailInput.value)
    if (!isValidEmail) {
      setErrorEmail("Введите корректный email");
    } else {
      setErrorEmail("");
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
  }

  const attPopup = () => {
    const popup = document.querySelector(".profile__popup");
    if (popup == null) {
      setIsEditable(false)
      return;
    }
    else {
      popup.classList.remove("profile__popup_none");
    }
  };

  const closePopup = () => {
    document
      .querySelector(".profile__popup")
      .classList.add("profile__popup_none");
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== currentUser.name || email !== currentUser.email) {
      handleUpdateUser({
        name: name,
        email: email,
      });
      document.getElementById("input-name").disabled = true;
      document.getElementById("input-email").disabled = true;
      setIsEditable(false);
    }
    document.getElementById("input-name").disabled = true;
    document.getElementById("input-email").disabled = true;
    setIsEditable(false);
    attPopup();
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
            placeholder="Введите имя"
            required
            minLength={3}
            maxLength={30}
            disabled
          />
        </div>
        <span className="profile__input-err">{errorName}</span>
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
            placeholder="Введите email"
            disabled
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <span className="profile__input-err">{errorEmail}</span>
        {isEditable ? (
          <div>
            <button
              className="profile__save-button"
              disabled={!(isValidName || isValidEmail)}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <p className="profile__button" onClick={letEdit}>
            Редактировать
          </p>
        )}
        <NavLink
          onClick={handleLogout}
          className={"profile__button profile__button_type_signout"}
          to={"/signin"}
        >
          Выйти из аккаунта
        </NavLink>
      </form>
      <div className="profile__popup profile__popup_none">
        <div className="profile__popup-modal ">
          <p className="profile__popup-text ">Данные успешно сохранены!</p>
          <button className="profile__close-button" onClick={closePopup}>
            &#9587;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
