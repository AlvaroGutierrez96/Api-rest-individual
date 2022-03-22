const League = require("./league.model");
const {setError} =require("../../utils/errors/error");
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');
const league = require("./league.model");



const createLeague = async(req,res,next)=>{
    try{
        const league = new League(req.body);
        const leagueDuplicate = await League.findOne({/* surname:league.surname, */ name:league.name})
        if (leagueDuplicate) {
            return next(setError(400, "This league already exists"))
        }
        const leaguePost = await league.save();
        return res.status(201).json(leaguePost)
    }catch(error)
    {
        return next(setError(400, "Server failed create league"))
    }
};

const deleteLeague = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const league = await League.findByIdAndDelete(id);
        if(!league){
            return next(setError(404, "Usuario no encontrado"))
        }
        return res.status(200).json(league)
    }catch(error){
        return next(setError(400,"Server failed to delete user"))
    }
    if (league.img) deleteImgCloudinary(league.img)
    return res.status(200).json(league);
};
    
const updateLeague = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const league = new League(req.body);
        league._id = id;
        const upToLeague = await League.findByIdAndUpdate(id, league);
        console.log(upToLeague)
        if(!upToLeague){
            return next(setError(404,"Usuario no encontrado para actualizar"))
        }
        return res.status(200).json(upToLeague)
    }catch(error){
        return next(setError(404, "Server failed to update league"))
    }
};

const getLeague = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const league = await League.findById(id)
        if(!league){
            return next(setError(404,`El usuario con la id ${id} no se ha encontrado` ))
        }
        return res.status(200).json(league)
    }catch(error){
        return next(setError(404,"Server failed to get league"))
    }
    
};
const getAll =async (req, res , next)=> {
    try{
        const leagues =await Player.find();
        return res.status(200).json(leagues); 
        
    }catch(error){
        return next(error)
    }
}   
module.exports = {createLeague, deleteLeague, updateLeague, getLeague, getAll}
