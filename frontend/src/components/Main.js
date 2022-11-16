import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const userContext = useContext(CurrentUserContext);
  console.log(cards)
  return (
    <section className="main">
      <div className="profile">
        <img
          src={userContext.avatar}
          alt="Аватар"
          className="profile__avatar"
        ></img>
        <button
          className="profile__button_update-avatar"
          onClick={onEditAvatar}
          type="button"
        ></button>
        <div className="profile__info">
          <h1 className="profile__name">{userContext.name}</h1>
          <button
            className="profile__button_edit-profile"
            onClick={onEditProfile}
            type="button"
          ></button>
          <p className="profile__activity">{userContext.about}</p>
        </div>
        <button
          className="profile__button_add-photo"
          onClick={onAddPlace}
          type="button"
        ></button>
      </div>

      <div className="photo">
        <ul className="photo__grid">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                key={card._id}
              >
              </Card>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Main;
