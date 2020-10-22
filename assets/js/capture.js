// used require instead og imports because 
// webpack has some sort of ES6 problem 
// also jQuery is added to the global scope so that scrollex can actually work

var jQuery = require("jquery");


window.jQuery = jQuery;
require("jquery.scrollex");

require("bootstrap/js/dist/util");
require("bootstrap/js/dist/modal");

require("bootstrap/dist/css/bootstrap.min.css");
require("../css/capture.css");

var $ = jQuery;

// IE10 viewport hack for Surface/desktop Windows 8 bug
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
			var msViewportStyle = document.createElement('style')
			msViewportStyle.appendChild(
					document.createTextNode(
							'@-ms-viewport{width:auto!important}'
					)
			)
			document.head.appendChild(msViewportStyle)
	}

/***********************************
* Sidenav 												 *
*																	 *
***********************************/

var $sideNav = $('.sidenav'),
		$sideNavWrapper = $sideNav.parent(),
		$trigger = $('#sidebar-trigger'),
		$icon = $trigger.find("i");

$trigger.click(function clickHandler(event) {
	event.preventDefault();
	
	
	if($icon.hasClass("fa-bars")) {
		
		// sidebar is closed
		$sideNavWrapper.addClass("open").
		css("width","14em");
		
		$sideNav.css("pointerEvents", "all");
		
		$icon[0].className = "fa fa-times";
		$icon.css("color", "#330036");
		
	}else {
		
		// sidenav is open
		
		$sideNavWrapper.removeClass("open").
		css("width", "0")
		
		$sideNav.css("pointerEvents", "none");
		
		$icon[0].className = "fa fa-bars";
		$icon.css("color", "#fff");
		
	}
});

/** 
*	TODO : make #sidebar-trigger alternate between black & white when we scroll
*/



/***********************************
* Animations							 					
*																	 
***********************************/
$tiles = $('.gallery div[class*="col"]');
$tiles.append('<div class="ripple"></div>');

// animation when scrolling
	$($tiles.find(".ripple")).scrollex({
		enter: function() {
			// add class to element 
			var $this = $(this);
			$this.addClass("rippled");
		}
		
	}).
	// display the elements after animation
	on("animationend", function(event) {
		$(this).removeClass("ripple");
	});

/* Smooth scrolling */

// Select all links with hashes
$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
			&& 
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});


