const mongoose = require('mongoose');
const { setError } = require('../../utils/errors/error');
const { validationName, validationAge } = require('../../utils/validators/validators');

const playerSchema= new mongoose.Schema({
    name: {type: String, required:true, trim: true},
    surname:{type: String, required:true, trim: true},
    age: {type: Number, required: true},
    img: { type: String, required: false, trim: true }
}, {
    timestamps:true
});

 playerSchema.pre("save", function(next){
     console.log(this.name)
    if(!validationName(this.name)){
        console.log("1")
        return next(setError(400, "Name is not valid"));
    }  
    if(!validationAge(this.age)){
            return next(setError(400, "Age is not valid"))
        }
    
    next()
}) 

const player = mongoose.model("player", playerSchema);
module.exports = player;

