$(document).ready(function() {
	var color = 'red';
	var sequence = [];

	console.log("Length " + $("#dataField").text().length);
	console.log("Parsed " + JSON.parse($("#dataField").text()));
	sequence = $("#dataField").text().length > 0 ? JSON.parse($("#dataField").text()) : [];
	console.log("Sequence length " + sequence.length);
	if(sequence.length > 0) {
		var local_sequence = sequence[0];
		$(".hostel-win").each(function(){
			var id = $(this).attr('id');
			var color = local_sequence[id];
			console.log("id " + id + " color " + color);
			$(this).css({'background-color': local_sequence[id]});
			console.log("Positions " + sequence.length);
			$("#positions").text(sequence.length);
		});
	}

	function saveState() {
		var local_sequence = {};
		$(".hostel-win").each(function(){
			var color = $(this).css('background-color');
			var id = $(this).attr('id');
			local_sequence[id] = color;
		});
		sequence.push(local_sequence);
		local_sequence = {};
	}

	function getPreviousState() {
		var position = getCurrentPosition();
		var local_sequence = sequence[position - 2];

		$(".hostel-win").each(function(){
			var id = $(this).attr('id');
			$(this).css({'background-color':local_sequence[id]});
		});

		$("#position").text(position - 1);
	}

	function getNextState() {
		var position = getCurrentPosition();
		var local_sequence = sequence[position];

		$(".hostel-win").each(function(){
			var id = $(this).attr('id');
			$(this).css({'background-color':local_sequence[id]});
		});

		$("#position").text(position + 1);
	}

	function getCurrentPosition() {
		return +$("#position").text();
	}

	function getNoPositions() {
		return +$("#positions").text();
	}

	$(".hostel-win").click(function(event) {
		$(this).animate({'background-color': color}, 'fast');
	});

	$("#green").click(function(event) {
	 	color = 'green'; 
	});

	$("#red").click(function(event) {
	 	color = 'red'; 
	});

	$("#next").on('click', function(){
		var position = getCurrentPosition();
		var positions = getNoPositions();

		if(position < positions){
			getNextState();
		} else {
			saveState();
			if(position == positions){
				$("#position").text(position + 1);
				$("#positions").text(positions + 1);
			}
		}
	});

	$("#prev").on('click', function(){
		saveState();
		getPreviousState();
	});

	$("#save").on('click', function() {
		var id = 1; /* TODO */
		var url = '/sequences/' + id;
		$.ajax({
			method: 'PUT',
			url: url,
			dataType: 'json',
			data: {sequence: {data: JSON.stringify(sequence)}}
			}).success(function(){
				console.log("Success");
			}).fail(function(){
				console.log("Failed");
			});
	});

});