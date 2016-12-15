var exec = require('child_process').exec;
var child;

var imagePath = '../plate.jpg';
child = exec('alpr -n 1 ' + imagePath, function (error, stdout, stderr) {
  if (!error){
      console.log(stdout);
      if (results){
      var results = stdout.split('\n');
      var plate = results[1].split(' ');
      console.log(plate[5].trim('\y'));
      }
  }else{
      console.log("openalpr failed");
  }
});
exports.parsePlate = parsePlate;