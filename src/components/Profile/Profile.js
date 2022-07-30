import React from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({ onLogout, handleUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEditable, setIsEditable] = React.useState(false);
  const [isValidName, setValidityName] = React.useState(false);
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

  function handleEmailChange(e) {
    setEmail(e.target.value);
    const emailInput = document.getElementById("input-email");
    setValidityEmail(emailInput.validity.valid);
    if (!isValidEmail) {
      setErrorEmail(emailInput.validationMessage);
    } else {
      setErrorEmail("");
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
  }

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
          <span>{errorName}</span>
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
            placeholder="Введите email"
            disabled
            required
            minLength={3}
            maxLength={30}
          />
          <span>{errorEmail}</span>
        </div>
        {isEditable ? (
          <div>
            <button
              className="profile__button"
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
    </div>
  );
}

export default Profile;
