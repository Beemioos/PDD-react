import React, { useState } from "react";
import axios from "axios";
import cl from "./NewStatement.module.css";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
import { useAuth } from "../../authSession"; // Импорт useAuth
import Toast from "react-bootstrap/Toast";

import {
  validateRegNum,
  validateAreaNar,
} from "../../validations/NewStatementValidations";

export default function NewStatement() {
  const [values, setValues] = useState({
    login: "",
    fio: "",
    regNum: "",
    areaNar: "",
    status: "На рассмотрении",
  });
  const [showError, setShowError] = useState(false); //anim
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  values.login = user.login;
  console.log(showError);
  
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    if (name === "areaNar") {
      setErrors({ ...errors, [name]: validateAreaNar(value) });
    } else {
      setErrors({ ...errors, [name]: validateRegNum(value) });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Выполняем валидацию полей
    const validationErrors = {
      regNum: validateRegNum(values.regNum),
      areaNar: validateAreaNar(values.areaNar),
    };

    // Если есть ошибки валидации, устанавливаем их и прекращаем выполнение функции
    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      setShowError(true);
      return;
    }

    try {
      // Отправляем данные на сервер
      const response = await axios.post("http://localhost:8081/newStatement", {
        ...values,
        user: user.login,
      });
      console.log("Данные успешно добавлены в базу данных:", response.data);
      navigate("/home"); // Перенаправление на страницу home после успешной отправки данных
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };

  return (
    <div>
      <div className={cl.main__stat}>
        <div className={cl.tit__stat}>Подача заявления</div>
        <form className={cl.statement} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="regNum">
              Введите регистрационные номер автомобиля
            </label>
            <input
              type="text"
              placeholder="в000ор"
              name="regNum"
              value={values.regNum}
              onChange={handleInput}
            />
            {errors.regNum && <span>{errors.regNum}</span>}
          </div>
          <div>
            <label htmlFor="areaNar">Заполните сведения о нарушении</label>
            <textarea
              type="textarea"
              placeholder="Сведения о нарушении.."
              name="areaNar"
              value={values.areaNar}
              onChange={handleInput}
            />
            {errors.areaNar && <span>{errors.areaNar}</span>}
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
      <div className={cl.toast__container}>
        <Toast
          className={cl.toast}
          show={showError}
          onClose={() => setShowError(false)}
        >
          <Toast.Header className={cl.toastHeader}>
            <strong className="mr-auto">Ошибка</strong>
          </Toast.Header>
          <Toast.Body className={cl.toastBody}>
            Ошибка при заполнении формы. Пожалуйста проверьте введенные данные, и попробуйте снова.
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}
