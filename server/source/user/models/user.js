var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleUserId: Number,
});

module.exports = mongoose.model('LawsuitHistory', UserSchema);
