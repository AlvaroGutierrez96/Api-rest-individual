const mongoose = require('mongoose');
const { setError } = require('../../utils/errors/error');
const {validationName} = require('../../utils/validators/validators');

const teamSchema = new mongoose.Schema({
    name: {type: String, required:true, trim: true},
    players:[{type: mongoose.Schema.Types.ObjectId, ref: "players", required: true, trim:true}]
},
{
    timestamps:true
});

/* teamSchema.pre("save", function(next){
     if(!validationName(this.name)){
        return next(setError(400, "Name is not valid"));
     }
    next()
}) */
const Team = mongoose.model("teams", teamSchema);
module.exports = Team;