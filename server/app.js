
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyparser = require('body-parser');
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: false }));// use body parser so we can get info from POST and/or URL parameters
app.use(bodyparser.json());
app.use(express.static(__dirname + "/"));

const allowCrossDomain = function(req, res, next) {
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

    const plate = req.body.platenumber;
    const status = req.body.status;

    let isValid = false;
    if (plate && status) {
        isValid = true;
        io.sockets.emit('new-spot', { message: '1001' });
    } else {
        socket.emit('failed-read', { message: 'Failed to read license plate' })
    }

    res.json({ platenumber: plate, status: status, isvalid: isValid, online: true });
});

app.post('/reading-plate', function(req, res) {
    socket.emit('reading-plate', { message: 'Reading plate...' });
    res.send();
});

app.post('/spot', function(req, res) {
    const number = req.body.number;
    const status = req.body.status;
    let spot;
    let isValid = false;
    if (number && status) {
        isValid = true;
        spot = 5001;
    }

    res.json({ spotnumber: spot, status: status, isvalid: isValid, online: true });
});

app.post('/phone', function(req, res) {
    const number = req.body.number;
    console.log(number);
    const spot = 2001;
    let isValid = false;
    if (number && number == 9168505355) {
        isValid = true;
    }

    res.json({ spot: spot, number: number, status: isValid, online: true });
});

io.on('connection', function (socket) {
    //tests below
    setTimeout(function() {
        socket.emit('reading-plate', { message: 'Reading plate...' });
    },3000);
    // socket.emit('new-spot', { message: '1001' });
    setTimeout(function() {
        socket.emit('new-spot', { message: '1001' });
    },6000);
    // socket.emit('failed-read', { message: 'Failed to read license plate' })
    setTimeout(function() {
        socket.emit('failed-read', { message: 'Failed to read license plate' })
    },9000);
});


server.listen(port);
console.log('Hosted at http://localhost:' + port);
