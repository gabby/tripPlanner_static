const router = require('express').Router();
const db = require('../models');
const Hotel = db.models.hotel;
const Activity = db.models.activity;
const Restaurant = db.models.restaurant;

// router.get('/', function(req, res, next){
// 	res.render('index')
// });

router.get('/', function(req, res, next){
	let hotelList, activityList, restaurantList;
	Hotel.findAll({attributes:['name']})
	.then(function(hotels){
		hotelList=hotels;
		return Activity.findAll({attributes:['name']});
	})
	.then(function(activities){
		activityList=activities;
		return Restaurant.findAll({attributes:['name']});
	})
	.then(function(restaurants){
		restaurantList=restaurants;
		return restaurantList;
	})
	.then(function(){
		res.render('index', {hotels:hotelList, activities:activityList, restaurants:restaurantList
		});
	})
	.catch(next);
}); 

router.get('/bootstrap/css')


module.exports = router