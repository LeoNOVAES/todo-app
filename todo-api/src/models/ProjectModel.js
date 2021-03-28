const {Schema, model} = require("mongoose");

const Projects = new Schema({
    title:{
        type:String,
        required:true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    tasks: [{
         type: Schema.Types.ObjectId,
         ref: 'Tasks'
    }]
},{
    timestamps:true
});

module.exports = model('Projects', Projects);