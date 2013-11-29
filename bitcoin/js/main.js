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

});


$(document).on('coinbase_payment_complete', function(event, code){

	$('#paid').slideDown();
  $("#code").text(code);
});