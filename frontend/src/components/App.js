import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { register, login, logout } from "../utils/mestoAuth";

import trueIcon from '../image/true-reg.svg'
import falseIcon from '../image/false-reg.svg'

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoToolTip";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/utils";
function App() {

  const [email, setEmail] = useState('')
  const [messageToolTip, setMessageToolTip] = useState('');
  const [iconMessageToolTip, setIconMessageToolTip] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setIsSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь",
    avatar: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  });
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isInfoToolTipOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  useEffect(() => {
    if(loggedIn){
      api
      .getInitialCards()
      .then((cards) => {
        setLoggedIn(true);
        setCards(cards)
      })
      .catch((e) => {
        setLoggedIn(false);
        console.log(e);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn){
      api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((e) => {
        setLoggedIn(false);
        console.log(e);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards((cards) => cards.filter((c) => c._id !== card._id)))
      .catch((e) => {
        console.log(e);
      });
  }

  function handleAddPlace ({ name, link }){
    api
      .addCard(name, link)
      .then((newCard) => {
        
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setIsSelectedCard(card);
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false)
  };

  function handleUpdateUser(name, about) {
    api
      .editUserInfo(name, about)
      
      .then((userUpdate) => {
        setCurrentUser(userUpdate)
        closeAllPopups();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((userUpdate) => {
        setCurrentUser(userUpdate);
        closeAllPopups()
      })
      .catch((e) => {
        console.log(e);
      });

  };

  function onLogin(email, password) {
    login(email,password)
    .then((res) => {
      setEmail(email)
      setLoggedIn(true)
      history.push('/')
    })
    .catch((err) => {
      console.log(err)
    })

  }

  function onRegister(email, password) {
    register(email, password)
    .then((res) => {
      if(res.email){
        history.push('/signin')
        setIconMessageToolTip(trueIcon)
        setMessageToolTip('Вы успешно зарегистрировались!')
      }
    })
    .catch((err) => {
      console.log(err.message)
      setIconMessageToolTip(falseIcon)
      setMessageToolTip('Что-то пошло не так!Попробуйте ещё раз.')
    })
    .finally(
      setIsInfoToolTipOpen(true) 
    )
  }

  function logOut() {
    logout()
    .then(()=>{
      history.push('/signin')
      setLoggedIn(false)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header 
          email={email} 
          loggedIn={loggedIn} 
          logOut={logOut}/>

        <Switch>

          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}>
            
          </ProtectedRoute>

          <Route path="/signin">
              <Login onLogin={onLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>

        </Switch>
        
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <PopupWithForm
          typePopup="confirmation"
          titlePopup="Вы уверены?"
          onClose={closeAllPopups}
          buttonText="Да"
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpened={isImagePopupOpen}
        />

        <InfoTooltip 
          onClose={closeAllPopups} 
          isOpen={isInfoToolTipOpen} 
          message={messageToolTip} 
          icon={iconMessageToolTip}/>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
