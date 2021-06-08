const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleUserId: Number,
});

module.exports = mongoose.model('LawsuitHistory', UserSchema);
