/* Collects data from open source via GET request. */

const kelvinToCelsius = require('kelvin-to-celsius');
var request = require('request');
var fs = require('fs');

/* 
Requires an APPID, received after registering. 
Requires the name of the city.
*/
var file = fs.readFileSync('APPID_FILE', 'utf8');
obj_file = JSON.parse(file);

var APPID = obj_file.APPID;
var city = obj_file.City;

url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&" + "APPID=" + APPID;
//console.log(url);

// Use request to make a GET call and collect the data
request(
    {
        url : url,
        method: "GET",
    },
    function (error, response, body) {
        console.log('error:', error);
  		console.log('statusCode:', response && response.statusCode);
  		console.log('body:', body);

  		// Parse the JSON Object
  		var obj = JSON.parse(body);
  		//console.log("obj:", obj);
  		console.log("Temperature:", kelvinToCelsius(obj.main.temp));
    }
);


// Push the data onto DynamoDB
