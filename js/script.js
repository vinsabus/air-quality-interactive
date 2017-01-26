// setup:
// install node (and npm)
// npm install request
// node script.js

var fs = require('fs');
var request = require('request');

var minutes = 5;
var queryInterval = minutes * 60 * 1000;

setInterval(function() {

	console.log('I am doing my '+ minutes + ' minutes check');

	if(!fs.existsSync('./test.json')){
		var obj = {};
		fs.writeFileSync('./test.json',JSON.stringify(obj))
	}
	var obj = require('./test.json');


	request('https://api.openaq.org/v1/latest?city=Delhi&parameter=pm25', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var output = JSON.parse(body);
	  	var flag = 0;

	    for (var i=0; i<output.results.length; i++){
	    	var loc = output.results[i].location;
	    	var data = output.results[i].measurements[0];

	    	if(!(loc in obj)){
	    		// if this location isn't in our file, make a new entry
	    		obj[loc] = {'pm25': [data.value], 'time': [data.lastUpdated]};
	    		flag = 1;
	    	}
	    	else{
	    		// else check if the current data is newer than the previous data
	    		var lastTime = obj[loc]['time'].slice(-1).pop();
	    		if(Date.parse(data.lastUpdated) > Date.parse(lastTime)){
	    			// if yes, append new data to the data array
	    			obj[loc]['pm25'].push(data.value);
	    			obj[loc]['time'].push(data.lastUpdated);
	    			flag = 1;
	    		}
	    	}
		}

		if(flag == 1){
			console.log(obj);

			fs.writeFile("test.json", JSON.stringify(obj), function(err) {
			    if(err) {
			    	console.log(err);
			    }

			    console.log("data written to file");
			});
		}
	  }
	})

}, queryInterval);

