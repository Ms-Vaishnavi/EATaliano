const mongoose = require("mongoose");

const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    restaurantId: {type: String, required: true},
    items: { type: Object, required: true},
    tableSize: { type: Number},
    status: { type: String, default: 'order_placed'}
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order
