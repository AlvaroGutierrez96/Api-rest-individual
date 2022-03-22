const LeagueRoutes = require("express").Router();
const {createLeague, deleteLeague, updateLeague, getLeague, getAll} = require("./league.controller");
const {isAuth} = require('../../middlewares/auth.middleware')

LeagueRoutes.post("/",[isAuth], createLeague)
LeagueRoutes.delete("/:id",[isAuth], deleteLeague)
LeagueRoutes.patch("/:id", updateLeague)
LeagueRoutes.get("/:id", getLeague)
LeagueRoutes.get("/", getAll)

module.exports = LeagueRoutes;
