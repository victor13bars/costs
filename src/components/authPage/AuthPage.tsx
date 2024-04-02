import { useRef, useState, MutableRefObject } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthPageType } from "../../types";
import { AuthClient } from "../../api/authClient";
import { handleAlertMessage } from "../../utils/auth";
import { Spinner } from "../spinner/Spinner";
import "./styles.css";

export const AuthPage = ({ type }: AuthPageType) => {
  const [spinner, setSpinner] = useState(false);
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const currentAuthTitle = type === "login" ? "Войти" : "Регистрация";

  const handleAuthResponse = (
    result: boolean | undefined,
    navigatePath: string,
    alertText: string
  ) => {
    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    navigate("/costs");
    handleAlertMessage({ alertText, alertStatus: "success" });
  };

  const handleLogin = async (username: string, passord: string) => {
    if (!username || !passord) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Заполните все поля",
        alertStatus: "warning",
      });
      return;
    }
    const result = await AuthClient.login(username, passord);
    handleAuthResponse(result, "/costs", "Вход выполнен");
  };

  const handleRegistrtion = async (username: string, passord: string) => {
    if (!username || !passord) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Заполните все поля",
        alertStatus: "warning",
      });
      return;
    }
    const result = await AuthClient.registration(username, passord);
    handleAuthResponse(result, "/login", "Регистраия выполнена");
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);
    switch (type) {
      case "login":
        handleLogin(usernameRef.current.value, passwordRef.current.value);
        break;
      case "registration":
        handleRegistrtion(usernameRef.current.value, passwordRef.current.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form onSubmit={handleAuth} className="form-group">
        <label className="auth-label">
          Введите имя пользователя
          <input type="text" className="form-control" ref={usernameRef} />
        </label>
      </form>
      <form>
        <label className="auth-label">
          Введите пароль
          <input type="password" className="form-control" ref={passwordRef} />
        </label>
        <button className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
        </button>
      </form>
      {type === "login" ? (
        <div>
          <span className="question-text">Ёще нет аккаунта?</span>
          <Link to={"/registration"}>Зарегистрироваться</Link>
        </div>
      ) : (
        <div>
          <span className="question-text">Уже есть аккаунт?</span>
          <Link to={"/login"}>Войти</Link>
        </div>
      )}
    </div>
  );
};
