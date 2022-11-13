import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value='';
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      typePopup="update-avatar"
      titlePopup="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Обновить"
    >
      <input
        type="url"
        ref={avatarRef}
        className="popup__input"
        name="useravatar"
        placeholder="Ссылка на картинку аватара"
        required
      ></input>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
