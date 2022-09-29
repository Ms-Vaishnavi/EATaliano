const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customer/cartController');
const checkoutController = require('../app/http/controllers/customer/checkoutController');
const singleProductController = require('../app/http/controllers/customer/singleProductController');
const authController = require('../app/http/controllers/authController')

function initRoutes(app) {


    app.get("/", homeController().index);

    app.get("/about", homeController().about);

    app.get("/contact", homeController().contact)

    app.get("/shop", homeController().shop)

    app.get('/checkout', checkoutController().index)

    app.get('/single-product', singleProductController().index)

    app.get('/restaurant/:restaurantId', homeController().restaurantItems)

    app.get('/login', authController().login)

    app.get('/register', authController().register)
    
    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)

}

module.exports = initRoutes