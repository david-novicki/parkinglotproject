
var scale = 0.25;
var video;

window.onload = function () {

    // Normalize the various vendor prefixed versions of getUserMedia.
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
    // Check that the browser supports getUserMedia.
    // If it doesn't show an alert, otherwise continue.
    if (navigator.getUserMedia) {
        // Request the camera.
        navigator.getUserMedia(
            // Constraints
            {
                video: true
            },

            // Success Callback
            function (localMediaStream) {
                // Get a reference to the video element on the page.
                video = document.getElementById('camera-stream');

                // Create an object URL for the video stream and use this 
                // to set the video source.
                video.src = window.URL.createObjectURL(localMediaStream);
            },

            // Error Callback
            function (err) {
                // Log the error to the console.
                console.log('The following error occurred when trying to use getUserMedia: ' + err);
            }
        );



    } else {
        alert('Sorry, your browser does not support getUserMedia');
    }

}



function captureImage() {
    console.log('captureimage');
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);

    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    //console.log(img);


    sendImageToServer(img.src);
};

function sendImageToServer(image) {
    console.log('image:', image);

   

    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/newImage";
    var params = "image=" + image;
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
}

