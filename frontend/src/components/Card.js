import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userContext = useContext(CurrentUserContext);
  const isOwn = card.owner._id === userContext._id;
  const cardDeleteButtonClassName = `photo__item-delete ${
    isOwn ? "photo__item-delete_visible" : "photo__item-delete_hidden"
  }`;
  const isLiked = card.likes.some((like) => like._id === userContext._id);
  const cardLikeButtonClassName = `photo__item-like ${
    isLiked ? "photo__item-like_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  return (
    <li className="photo__item">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
        type="button"
      ></button>
      <img
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
        className="photo__item-img"
      ></img>
      <div className="photo__description">
        <h2 className="photo__item-title">{card.name}</h2>
        <div className="photo__item-like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
            type="button"
          ></button>
          <span className="photo__item-like-count">
            {card.likes.length > 0 ? card.likes.length : null}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
