var mongoose = require('mongoose');

var LawsuitHistorySchema = new mongoose.Schema({
  dateTime: Date,
  message: String,
  documentId: String,
});

module.exports = {
  model: mongoose.model('LawsuitHistory', LawsuitHistorySchema),
  schema: LawsuitHistorySchema,
};
