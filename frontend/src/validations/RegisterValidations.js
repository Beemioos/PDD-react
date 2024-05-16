// validations.js

// Валидация формата email
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
  
// Валидация формата телефона
export function isValidPhone(phone) {
    return /^(\+7|8)\d{10}$/.test(phone);
}

// Валидация формата пароля
export function validatePassword(password) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
    return passwordPattern.test(password);
}

// Валидация для каждого поля ввода
export function validateInputs({ login, fio, email, phone, password }) {
    let errors = {};
    // Валидация логина
    if (!login) {
        errors.login = "Введите логин";
    }
    // Валидация ФИО
    if (!fio) {
        errors.fio = "Введите ФИО";
    } else if (!/^[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+$/.test(fio)) {
        errors.fio = "Неправильный формат ФИО";
    }
    // Валидация почты
    if (!email) {
        errors.email = "Введите почту";
    } else if (!isValidEmail(email)) {
        errors.email = "Неправильный формат почты";
    }
    // Валидация телефона
    if (!phone) {
        errors.phone = "Введите телефон";
    } else if (!isValidPhone(phone)) {
        errors.phone = "Неправильный формат телефона";
    }
    // Валидация пароля
    if (!password) {
        errors.password = "Введите пароль";
    } else if (!validatePassword(password)) {
        errors.password = "Неправильный формат пароля";
    }
    
    return errors;
}
