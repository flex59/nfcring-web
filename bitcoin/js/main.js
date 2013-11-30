var guidStr = guid();
$('.coinbase-button').data("custom", guidStr);

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

function guid() {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


$(function() {

	$(".popup").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});

	$('.preorder .button').smoothScroll({
		offset: -100
	});

  	$(".paid").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});

//	$.getScript("https://coinbase.com/assets/button.js");
	
	


});

$(document).on('coinbase_payment_complete', function(event, code){
  $('#paid').slideDown();
  $("#code").text(code);
});


