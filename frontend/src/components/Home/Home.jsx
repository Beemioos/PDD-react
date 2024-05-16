import React from "react";
import cl from "./Home.module.css";
import NewStatement from "../NewStatement/NewStatement";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className={cl.main__intro}>
        <div className={cl.intro}>
          <div className={cl.tit}>
            Портал сознательных граждан «Нарушениям.Нет» представляет собой
            информационную систему для помощи полиции по своевременной фиксации
            нарушений правил дорожного движения
          </div>
          <div className={cl.link}>
            <Link to={"/newStatement"}>Оставить заявление</Link>
            <Link to={"/yourStatement"}>Посмотреть ваши заявления</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
