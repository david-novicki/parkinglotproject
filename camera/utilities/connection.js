var request = require('request');
var config = require('../config.js').config;

function sendPlateToApi(plate, status) {
    
    //console.log('\nplate number:', plate);
    //console.log('entering/exiting:', status);

    var data = {
        platenumber: plate,
        status: status // entering or exiting
    }

    const options = {
        method: 'POST',
        uri: config.main_api + '/license',
        headers: {'content-type': 'application/json' },
        body: JSON.stringify(data)
    };
    request(options, function(error, response, body){
        if (error){
            console.log('failed to send to server:', error);
        }
        else{
            console.log('--> sent to main api');
        }
    });
}
exports.sendPlateToApi = sendPlateToApi;

function sendParsingToApi() {
    
    const options = {
        method: 'POST',
        uri: config.main_api + '/reading-plate',
        headers: {'content-type': 'application/json' },
    };
    request(options, function(error, response, body){
        if (error){
            console.log('failed to send to server:', error);
        }
        else{
            //console.log('--> sent to main api');
        }
    });
}
exports.sendParsingToApi = sendParsingToApi;