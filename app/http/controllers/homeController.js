const Restaurants = require('../../models/restaurant');
const _ = require('lodash')

function homeController() {
  return {
    async index(req, res){
      const restaurants = await Restaurants.find()
      
      //console.log(restaurants);
      return res.render('index', {restaurants: restaurants});
    }, 

    about(req, res) {
      return res.render('about')
    },

    contact(req, res) {
      return res.render('contact')
    },

    async shop(req, res) {
      
      const restaurants = await Restaurants.find()
      return res.render('shop', {restaurants: restaurants})
    },

    async restaurantItems(req, res) {
      const resId = req.params.restaurantId

      const restaurant = await Restaurants.findOne({ _id: resId })
      
      let resItems = restaurant.items

      return res.render('single-product', {restaurantName: restaurant.toJSON().RName, restaurantId: resId, items: resItems})
    }
  }
}

module.exports = homeController
