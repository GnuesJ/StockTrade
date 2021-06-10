const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 1000, default: Date.now },
  username: {type: String, required: true}
});

const Session = mongoose.model('session', sessionSchema);

module.exports = {Session}