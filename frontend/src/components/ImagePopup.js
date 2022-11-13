function ImagePopup({ card, onClose, isOpened }) {
  return (
    <div
      className={`popup popup_type_photo-openName ${
        isOpened ? "popup_open" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          onClick={onClose}
          type="button"
        ></button>
        <figure className="popup__photo-card">
          <img
            src={card?.link}
            alt={card?.name}
            className="popup__photo-wide"
          />
          <figcaption className="popup__photo-title">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
