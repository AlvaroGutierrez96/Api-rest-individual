const mongoose = require('mongoose');
const { setError } = require('../../utils/errors/error');
const { validationName, validationCountry } = require('../../utils/validators/validators');

const leagueSchema= new mongoose.Schema({
    name: {type: String, required:true, trim: true},
    country: {type: String, required: true},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: "teams", required: false, trim:true}],
}, {
    timestamps:true
});

/*  leagueSchema.pre("save", function(next){
     console.log(this.name)
    if(!validationName(this.name)){
        console.log("1")
        return next(setError(400, "Name is not valid"));
    }  
    if(!validationCountry(this.country)){
            return next(setError(400, "Country is not valid"))
        }
    
    next()
}) 
 */
const league = mongoose.model("league", leagueSchema);
module.exports = league;
