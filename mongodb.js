/* MongoDB Connection */

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let mongodb;

// Connects to mongoDB local instance
function connect(callback) {
    mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) {
            return callback(err);
        }

        mongodb = client
        console.log(`connection successful: ${url}`)
        callback();
    });
}

// gets db
function get() {
    return mongodb;
}

// closes db connection
function close() {
    mongodb.close();
}

module.exports = {
    connect, 
    get, 
    close
};
