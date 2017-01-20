$(function(){
	$.ajax ({
		type: 'GET',
		url: 'https://api.openaq.org/v1/latest?city=Delhi',
		success: function(data) {
			var output = "";
			output += "<div class='row'><div class='col-sm-6 col-sm-push-3'>";
			$.each(data.results, function(key, val) {
				output += '<h3>'+ val.location + '</h3>';
				output += '<table class="table table-striped table-condenced">';
				var measurements = val.measurements;
				$.each(measurements, function(i, v) {
					output += '<tr>';
					output += '<td>' + v.parameter + '</td><td>' + v.value + ' ' + v.unit + '</td></tr>';
				})
				output += '</table>';
			})
			output += '</div></div>';
			$('#result').html(output);
		}
	});
});

