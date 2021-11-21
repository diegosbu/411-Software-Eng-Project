require('dotenv').config();

const config = {
    YelpKey: process.env.YELPKEY,
    GoogleClientID: process.env.GOOGLECLIENTID
};

module.exports = config;