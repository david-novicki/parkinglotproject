var express = require('express');
var bp = require('body-parser');
var plateUtils = require('./utilities/parse_license.js');
var config = require('./config.js');
var connection = require('./utilities/connection.js');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use('/', express.static(path.join(__dirname, '/')));
var port = 8081;

var imagePath = "plate.png"
var status = 'entering' //debug

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../camera', 'index.html'));
});

app.post('/newImage', function (req, res) {
    connection.sendParsingToApi();
    var image = req.body.image.split(',')[1];
    image = image.replace(/ /g, '+');
    fs.writeFile(imagePath, image, 'base64', function (err) {
        if (err)
        console.log('Create image err:', err);
    });
    plateUtils.parseImage(imagePath, parseResults);
});

// plate parse callback
function parseResults(results){
    if (results){
        console.log('Found plate:', results);
        connection.sendPlateToApi(results, status);
    }else{
        console.log('No license plate found');
        connection.sendPlateToApi(null, null);//fail
    }
}

app.listen(port);
console.log("Application now hosted on port: " + port);