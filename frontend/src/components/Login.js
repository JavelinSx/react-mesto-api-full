import { useState } from "react";

const Login = ({ onLogin }) => {
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
      onLogin(email, password);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h3 className="login__title">Вход</h3>
        <ul className="login__input-container">
          <li className="login__input-item">
            <input
              value={email}
              onChange={handleChangeEmail}
              type="email"
              className="login__input"
              name="login"
              placeholder="Email"
              minLength="6"
              maxLength="40"
              required
            ></input>
          </li>
          <li className="login__input-item">
            <input
              value={password}
              onChange={handleChangePassword}
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
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
