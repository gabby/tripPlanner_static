const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/tripplanner')

// write some models here?
const Place = db.define('place', {
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
    }
});

const Hotel = db.define('hotel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_stars:{
        type: Sequelize.FLOAT,
        validate: {
            max: 5,
            min: 1
        }
    },
    amenities:{
        type: Sequelize.STRING,
    }
});

const Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age_range:{
        type: Sequelize.STRING
    }
});

const Restaurant = db.define('restaurant', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine:{
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.INTEGER,
        validate:{
            max:5,
            min:1 
        },
        get(){
            let dollars = this.dataValue('price')
            let display = '';
            while(dollars){
                display+='$';
                dollars--;
            }
            return display;
        } 
    }
});

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = db;