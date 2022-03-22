/* const res = require("express/lib/response"); */

const validationName = (fullName)=>{
    const re = /^[a-zA-Z]+$/;
    return re.test(String(fullName).toLowerCase());
}

const validationAge = (age)=>{
    const re =/^[1-9][0-9]?$|^100$/;
    return re.test(age);
}

const validationEmail = (email) => {
    const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validationPassword = (password) => {
    const re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
    return re.test(String(password))
}
module.exports = {validationName, validationAge, validationEmail, validationPassword}