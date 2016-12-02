var express = require('express');
var bodyparser = require('body-parser');
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: false }));// use body parser so we can get info from POST and/or URL parameters
app.use(bodyparser.json());

app.get('/', function(req,res){
    res.json({ status: true });
});

//var routes = express.Router();
//middleware
// routes.use(function (req, res, next) {

// });
app.post('/license', function(req, res) {

    var plate = req.body.platenumber;
    var status = req.body.status;

    var isValid = false;
    if (plate && status) {
        isValid = true;
    }
    res.json({ platenumber: plate, status: status, isvalid: isValid, online: true });
});

app.post('/spot', function(req, res) {
    var spot = req.body.spotnumber;
    var status = req.body.status;
    var isValid = false;
    if (spot && status) {
        isValid = true;
    }
    res.json({ spotnumber: spot, status: status, isvalid: isValid, online: true });
});

app.listen(port);
console.log('Hosted at http://localhost:' + port);