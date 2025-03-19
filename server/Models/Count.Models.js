const mongoose = require('mongoose');
const { Schema } = mongoose;

const viewSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
  timestamp: { type: Date, default: Date.now }
});

viewSchema.index({ user: 1, post: 1 }, { unique: true });

const View = mongoose.model('views', viewSchema);
module.exports = View;