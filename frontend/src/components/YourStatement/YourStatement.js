import React, { useState, useEffect } from "react";
import axios from "axios";
import cl from "./YourStatement.module.css";
import { useAuth } from "../../authSession"; // Импорт useAuth

export default function YourStatement() {
  const [statements, setStatements] = useState([]);
  const { user } = useAuth();
  console.log(user.login);
  useEffect(() => {
    const fetchUserStatements = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8081/yourStatement",
          { user: user.login }
        );
        setStatements(response.data);
      } catch (error) {
        console.error("Ошибка при получении заявлений пользователя:", error);
      }
    };

    fetchUserStatements();
  }, [user.login]);

  return (
    <div>
      <div className={cl.main__target}>
        <div className={cl.tit}>Ваши заявления</div>
        <ul className={cl.target}>
          {statements.map((statement) => (
            <li key={statement.id}>
              <div className={cl.left}>
                <p>Регистрационный номер: {statement.regNum}</p>
                <p>Сведения о нарушении: {statement.areaNar}</p>
              </div>
              <div className={cl.rigth}>
                <p
                  style={{
                    background:
                      statement.status === "На рассмотрении"
                        ? "rgb(255, 196, 0)"
                        : statement.status === "Подтверждено"
                        ? "green"
                        : statement.status === "Отклонено"
                        ? "red"
                        : "inherit",
                  }}
                >
                  {statement.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
