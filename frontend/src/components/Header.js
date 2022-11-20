import logo from "../image/logo.svg";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ loggedIn, logOut }) {
  const location = useLocation();
  const userContext = useContext(CurrentUserContext);
  return (
    <header className="header">
      <button className="logo">
        <img src={logo} alt="Лого" className="logo__img"></img>
      </button>

      {location.pathname === "/signin" && (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/signup" && (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      )}

      {loggedIn && (
        <nav className="header__nav">
          <span className="header__email">{userContext.email}</span>
          <button className="header__link" onClick={() => logOut()}>
            Выйти
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
