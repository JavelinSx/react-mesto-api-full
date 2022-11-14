import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      onRegister(email, password);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h3 className="login__title">Регистрация</h3>
        <ul className="login__input-container">
          <li className="login__input-item">
            <input
              onChange={handleChangeEmail}
              value={email}
              type="email"
              className="login__input"
              name="login"
              placeholder="Email"
              minLength="6"
              maxLength="30"
              required
            ></input>
          </li>
          <li className="login__input-item">
            <input
              onChange={handleChangePassword}
              value={password}
              type="password"
              className="login__input"
              name="password"
              placeholder="Пароль"
              minLength="8"
              maxLength="16"
              required
            ></input>
          </li>
        </ul>
        <div className="login__container-submit">
          <button className="login__button" type="submit">
            Зарегистрироваться
          </button>
          <span className="login__link-sign-in">
            Уже зарегистированы?
            <Link to="/signin" className="login__link">
              Войти
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
