const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  toUser: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  timestamp: { type: Date, default: Date.now }
});

followSchema.pre('save', function(next) {
  if (this.fromUser.toString() === this.toUser.toString()) {
    throw new Error('Cannot follow yourself');
  }
  next();
});

const Follow = mongoose.model('follows', followSchema);
module.exports = Follow;