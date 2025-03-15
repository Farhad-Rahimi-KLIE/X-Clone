const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : {
        type : String
    },
    rating : {
        type : Number
    }, 
    time : {
        type : String
    }, 
    starring : {
        type : String
    },
    genres : {
        type : String
    },
    coverImage : {
        type : String
    },
    video : {
        type : String
    },
},{timestamps : true});

const PostModel = mongoose.model('posts', PostSchema);
module.exports = PostModel;