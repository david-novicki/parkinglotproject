# Server Endpoint Documentation

## "/":
* Method: GET
* x-form-urlencoded: None
* Response:
 * status: (Boolean)       // The status of the server; (true) is running; (false) isn't running

## "/license":
* Method: POST
* x-form-urlencoded:
 * platenumber: (String)   // The license plate number read by the camera
 * status: (Boolean)       // The status of the client sending the data; (true) is for the entrance camera; (false) is for the exit camera
* Response:
 * platenumber: (String)   // The license plate number the server received
 * status: (Boolean)       // The status of the client the server received
 * isvalid: (Boolean)      // The validity of the license plate number and status sent by the client; (true) is valid; (false) is invalid
 * online: (Boolean)       // The online status of the server; (true) is online; (false) is offline

## "/spot":
* Method: POST
* x-form-urlencoded:
 * spotnumber: (String)    // The spot number sent by the sensor
 * status: (Boolean)       // The status of the sensor; (true) is for full; (false) is for empty
* Response:
 * spotnumber: (String)   // The spot number the server received
 * status: (Boolean)       // The status of the client the server received
 * isvalid: (Boolean)      // The validity of the spot number and status sent by the client; (true) is valid; (false) is invalid
 * online: (Boolean)       // The online status of the server; (true) is online; (false) is offline
