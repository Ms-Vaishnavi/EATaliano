const { update } = require("../../../models/restaurant")

function cartController() {
    return {
        index(req, res) {
            res.render('cart')
        },

        update(req, res) {
            let body = req.body
            console.log({ body })

            if(!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart

            if(!cart.items[body._id]) {
                cart.items[body._id] = {
                    item: req.body,
                    qty: 1
                }

                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + body.price
            } else {
                cart.items[body._id].qty = cart.items[body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + body.price
            }

            return res.json({ totalQty: cart.totalQty})

        }
    }
}

module.exports = cartController