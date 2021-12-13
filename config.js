require('dotenv').config();

const config = {
    yelpKey: process.env.YELPKEY,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    secret: process.env.SECRET
};

module.exports = config;