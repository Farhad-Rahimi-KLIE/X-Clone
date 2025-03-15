const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    Role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },

    password : {
        type : String,
        required : [true, "Password is Required..."]
    }
});

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcryptjs.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect =  async function (password) {

    return await bcryptjs.compare(password,this.password)
}

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;