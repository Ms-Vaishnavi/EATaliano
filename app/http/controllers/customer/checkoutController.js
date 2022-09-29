function checkoutController() {
    return {
        index(req, res) {
            res.render('checkout')
        }
    }
}

module.exports = checkoutController