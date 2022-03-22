const TeamRoutes = require("express").Router();
const {createTeam, deleteTeam, updateTeam, getTeam, getAll} = require("./team.controller");
const upload =require ('../../middlewares/updateFile.middleware')

TeamRoutes.post("/", upload.single('img'),createTeam)
TeamRoutes.delete("/:id",upload.single('img'), deleteTeam)
TeamRoutes.patch("/:id",upload.single('img'), updateTeam)
TeamRoutes.get("/:id",upload.single('img'), getTeam)
TeamRoutes.get("/", upload.single('img'),getAll)

module.exports = TeamRoutes;