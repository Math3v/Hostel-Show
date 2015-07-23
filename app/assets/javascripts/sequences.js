$(document).ready(function() {
	var color = 'red';
	var sequence = [];

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

	$(function() {    
		$(".hostel-win").click(function(event) {
		  $( "#" + event.target.id ).css({'background-color': color});
		  /*$( "#" + event.target.id ).animate({
		    backgroundColor: color,
		  }, 'fast' );*/
		});
	});

	$(function() {    
		$("#green").click(function(event) {
		 	color = 'green'; 
		 });
	});

	$(function() {    
		$("#red").click(function(event) {
		 	color = 'red'; 
		 });
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

});