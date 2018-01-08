const express = require('express');
const bp = require('body-parser');
const config = require('./config.js');
const network = require('./routes/network.js')

const app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const port = 8082;


app.get('/sensor/:spot/:status',function(req,res){
    
    const status = req.params.status;
    const spot = req.params.spot;
    
    const data = {
        status: status, 
        spot: spot
    }
        network.sendStatusToApi(spot,status);
        res.send(data);

    
});



app.listen(port);
console.log("Application now hosted on port: " + port);