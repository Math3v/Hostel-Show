$(document).ready(function() {
	var color = 'red';
	var sequence = [];

	/* Initialize persistent sequence from database */
	sequence = $("#dataField").text().length > 0 ? JSON.parse($("#dataField").text()) : [];
	if(sequence.length > 0) {
		var local_sequence = sequence[0];
		$(".hostel-win").each(function(){
			var id = $(this).attr('id');
			var color = local_sequence[id];
			$(this).css({'background-color': local_sequence[id]});
		});
		$("#positions").text(sequence.length);
	}

	function saveState() {
		if(lastPosition() && (getCurrentPosition() == sequence.length)) {
			console.log("Hit! Skipping save");
			return;
		}
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

	function clearCurrentState() {
		$(".hostel-win").each(function(){
			$(this).css({'background-color': 'white'});
		});
	}

	function getCurrentPosition() {
		return +$("#position").text();
	}

	function getNoPositions() {
		return +$("#positions").text();
	}

	function lastPosition() {
		var position = getCurrentPosition();
		var positions = getNoPositions();

		return position == positions;
	}

	function firstPosition() {
		return getCurrentPosition() == 1;
	}

	$(".hostel-win").click(function(event) {
		$(this).animate({'background-color': color}, 'fast');
	});

	$(".color-picker").click(function() {
		$(".active").removeClass("active");
		$(this).addClass("active");
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

		if(lastPosition()) {
			saveState();
			$("#position").text(position + 1);
			$("#positions").text(positions + 1);
		} else {
			getNextState();
		}
	});

	$("#prev").on('click', function(){
		if(firstPosition()){
			return;
		}
		if(lastPosition()){
			saveState();
		}
		getPreviousState();
	});

	$("#save").on('click', function() {
		if(lastPosition()) {
			saveState();
		}
		var id = 3; /* TODO */
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

	$("#deleteFrame").click(function(){
		if(sequence.length == 0) {
			clearCurrentState();
			return;
		}
		if(sequence.length == 1) {
			clearCurrentState();
			sequence.splice(position - 1, 1);
		} else {
			var position = getCurrentPosition();
			var positions = getNoPositions();
			sequence.splice(position - 1, 1);
			$("#positions").text(positions - 1);
			getPreviousState();
		}
	});

	$("#shiftLeft").click(function(){
		$(".hostel-win").each(function(){
			var color = $(this).next().css('background-color');
			console.log("Color " + color + " of " + $(this).next());
			$(this).css({'background-color': color});
		});
	});

});