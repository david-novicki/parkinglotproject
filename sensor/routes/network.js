var request = require('request');
var config = require('../config.js').config;

function sendStatusToApi(spot, status) {
    
    console.log('empty/full:', status);

    var data = {
        status: status, 
        spotnumber: spot
    }

    const options = {
        method: 'POST',
        uri: config.main_api + '/spot',
        headers: {'content-type': 'application/json' },
        body: JSON.stringify(data)
    };
    request(options, function(error, response, body){
        if (error){
            console.log(error);
        }
        else{
            console.log('successfully parsed and sent to main api');
        }
    });

}
exports.sendStatusToApi = sendStatusToApi;