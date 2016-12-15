var express = require('express');
var bp = require('body-parser');
var camera = require('./routes/camera.js');
var config = require('./config.js');
var network = require('./routes/network.js');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use('/', express.static(path.join(__dirname, '/')));
var port = 8081;
var imagePath = "plate.png"

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../camera', 'index.html'));
});

app.get('/analyzePlate/:status', function (req, res) {

    var status = req.params.status;
    var plate = camera.getLicensePlate(null, 'ca', 'us', status);
    if (plate.error) {
        console.log(plate.error)
        res.send(plate.error);
    } else {
        network.sendPlateToApi(plate, status);
        res.send(plate);
    }


});

app.post('/newImage', function (req, res) {
    var image = req.body.image.split(',')[1];
    image = image.replace(/ /g, '+');
    fs.writeFile(imagePath, image, 'base64', function (err) {
        if (err)
        console.log('Create image err:', err);
    });
    analyzePlate(imagePath)
});

function analyzePlate(imagePath){
    var status = req.params.status;
    var plate = camera.getLicensePlate(imagePath, 'ca', 'us', status);
    if (plate.error) {
        console.log(plate.error)
        res.send(plate.error);
    } else {
        network.sendPlateToApi(plate, status);
        res.send(plate);
    }
}

app.listen(port);
console.log("Application now hosted on port: " + port);