import React, { useContext, useState } from "react";
import cl from "./Header.module.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../authSession";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false); // Состояние для отображения/скрытия бургер-меню

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={cl.hhh}>
      <div className={cl.header}>
        <div className={cl.main__header}>
          <div className={cl.logo}>Нарушениям.нет</div>
          {user && (
          <div className={cl.burger} onClick={() => setShowMenu(!showMenu)}>
            <div className={cl.line}></div>
            <div className={cl.line}></div>
            <div className={cl.line}></div>
          </div>
        )}
        </div>
        <div className={showMenu ? cl.menu : cl.menuHidden}>
          {user && user.login !== "superuser" && (
            <div className={cl.links}>
              <Link className={cl.home} to="/home">
                Главная
              </Link>
              <Link className={cl.home} to="/newStatement">
                Оставить заявление
              </Link>
              <Link className={cl.home} to="/yourStatement">
                Заявления
              </Link>
            </div>
          )}
          <div className={cl.auth}>
            {user ? (
              <div className={cl.auth}>
                <span className={cl.username}>{user.login}</span>
                <Link className={cl.logout} to="/" onClick={handleLogout}>
                  Выход
                </Link>
              </div>
            ) : (
              <div className={cl.auth}>
                <Link className={cl.reg} to="/singup">
                  Регистрация
                </Link>
                <Link className={cl.in} to="/">
                  Вход
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
