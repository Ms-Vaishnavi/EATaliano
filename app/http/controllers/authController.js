function authController() {
    return {
        login(req, res) {
            return res.render('login')
        },

        register(req, res) {
            return res.render('register')
        }
    }
}

module.exports = authController