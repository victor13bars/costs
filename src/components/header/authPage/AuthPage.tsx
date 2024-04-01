import { Link } from "react-router-dom";
import { AuthPageType } from "../../../types";
import './styles.css';

export const AuthPage = ({type}:AuthPageType)=> {
    const currentAuthTitle = type === 'login' ? 'Войти':'Регистрация';

    return(
        <div className="container">
            <h1>{currentAuthTitle}</h1>
            <form className="form-group">
                <label className="auth-label">
                    Введите имя пользователя
                    <input type="text" className="form-control" />
                </label>
            </form>
            <form>
                <label className="auth-label">
                    Введите пароль
                    <input type="text" className="form-control" />
                </label>
                <button className="btn btn-primary auth-btn">{currentAuthTitle}</button>
            </form>
            {type === 'login' ? <div>
                <span className="question-text">Ёще нет аккаунта?</span>
                <Link to={'/registration'}>Зарегистрироваться</Link>
            </div>
            :
            <div>
                <span className="question-text">Уже есть аккаунт?</span>
                <Link to={'/login'}>Войти</Link>
            </div>
            }
        </div>
    )
}