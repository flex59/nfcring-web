$(document).ready(function() {
		$(".fancybox").fancybox();

		$('.fancybox-thumbs').fancybox({
			prevEffect : 'none',
			nextEffect : 'none',

			closeBtn  : true,
			arrows    : true,
			nextClick : true,

			helpers : {
				thumbs : {
					width  : 80,
					height : 80
				}
			},
			beforeLoad: function() {
				this.title = $(this.element).attr('caption');
			}
		});

});