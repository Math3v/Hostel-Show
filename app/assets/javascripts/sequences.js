$(document).ready(function() {
var color = "#FF0000";
var sequence = [];

	$(function() {    
		$( ".hostel-win" ).click(function(event) {
		  $( "#" + event.target.id ).animate({
		    backgroundColor: color,
		  }, 1000 );
		});
	});

	$(function() {    
		$( "#green" ).click(function(event) {
		 	color = "#00FF00"; 
		 });
	});

	$(function() {    
		$( "#red" ).click(function(event) {
		 	color = "#FF0000"; 
		 });
	});

	

});