var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose Schema
var EmailSchema = new Schema({
    email: String,
    name: String },
  {
    timestamps: true
  });

//return the model
module.exports = mongoose.model('Email', EmailSchema);
