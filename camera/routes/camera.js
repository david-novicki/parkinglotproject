var parse_license = require('../utilities/parse_license.js');
plates = [];

function getLicensePlate(image, status) {

    parse_license.identify('0', "../" + image);

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
        id: plate
    }
}
exports.getLicensePlate = getLicensePlate;
