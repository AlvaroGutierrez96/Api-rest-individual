const Player = require("./player.model");
const {setError} =require("../../utils/errors/error");
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');

const createPlayer = async(req,res,next)=>{
    try{
        const player = new Player(req.body);
        if (req.file) player.img = req.file.path
        const playerDuplicate = await Player.findOne({surname:player.surname, name:player.name})
        if (playerDuplicate) {
            return next(setError(400, "This player already exists"))
        }
       
        const playerPost = await player.save();
        return res.status(201).json(playerPost)
    }catch(error)
    {
        return next(setError(400, "Server failed create player"))
    }
};

const deletePlayer = async(req,res,next)=>{
    try{
        const { id } = req.params;
        if (player.img) deleteImgCloudinary(player.img)
        const player = await Player.findByIdAndDelete(id);
        if(!player){
            return next(setError(404, "Usuario no encontrado"))
        }
        return res.status(200).json(player)
    }catch(error){
        return next(setError(400,"Server failed to delete user"))
    }
};
    
const updatePlayer = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const player = new Player(req.body);
        player._id = id;
        const upToPlayer = await Player.findByIdAndUpdate(id, player);
        console.log(upToPlayer)
        if(!upToPlayer){
            return next(setError(404,"Usuario no encontrado para actualizar"))
        }
        return res.status(200).json(upToPlayer)
    }catch(error){
        return next(setError(404, "Server failed to update player"))
    }
};

const getPlayer = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const player = await Player.findById(id)
        if(!player){
            return next(setError(404,`El usuario con la id ${id} no se ha encontrado` ))
        }
        return res.status(200).json(player)
    }catch(error){
        return next(setError(404,"Server failed to get player"))
    }
};

const getAll =async (req, res , next)=> {
    try{
        const players =await Player.find();
        return res.status(200).json(players); 
        
    }catch(error){
        return next(error)
    }
}   
module.exports = {createPlayer, deletePlayer, updatePlayer, getPlayer, getAll}
