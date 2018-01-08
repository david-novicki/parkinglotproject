# Parker
Parking lot management project using a license plate identifier camera and a web interface to find your reserved parking spot. This project works on 3 different code bases to ensure it can be run independently on iOT devices in a parking garage. This project uses AngularJS, Socket.io, ExpressJS, OpenALPR, and Navigator.getUserMedia.

![Home Screen](https://github.com/supercycle91/parkinglotproject/blob/master/images/home.png)

![Input Phone](https://github.com/supercycle91/parkinglotproject/blob/master/images/phone.png)

![Reservation](https://github.com/supercycle91/parkinglotproject/blob/master/images/success.png)

![Failed Reservation](https://github.com/supercycle91/parkinglotproject/blob/master/images/failed.png)

![Camera](https://github.com/supercycle91/parkinglotproject/blob/master/images/camera.png)

## Installation

Install open-alpr onto linux environment for camera module - license plate recognition to work:
http://doc.openalpr.com/_sources/compiling.txt

## To Start Camera
Install dependencies

`
cd camera/ && npm i && npm start
`

## To Start Sensor

`
cd sensor/ && npm i && npm start
`

## To Start Web Interface

`
cd server/ && npm i && npm start
`

