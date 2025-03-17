const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, trim: true },
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
  timestamp: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;