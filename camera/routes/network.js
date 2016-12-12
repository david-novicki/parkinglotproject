var request = require('request');
var config = require('../config.js').config;

function sendPlateToApi(plate, status) {
    
    console.log('\nplate number:', plate.id);
    console.log('entering/exiting:', status);

    var data = {
        platenumber: plate.id,
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
            console.log(error);
        }
        else{
            console.log('successfully parsed and sent to main api');
        }
    });

}
exports.sendPlateToApi = sendPlateToApi;