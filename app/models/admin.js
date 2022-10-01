const mongoose = require("mongoose");

const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'Restaurant Admin'},
  restaurantId: {type: String, required: true}
}, {timestamps: true})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin
