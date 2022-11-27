const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegExp = /^[a-zA-z\d]{8,20}$/;
const nameRegExp = /^[a-zA-Zа-яА-Я' ]{2,18}$/;

const typeItemRegExp = /^[a-zA-Zа-яА-Я]{1,20}$/;
const linkItemRegExp = /^(http|https):\/\/([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

export { emailRegExp, passwordRegExp, nameRegExp, typeItemRegExp, linkItemRegExp };
