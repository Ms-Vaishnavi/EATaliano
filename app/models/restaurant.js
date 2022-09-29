const mongoose = require("mongoose");

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {type: String, required: true},
  image: {type: String, required: true},
  items: {type: [{
    name: String,
    image: String,
    price: Number
  }], required: true}
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant
