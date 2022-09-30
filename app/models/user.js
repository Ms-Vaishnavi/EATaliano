const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: Number, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'Customer'}
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User
