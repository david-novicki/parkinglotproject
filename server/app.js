var express = require('express');
var bodyparser = require('body-parser');
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: false }));// use body parser so we can get info from POST and/or URL parameters
app.use(bodyparser.json());
app.use(express.static(__dirname + "/"));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.get('/', function(req,res){
    res.sendfile('app/index.html');
});

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

app.post('/phone', function(req, res) {
    var number = req.body.number;
    var isValid = false;
    if (number) {
        isValid = true;
    }

    res.json({ number: number, status: isValid, online: true });
});

app.listen(port);
console.log('Hosted at http://localhost:' + port);
