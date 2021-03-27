const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt")

const UsersSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select: false
    }
},{
    timestamps:true
});

UsersSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UsersSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = model('Users', UsersSchema);