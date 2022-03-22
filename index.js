const express = require('express');
const cors = require('cors');
const  {connect} = require("./src/utils/database/db")
const  {setError} = require("./src/utils/errors/error");
const PlayerRoutes = require('./src/api/players/player.routes');
const UserRoutes = require('./src/api/users/user.routes');
const LeagueRoutes = require('./src/api/leagues/league.routes');
const TeamRoutes = require('./src/api/teams/team.routes');
const { configCloudinary } = require('./src/utils/cloudinary/config');
configCloudinary();
//Port
const PORT = process.env.PORT || 8000;

//Incializar app
connect();
const app = express();

//Headers config (siempre igual)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}) 
//Proxies config (Puertos a los que se llama)
app.use (cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true
}));

//Data limit
app.use(express.json({limit:"5mb"}));

//Uri Configuration
app.use(express.urlencoded({limit: "5mb", extended: true}));

//Routes
app.use("/api/player", PlayerRoutes)
app.use("/api/user", UserRoutes)
app.use("/api/league", LeagueRoutes)
app.use("/api/team", TeamRoutes)

//Errores
app.use("*", (req,res,next)=>{
    return next(setError(404, "ruta no encontrada"))
})

app.use((error,req,res,next)=>{
    return res.status(error.status || 500).json(error.message || "Unexpected error");
})

//Api !show
app.disabled("x-powered-by");

//Escuchar puerto
const server= app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en puerto: ${PORT}`)
})

//Documentacion
const documentation = require('./src/utils/documentation/api.json');
