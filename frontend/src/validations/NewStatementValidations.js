// validations.js

export const validateRegNum = (regNum) => {
    const regex = /^[А-Яа-я]{1}\d{3}[А-Яа-я]{2}$/;
  
    if (!regex.test(regNum)) {
      return 'Неверный формат ввода';
    }
  
    return '';
  };
  
  export const validateAreaNar = (areaNar) => {
    if (!areaNar) {
      return 'Поле обязательно для заполнения';
    }
  
    // Дополнительные проверки, если необходимо
  
    return '';
  };