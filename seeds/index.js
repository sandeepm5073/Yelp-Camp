const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
useNewUrlParser:true,
useUnifiedTopology:true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected'); 
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6506ad2a1581ef50683f46d0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                  cities[random1000].longitude,
                cities[random1000].latitude,
                
               ],
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dle4aal0l/image/upload/v1694937742/YelpCamp/j5s0yynnmbvbs1kshogs.jpg',
                  filename: 'YelpCamp/j5s0yynnmbvbs1kshogs',
                },
                {
                  url: 'https://res.cloudinary.com/dle4aal0l/image/upload/v1694937744/YelpCamp/oqtphgidjvhs1n3uguko.jpg',
                  filename: 'YelpCamp/oqtphgidjvhs1n3uguko',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})