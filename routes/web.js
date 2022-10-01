const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customer/cartController');
const checkoutController = require('../app/http/controllers/customer/checkoutController');
const singleProductController = require('../app/http/controllers/customer/singleProductController');
const authController = require('../app/http/controllers/authController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const adminOrderController = require("../app/http/controllers/admin/orderController")

function initRoutes(app) {


    app.get("/", homeController().index);

    app.get("/about", homeController().about);

    app.get("/contact", homeController().contact)

    app.get("/shop", homeController().shop)

    app.get('/single-product', singleProductController().index)

    app.get('/restaurant/:restaurantId', homeController().restaurantItems)

    app.get('/login', guest, authController().login)

    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)

    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)
    
    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)

    //Customer routes

    app.post('/checkout', auth,  checkoutController().store)

    app.get('/customer/orders', auth,  checkoutController().index)

    //Admin routes

    app.get('/admin/orders', auth,  adminOrderController().index)
}

module.exports = initRoutes