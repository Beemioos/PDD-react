import React, { useState, useEffect } from "react";
import cl from "./Admin.module.css";
import axios from "axios";
import { useAuth } from "../../authSession";

export default function Admin() {
  const { user } = useAuth();
  const [statements, setStatements] = useState([]);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admin", {
          params: { user: user.login },
        });
        console.log(statements);
        setStatements(response.data);
      } catch (error) {
        console.error("Ошибка при получении заявлений:", error);
      }
    };

    fetchStatements();
  }, [user.login]);
  // В функции handleApprove
  const handleApprove = async (id, login) => {
    try {
      console.log(login);
      await axios.put(`http://localhost:8081/admin/statements/${id}`, {
        status: "Подтверждено",
        user: login,
      });
      updateStatements();
    } catch (error) {
      console.error("Ошибка при одобрении заявления:", error);
    }
  };

  // В функции handleReject
  const handleReject = async (id, login) => {
    try {
      await axios.put(`http://localhost:8081/admin/statements/${id}`, {
        status: "Отклонено",
        user: login,
      });
      updateStatements();
    } catch (error) {
      console.error("Ошибка при отклонении заявления:", error);
    }
  };

  const updateStatements = async () => {
    try {
      const response = await axios.get("http://localhost:8081/admin", {
        params: { user: user.login },
      });
      setStatements(response.data);
    } catch (error) {
      console.error("Ошибка при обновлении списка заявлений:", error);
    }
  };

  return (
    <div>
      <div className={cl.main__target}>
        <div className={cl.tit}>Список заявлений</div>
        <ul className={cl.target}>
          {console.log(statements)}
          {statements.map((statement) => (
            <li key={statement.id}>
              <p>Регистрационный номер: {statement.regNum}</p>
              <p>Сведения о нарушении: {statement.areaNar}</p>
              <p>ФИО: {statement.fio}</p>
              <p
                className={cl.p}
                style={{
                  background:
                    statement.status === "На рассмотрении"
                      ? "rgb(255, 196, 0)"
                      : statement.status === "Подтверждено"
                      ? "green"
                      : statement.status === "Отклонено"
                      ? "red"
                      : statement.status === "Новое"
                      ? "pink"
                      : "inherit",
                }}
              >
                {statement.status === "На рассмотрении"
                  ? "Новое"
                  : statement.status}
              </p>

              {statement.status === "На рассмотрении" && (
                <div>
                  <button
                    onClick={() => handleApprove(statement.id, statement.login)}
                  >
                    Подтвердить
                  </button>
                  <button
                    onClick={() => handleReject(statement.id, statement.login)}
                  >
                    Отклонить
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
