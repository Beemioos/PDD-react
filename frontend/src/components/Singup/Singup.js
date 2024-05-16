import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cl from './Singup.module.css'; 
import axios from 'axios';
import { useAuth } from '../../authSession';
import { Validations } from '../../validations/SingupValidations';
import Toast from 'react-bootstrap/Toast';

export default function Login() {
  const [values, setValues] = useState({
    login: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(0); //anim

  const { login: loginUser } = useAuth(); 
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setErrors(Validations(values));
    const validationErrors = Validations(values);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data === 'Seccess') {
            loginUser(values);
            navigate('/home');
            setShowError(3)
          }else{
            setShowError(2);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setShowError(1);
      setErrors(validationErrors);
    }
  }

  return (
    <div>
      <div className={cl.regForm}>
        <form onSubmit={handleSubmit}>
          <div className={cl.titReg}>Войти</div> 
          <div>
            <label htmlFor="login">Введи логин</label>
            <input type="login" placeholder="Логин" onChange={handleInput} name="login" />
            {errors.login && <span>{errors.login}</span>}
          </div>
          <div>
            <label htmlFor="password">Введи пароль</label>
            <input type="password" placeholder="Пароль" name="password" onChange={handleInput} />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit">Войти</button>
          <Link className={cl.route} to="/singup">
            Создать аккаунт
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
          show={showError === 3} // Показать уведомление о входе
          onClose={() => setShowError(0)}
        >
          <Toast.Header className={cl.toastHeader}>
            <strong className="mr-auto">Вы вошли в аккаунт</strong>
          </Toast.Header>
          <Toast.Body className={cl.toastBody}>
            Поздравляем. Вы вошли в аккаунт.
          </Toast.Body>
        </Toast>
        <Toast
          className={cl.toast}
          show={showError === 2} // Показать уведомление об ошибке входа
          onClose={() => setShowError(0)}
        >
          <Toast.Header className={cl.toastHeader}>
            <strong className="mr-auto">Ошибка входа</strong>
          </Toast.Header>
          <Toast.Body className={cl.toastBody}>
            Ошибка авторизации. Неверный логин или пароль.
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}
