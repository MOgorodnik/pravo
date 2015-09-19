$(document).ready(function(){
	// placeholder plugin init
	$('input, textarea').placeholder();

	// fancybox video
    $("a.video-in-box").click(function(e) {
    	e.preventDefault();
	    $.fancybox({
            'padding'       : 0,
            'autoScale'     : false,
            'transitionIn'  : 'none',
            'transitionOut' : 'none',
            'title'         : this.title,
            'width'     : 640,
            'height'        : 480,
            'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type'          : 'swf',
            'swf'           : {
                'wmode'        : 'transparent',
                'allowfullscreen'   : 'false'
            }
        });

	    return false;
	});

	// send button
	$('#send-btn').click(function(){
		$(".request-fields input[required='required']").each(function(){
			var value = $(this).val().trim();
			if (value.length == 0) {
				$(this).addClass('error');
			};
		});
	});

	// remove 'error' class from input on keydown
	$(".request-fields input[required='required']").keydown(function(){
		$(this).removeClass('error');
	});

	// phone mask
	$("#user_phone").mask("+999(99)999-99-99");

	// change language
	$('.language').click(function(){
		if ($(this).hasClass('ru')){
			$(this).removeClass('ru').addClass('en');
		} else {
			$(this).removeClass('en').addClass('ru');
		}
	});
});