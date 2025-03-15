const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true, trim: true },
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  timestamp: { type: Date, default: Date.now },
  viewCount: { type: Number, default: 0 }
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;