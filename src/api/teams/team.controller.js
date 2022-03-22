const Team = require("./team.model");
const {setError} =require("../../utils/errors/error");

const createTeam = async(req,res,next)=>{
    try{
        const team = new Team(req.body);
        const teamDuplicate = await Team.findOne({name:team.name}) 
        if (teamDuplicate) {
            return next(setError(400, "This team already exists"))
        }
        const teamPost = await team.save();
        console.log(team)
        return res.status(201).json(teamPost)
    }catch(error)
    {
        return next(setError(400, "Server failed create team"))
    }
};

const deleteTeam = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const team = await Team.findByIdAndDelete(id);
        if(!team){
            return next(setError(404, "Equipo no encontrado"))
        }
        return res.status(200).json(team)
    }catch(error){
        return next(setError(400,"Server failed to delete team"))
    }
};
    
const updateTeam = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const team= new Team(req.body);
        team._id = id;
        const upToTeam = await Team.findByIdAndUpdate(id, team);
        console.log(upToTeam)
        if(!upToTeam){
            return next(setError(404,"Usuario no encontrado para actualizar"))
        }
        return res.status(200).json(upToTeam)
    }catch(error){
        return next(setError(404, "Server failed to update team"))
    }
};

const getTeam = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const team = await Team.findById(id)
        if(!team){
            return next(setError(404,`El usuario con la id ${id} no se ha encontrado` ))
        }
        return res.status(200).json(team)
    }catch(error){
        return next(setError(404,"Server failed to get team"))
    }
    
};
const getAll =async (req, res , next)=> {
    try{
        const teams =await Player.find();
        return res.status(200).json(teams); 
        
    }catch(error){
        return next(error)
    }
}   
module.exports = {createTeam, deleteTeam, updateTeam, getTeam, getAll}