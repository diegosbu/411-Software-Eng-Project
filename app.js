// Module Dependencies 
const ejs = require('ejs');
const config = require('./config');
const express = require('express');
const yelp = require('yelp-fusion');
const app = express();

console.log(config.YelpKey, config.GoogleClientID);

// API credentials
const apiKey = config.YelpKey;
const client = yelp.client(apiKey);


app.set('view engine', 'ejs');
app.use(express.static('views'));

// Parse URL-encoded bodies
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies
app.use(express.json());


// Routes

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/rquery', function (req, res) {
    // console.log(req.body.rname);
    const rname = req.body.rname;
    const pname = req.body.place;

    const searchRequest = {
        term: rname,
        location: pname
    };

    client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        res.render('result', {
            json: prettyJson
        });
      }).catch(e => {
        console.log(e);
      });
});


// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT)
