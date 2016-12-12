var exec = require('child_process').exec;
var child;

var imagePath = './utilities/plate.jpg';
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


function parsePlate(image) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
exports.parsePlate = parsePlate;