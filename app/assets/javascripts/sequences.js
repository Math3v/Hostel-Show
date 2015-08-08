$(document).on('page:load ready', function() {
	var color = 'red';
	var sequence = [];
	var interval;

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

	$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        	getPreviousState();
        	break;

        case 39: // right
        	getNextState();
        	break;

        default: return;
    }
    e.preventDefault();
	});

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
		if(firstPosition()) {
			return;
		}
		var position = getCurrentPosition();
		var local_sequence = sequence[position - 2];

		$(".hostel-win").each(function(){
			var id = $(this).attr('id');
			$(this).css({'background-color':local_sequence[id]});
		});

		$("#position").text(position - 1);
	}

	function getNextState() {
		if(lastPosition()) {
			clearInterval(interval);
			return;
		}
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

	function setCurrentPosition(position) {
		$("#position").text(position);
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

	function displayFlash (selector) {
		$(selector).slideDown('normal', function(){ 
				setTimeout(function (){
					$(selector).slideUp('normal')
				}, 1000); 
			});
	}

	$(".hostel-win").click(function() {
		$(this).animate({'background-color': color}, 'fast');
	});

	$(".color-picker").click(function() {
		$(".active").removeClass("active");
		$(this).addClass("active");
	});

	$("#green").click(function() {
	 	color = 'green'; 
	});

	$("#red").click(function() {
	 	color = 'red'; 
	});

	$("#newFrame").click(function(){
		var position = getCurrentPosition();
		var positions = getNoPositions();

		if(lastPosition()){
			saveState();
			$("#position").text(position + 1);
			$("#positions").text(positions + 1);
		} else {
			/* TODO: Insert new frame */
			return;
		}
	});

	$("#next").on('click', function(){
		if(lastPosition()) {
			return;
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

		var id = gon.sequence_id;
		var url = '/sequences/' + id;

		$.ajax({
			method: 'PUT',
			url: url,
			dataType: 'json',
			data: {sequence: {data: JSON.stringify(sequence)}}
			}).success(function(){
				displayFlash("#custom-success-flash");
			}).fail(function(){
				displayFlash("#custom-error-flash");
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
			$(this).css({'background-color': color});
		});
	});

	$("#play").click(function(){
		interval = setInterval(getNextState, 200);
	});

	$("#reset").click(function(){
		while(firstPosition() == false) {
			getPreviousState();	/* TODO: faster*/
		}
	});

	$("#raty").raty({
		number: 4,
		score: function() {
    	return $(this).attr('data-score');
  	},
		click: function (score) {
			var id = gon.sequence_id;
			var url = '/sequences/' + id + '/rate';
			$.ajax({
			method: 'POST',
			url: url,
			dataType: 'json',
			data: {score: score}
			}).success(function(){
				console.log("Success");
				displayFlash("#custom-success-flash");
			}).fail(function(){
				console.log("Error");
				displayFlash("#custom-error-flash");
			});
		}
	});

	//Function to convert hex format to a rgb color
	function rgb2hex(orig){
	 var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
	 return (rgb && rgb.length === 4) ? "#" +
	  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
	}

	$("#createImage").click(function (){
		var elem_size = 50;
		var floors = 10;
		var per_floor = 9;

		$("#canvas").attr('width', per_floor * elem_size);
		$("#canvas").attr('height', floors * elem_size);

		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		var ax = 0;
		var ay = 0;

		$(".hostel-win").each(function(){
			var color = rgb2hex($(this).css('background-color'));
			ctx.fillStyle = color;
			ctx.fillRect(ax, ay, elem_size, elem_size);
			ax += elem_size;
			if(ax >= per_floor * elem_size) {
				ax = 0;
				ay += elem_size;
			}
		});

		var url = '/sequences/' + gon.sequence_id;
		var image = c.toDataURL('image/png');
		$.ajax({
			method: 'PUT',
			url: url,
			dataType: 'json',
			data: {sequence: {image: image}}
			}).success(function(){
				console.log("Success");
				displayFlash("#custom-success-flash");
			}).fail(function(){
				console.log("Error");
				displayFlash("#custom-error-flash");
			});
	});

});