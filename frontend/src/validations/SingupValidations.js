
// Экспорт функции Validations
export function Validations(values) {
    let errors = {};
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
    const login_pattern = /^[a-zA-Z0-9_]{5,}$/; 
    
    // Проверка логина
    if (!values.login) {
      errors.login = "Логин не должен быть пустым";
    } else if (!login_pattern.test(values.login)) {
      errors.login = "Логин должен содержать только буквы, цифры и _ и быть не короче 5 символов";
    }
  
    // Проверка пароля
    if (!values.password) {
      errors.password = "Пароль не должен быть пустым";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Пароль должен содержать минимум 6 символов, как минимум одну цифру, одну прописную букву и одну заглавную букву";
    }
  
    return errors;
  }
//   logon : Gg1010101001_
//   password : Ggoooooooooo4