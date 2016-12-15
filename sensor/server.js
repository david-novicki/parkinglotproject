var express = require('express');
var bp = require('body-parser');
var config = require('./config.js');
var network = require('./routes/network.js')

var app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

var port = 8081;


app.get('/sensor/:spot/:status',function(req,res){
    
    var status = req.params.status;
    var spot = req.params.spot;
    
    var data = {
        status: status, 
        spot: spot
    }
        network.sendStatusToApi(spot,status);
        res.send(data);

    
});



app.listen(port);
console.log("Application now hosted on port: " + port);