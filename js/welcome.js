$(document).ready(function() {
	setTimeout(function() {
		$('#welcome-container p').css({
			opacity: 1,
			top: 0
		});
	}, 500);

	$('#welcome-container p a').hover(function() {
		$('#welcome-container p').toggleClass('hovered');
	});

});
