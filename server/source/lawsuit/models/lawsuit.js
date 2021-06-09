LawsuitHistory = require('./lawsuitHistory');

const mongoose = require('mongoose');

const LawsuitSchema = new mongoose.Schema({
  _id: String,
  name: String,
  date: String,
  claimed: String,
  lawyer: String,
  court: String,
  value: String,
  history: [LawsuitHistory.schema],
  tags: [String],
});

module.exports = mongoose.model('Lawsuit', LawsuitSchema);