import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      typePopup="add-photo"
      titlePopup="Новое место"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Добавить"
    >
      <input
        type="text"
        className="popup__input"
        name="name"
        onChange={handleChangeName}
        value={name}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      ></input>

      <input
        type="url"
        className="popup__input"
        name="link"
        onChange={handleChangeAbout}
        value={link}
        placeholder="Ссылка на картинку"
        required
      ></input>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
