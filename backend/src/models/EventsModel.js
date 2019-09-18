const {Schema, model} = require("mongoose");

const Events = new Schema({
    name:{
        type:String,
        required:true
    },
    local:{
        type:String,
        required:true
    },
    organizer:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    guests: [{
         type: Schema.Types.ObjectId,
         ref: 'Users'
    }]
},{
    timestamps:true
});

module.exports = model('Events', Events);