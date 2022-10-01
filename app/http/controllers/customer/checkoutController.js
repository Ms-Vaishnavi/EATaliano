const Order = require('../../../models/order')
const moment = require('moment')

function checkoutController() {
    return {
        store(req, res) {
            console.log(req.session.cart)

            const {tableSize} = req.body

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                restaurantId: req.session.cart.restaurantId,
                tableSize
            })

            order.save().then(result => {
                req.flash('success', 'Order placed Successfully!')
                delete req.session.cart
                return res.redirect('/customer/orders')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        }, 

        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, {sort:{'createdAt': -1}})
            res.render('orders', {orders: orders, moment: moment})
        }
    }
}

module.exports = checkoutController