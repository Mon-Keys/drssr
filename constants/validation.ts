const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegExp = /^[a-zA-z\d]{8,20}$/;
const nameRegExp = /^[a-zA-Zа-яА-Я' ]{2,18}$/;

export { emailRegExp, passwordRegExp, nameRegExp };
