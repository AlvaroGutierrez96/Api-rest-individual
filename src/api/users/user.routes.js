
const UserRoutes = require('express').Router();
const { register, login, logout } = require('./user.controller');
const { isAuth } = require('../../middlewares/auth.middleware');

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout',[isAuth], logout);

module.exports = UserRoutes;
/* const UserRoutes = require("express").Router();
const {createUser, deleteUser, updateUser, getUser, getAll} = require("./user.controller");


UserRoutes.post("/", createUser)
UserRoutes.delete("/:id", deleteUser)
UserRoutes.patch("/:id", updateUser)
UserRoutes.get("/:id", getUser)
UserRoutes.get("/", getAll)

module.exports = UserRoutes; */

