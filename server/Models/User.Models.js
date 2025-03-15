const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, trim: true, validate: validator.isEmail },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, trim: true },
    bio: { type: String, trim: true },
    profilePicture: { type: String, trim: true },
    joinDate: { type: Date, default: Date.now }
  });

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect =  async function (password) {

    return await bcryptjs.compare(password,this.password)
}

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;