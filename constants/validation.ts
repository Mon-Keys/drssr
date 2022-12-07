const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegExp = /^[a-zA-z\d]{4,20}$/;
const nameRegExp = /^[a-zA-Zа-яА-Я' ]{2,18}\d{0,10}$/;

const typeItemRegExp = /^[a-zA-Zа-яА-Я]{1,20}$/;
const linkItemRegExp =
    /^(http|https):\/\/([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

export {
    emailRegExp,
    passwordRegExp,
    nameRegExp,
    typeItemRegExp,
    linkItemRegExp
};
