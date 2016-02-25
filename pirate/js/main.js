$.fn.extend({

	// debounce delayed function on resize
	debounce: function(func, wait, immediate) {
	
		var timeout;

		return function() {
			var context = this, args = arguments;
			
			var later = function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};

			var callNow = immediate && !timeout;

			clearTimeout(timeout);

			timeout = setTimeout(later, wait);

			if (callNow) {
				func.apply(context, args);
			}
		};

	},

	audioShizzle: function( loopaudio ) {

		var myAudio = new Audio('m4a/pirate.m4a'); 

		if (typeof myAudio.loop === 'boolean') {
		    //myAudio.loop = true;
		    myAudio.loop = loopaudio;
		} else {
		    myAudio.addEventListener('ended', function() {
		        this.currentTime = 0;
		        this.play();
		    }, false);
		}

		myAudio.play();

	}
});

(function($, undefined) {

	var fullCharacter = $('#character'),
		awesomesauce = $('.awesomesauce'),
		eth0 = $('.eth0'),
		eth1 = $('.eth1'),
		lifeissad = $('.lifeissad');

	var loopaudio = true;

	var pageWidth = $(document).width();

	/**
	 * On ready init function
	 */
	$( window ).load(function() {

		$(this).audioShizzle( loopaudio );

		lifeissad.hide();

		var $curr = $('.toggle').first();
		// Hide all the divs
		$('.toggle').addClass('hide');
		// Display the first div
		$curr.removeClass('hide');

		var interval = setInterval(function () {
			// Hide all the divs/*
			$('.toggle').addClass('hide');
			var len = $('.toggle').length,
			found = false;

				$(".toggle").each(function(index) {
				if($(this).is($curr) && !found) {
					var nextIndex = index + 1;
					if(nextIndex >= len) {
						$curr = $('.toggle').first();
					} else {
						$curr = $('.toggle').eq(nextIndex);
						found = true;
					}
				}
			});
			$curr.removeClass('hide');
		}, 500);

		function animateRect() {
			fullCharacter.css({ left: pageWidth })
				.animate({ left: pageWidth - ( pageWidth + fullCharacter.width() ) }, 10000, animateRect);
		}

		animateRect();

	});

    /**
	 * run on resize of the window
	 */
    var debounceResize = $(this).debounce(function() {

	}, 500);

	$(window).on('resize', debounceResize);

	
})(jQuery);

/*
var t0 = performance.now();
// insert function to monitor
var t1 = performance.now();
$(window).perf( 'onLoad functions', t1, t0 );
*/