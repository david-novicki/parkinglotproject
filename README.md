# Parker
Parking lot management project using a license plate identifier camera and a web interface to find your reserved parking spot. This project works on 3 different code bases to ensure it can be run independently on iOT devices in a parking garage. This project uses AngularJS, Socket.io, ExpressJS, OpenALPR, and Navigator.getUserMedia.

This project is not complete and needs more attention. It will need a database added to API and some hardcoded values to be removed.

![Home Screen](https://github.com/supercycle91/parkinglotproject/blob/master/images/home.png)

![Input Phone](https://github.com/supercycle91/parkinglotproject/blob/master/images/phone.png)

![Reservation](https://github.com/supercycle91/parkinglotproject/blob/master/images/success.png)

![Failed Reservation](https://github.com/supercycle91/parkinglotproject/blob/master/images/failed.png)

![Camera](https://github.com/supercycle91/parkinglotproject/blob/master/images/camera.png)

## Installation

Install open-alpr onto linux environment for camera module - license plate recognition to work:
http://doc.openalpr.com/_sources/compiling.txt

## Camera
The camera uses OpenALPR and a webcam to continously scan license plates as they come into view and load reservations. This information is sent to the central server as the next queued car.

Installation

`
cd camera/ && npm i && npm start
`

Open your browser to localhost:8081 and point webcam in correct direction

## Sensor
The sensor is an iOT device that sits on each parking spot in the garage. It's job is monitor if each spot is taken or not by magnetic sensors. It relays this information to our central server.

Installation

`
cd sensor/ && npm i && npm start
`

## Web Interface
The web interface is the primary contact point for all customers coming into the parking garage. It uses websockets to relay incoming camera data. 

Installation

`
cd server/ && npm i && npm start
`

Open your browser and go to localhost:8080

