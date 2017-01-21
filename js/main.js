$(function(){
	$.ajax ({
		type: 'GET',
		url: 'https://api.openaq.org/v1/latest?city=Delhi&parameter=pm25',
		success: function(data) {

			var output = "";
			output += "<div class='row'><div class='col-sm-6 col-sm-push-3'>";
			output += '<table class="table table-striped table-condensed">';
			output += '<tr><th>Location</th><th>Pollutant</th><th>Value</th><th>Last Reading</th></tr>';

			$.each(data.results, function(key, val) {
				var measurements = val.measurements;
				$.each(measurements, function(i, v) {
					output += '<tr>';
					var timeSince = convertTime(Date.parse(new Date()) - Date.parse(v.lastUpdated));
					output += '<td>' + val.location + '</td><td>' + v.parameter + '</td><td>' + v.value + ' ' + v.unit + '</td><td>' + timeSince+ '</td></tr>';
				})
			})

			output += '</table>';
			output += '</div></div>';
			$('#result').html(output);
		}
	});
});

// adapted from stack overflow http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function convertTime(millis) {

    var seconds = Math.floor(millis / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {return interval + " years";}
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {return interval + " months";}
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {return interval + " days";}
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {return interval + " hours";}
    interval = Math.floor(seconds / 60);
    if (interval > 1) {return interval + " minutes";}
    return Math.floor(seconds) + " seconds";
}
