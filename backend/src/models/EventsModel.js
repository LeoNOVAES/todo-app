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
    datetime:{
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