const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'posts' },
  comment: { type: Schema.Types.ObjectId, ref: 'comments' },
  timestamp: { type: Date, default: Date.now }
});

likeSchema.pre('save', function(next) {
  if (!this.post && !this.comment) {
    throw new Error('Must like either a post or a comment');
  }
  if (this.post && this.comment) {
    throw new Error('Cannot like both a post and a comment');
  }
  next();
});

const Like = mongoose.model('likes', likeSchema);
module.exports = Like;