import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const userContext = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(userContext.name);
    setAbout(userContext.about);
  }, [userContext, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      typePopup="edit-profile"
      titlePopup="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="text"
        className="popup__input"
        value={name}
        onChange={handleChangeName}
        name="username"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      ></input>
      <input
        type="text"
        className="popup__input"
        value={about}
        onChange={handleChangeAbout}
        name="useractivity"
        placeholder="Деятельность"
        minLength="2"
        maxLength="200"
        required
      ></input>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
