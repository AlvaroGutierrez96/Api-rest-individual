const User = require("./user.model");
const {setError} =require("../../utils/errors/error");
const bcrypt = require('bcrypt')
const JwtUtils = require ('../../utils/jwt/jwt')

const register = async(req,res,next)=>{
    try{
        const user = new User(req.body);
        const userDuplicate = await User.findOne({email:user.email})
        if (userDuplicate) {
            return next(setError(400, "This user already exists"))
        }
        const userPost = await user.save();
        return res.status(201).json(userPost)
    }catch(error)
    {
        return next(setError(400, "Server failed create user"))
    }
};

const login = async (req, res, next) => {
    
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
         
            return next(setError(400, 'This user isn`t registered'))
        }
       
        if (bcrypt.compareSync(req.body.password, user.password)) {
            console.log(1)
            const token = JwtUtils.generateToken(user._id, user.email);
            console.log(token)
          
            return res.status(200).json(token);
        } else{
            return  next(setError(400, 'Wrong password'))
        }
    } catch (error) {
        return next(setError(400, 'User cannot sign in'))
    }
}

const logout = (req, res, next) => {
    try {
        
        const token = null;
        return res.status(201).json(token)
    } catch (error) {
        return next(setError(400, 'User cannot logout'))
    }
}

module.exports = {register,login, logout}