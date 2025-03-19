const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
  timestamp: { type: Date, default: Date.now }
});

bookmarkSchema.index({ user: 1, post: 1 }, { unique: true });

const Bookmark = mongoose.model('bookmarks', bookmarkSchema);
module.exports = Bookmark;