/* Collects data from open source via GET request. */
//'use strict';

var AWS = require('aws-sdk');
const kelvinToCelsius = require('kelvin-to-celsius');
var request = require('request');
var fs = require('fs');

const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

/* 
	Requires an APPID, received after registering. 
	Requires the name of the city.
*/
var file = fs.readFileSync('APPID_FILE', 'utf8');
var obj_file = JSON.parse(file);

var APPID = obj_file.APPID;
var city = obj_file.City;
var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&" + "APPID=" + APPID;
// var db_items = {
// 	temperature: 0
// };
GLOBAL.temperature = 0;	
console.log(global);


exports.handler = function(event, context, callback){


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
	  		GLOBAL.temperature = kelvinToCelsius(obj.main.temp);
	  		console.log("Temperature:", GLOBAL.temperature);
    	}
	);
	console.log(GLOBAL.temperature);
	// Push the data onto DynamoDB
	var params = {
		
		Item: {
			Date: Date.now(),
			Temperature: GLOBAL.temperature
		},
		
		TableName: 'Open-Data'
	};
	
	documentClient.put(params, function(err, data) 
		{
			if(err){
				console.log('err', err);
				callback(err, null);
			}
			else{
				callback(null, data);
			}
		
		}
	);
};
