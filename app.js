// Module Dependencies 
const express = require('express');
const app = express();

app.use(express.static('views'));

// Routes

app.get('/', function (req, res) {
    res.render(index);
})


// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT)
