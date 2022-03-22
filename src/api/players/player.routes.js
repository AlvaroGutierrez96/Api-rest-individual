const PlayerRoutes = require("express").Router();
const {createPlayer, deletePlayer, updatePlayer, getPlayer, getAll} = require("./player.controller");
const upload = require('../../middlewares/updateFile.middleware');
const {isAuth} = require('../../middlewares/auth.middleware')

PlayerRoutes.post("/",[isAuth], upload.single('img'), createPlayer)
PlayerRoutes.delete("/:id", [isAuth],upload.single('img'),deletePlayer)
PlayerRoutes.patch("/:id",upload.single('img'), updatePlayer)
PlayerRoutes.get("/:id",upload.single('img'), getPlayer)
PlayerRoutes.get("/",upload.single('img'), getAll)

module.exports = PlayerRoutes;

