
var parse_license = require('../utilities/parse_license.js');
var nodeWebcam = require('node-webcam');
plates = [];

function getLicensePlate(image, state, country, status) {

    parse_license.identify('0', '../utilities/ea7the.jpg');

    if (status == 'entering') {
        plate = parse_license.parsePlate();
        plates.push(plate);
    }
    else {
        if (plates.length > 0)
            plate = plates.shift();
        else
            return { error: 'Error: No cars in system to exit.' };
    }

    return data = {
        state: state,
        country: country,
        id: plate
    }
}
exports.getLicensePlate = getLicensePlate;


var parse_license = require('../utilities/parse_license.js');
plates = [];

function getLicensePlate(image, state, country, status){

    if (status == 'entering'){
        plate = parse_license.parsePlate();
        plates.push(plate);
    }
    else{
        if (plates.length > 0)
            plate = plates.shift();
        else
            return {error: 'Error: No cars in system to exit.'};
    }

    return data = {
        state: state,
        country: country,
        id: plate
    }
}
exports.getLicensePlate = getLicensePlate;
