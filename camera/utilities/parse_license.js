var exec = require('child_process').exec;
var child;

function parseImage(image, callback) {
    child = exec('alpr -n 1 ' + image, function (error, stdout, stderr) {
        if (!error) {
            console.log("\n"+stdout);
            var results = stdout.split('\n');
            if (results) {
                var plate = results[1].split(' ')[5];
                callback(plate);
            }
        } else {
            console.log("openalpr failed");
            return null;
        }
    });
}
exports.parseImage = parseImage;