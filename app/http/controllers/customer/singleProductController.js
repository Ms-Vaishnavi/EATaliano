function singleProductController() {
    return {
        index(req, res) {
            res.render('single-product')
        }
    }
}

module.exports = singleProductController