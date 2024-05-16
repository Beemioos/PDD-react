import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cl from "./Register.module.css";
import { validateInputs } from "../../validations/RegisterValidations";
import axios from "axios";
import Toast from "react-bootstrap/Toast";

export default function Register() {
  const [values, setValues] = useState({
    login: "",
    password: "",
    fio: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(0); //anim

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateInputs(values);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
          alert('Вы успешно зарегистрировались! Теперь нужно авторизоваться.')
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            setErrorMessage("Этот логин уже занят, выберите другой");
            setShowError(2);
          } else {
            console.log(err);
          }
        });
    } else {
      setErrors(validationErrors);
      setShowError(1);
    }
  }

  return (
    <div>
      <div className={cl.regForm}>
        <form onSubmit={handleSubmit}>
          <div className={cl.titReg}>Регистрация</div>
          <div>
            <label htmlFor="login">Введи логин</label>
            <input
              type="login"
              name="login"
              placeholder="Логин"
              onChange={handleInput}
            />
            {errors.login && <span className={cl.error}>{errors.login}</span>}
          </div>
          <div>
            <label htmlFor="fio">Введи ФИО</label>
            <input
              type="fio"
              name="fio"
              placeholder="ФИО"
              onChange={handleInput}
            />
            {errors.fio && <span className={cl.error}>{errors.fio}</span>}
          </div>
          <div>
            <label htmlFor="email">Введи почту</label>
            <input
              type="email"
              name="email"
              placeholder="Почта"
              onChange={handleInput}
            />
            {errors.email && <span className={cl.error}>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="phone">Введи телефон</label>
            <input
              type="phone"
              name="phone"
              placeholder="+7(ХХХ)-ХХХ-ХХ-ХХ"
              onChange={handleInput}
            />
            {errors.phone && <span className={cl.error}>{errors.phone}</span>}
          </div>
          <div>
            <label htmlFor="password">Введи пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleInput}
            />
            {errors.password && (
              <span className={cl.error}>{errors.password}</span>
            )}
          </div>
          {errorMessage && <span className={cl.error}>{errorMessage}</span>}
          <button>Зарегистрироваться</button>
          <Link className={cl.route} to="/">
            Войти
          </Link>
        </form>
      </div>
      <div className={cl.toast__container}>
        <Toast
          className={cl.toast}
          show={showError === 1} // Показать уведомление об ошибке валидации
          onClose={() => setShowError(0)}
        >
          <Toast.Header className={cl.toastHeader}>
            <strong className="mr-auto">Ошибка валидации</strong>
          </Toast.Header>
          <Toast.Body className={cl.toastBody}>
            Ошибка при заполнении формы. Пожалуйста проверьте введенные данные и попробуйте снова.
          </Toast.Body>
        </Toast>
        <Toast
          className={cl.toast}
          show={showError === 2} // Показать уведомление об ошибке входа
          onClose={() => setShowError(0)}
        >
          <Toast.Header className={cl.toastHeader}>
            <strong className="mr-auto">Ошибка логина</strong>
          </Toast.Header>
          <Toast.Body className={cl.toastBody}>
            Ошибка логина. Имя пользователя занято, выберете другой.
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}
