const {Schema, model} = require("mongoose");

const Tasks = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    },
    done:{
        type:Boolean,
        required:true
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    }
},{
    timestamps:true
});

module.exports = model('Tasks', Tasks);