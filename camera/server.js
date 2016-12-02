var express = require('express');
var bp = require('body-parser');
var camera = require('./routes/camera.js');
var config = require('./config.js');
var network = require('./routes/network.js')

var app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

var port = 8081;


app.get('/analyzePlate/:status',function(req,res){
    
    var status = req.params.status;
    var plate = camera.getLicensePlate(null, 'ca', 'us', status);
    if (plate.error){
        console.log(plate.error)
        res.send(plate.error);
    }else{
        network.sendPlateToApi(plate, status);
        res.send(plate);
    }

    
});



app.listen(port);
console.log("Application now hosted on port: " + port);