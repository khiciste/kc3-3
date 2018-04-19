$(document).ready(function() {
    // BLACK HOLE SPOILER
    $("#black-hole-btn").click(function() {
        $("#black-hole-spoiler").fadeToggle("slow");
    });
    
    // TAG FILTERING
    $('.tag').click(function() {
        $('.tag').css({ 
            "opacity": "0.4",
			"font-weight": "normal",
			"font-size": "1.0rem"
        });
        $(this).css({ 
            "opacity": "1.0"//,
			// "font-size": "1.5rem"
        });
        $('.post').removeClass('active-post').addClass('display-none');
        var tag_clicked = $(this).attr("id");
        $('.' + tag_clicked).removeClass('display-none').addClass('active-post');
    });
    
    // ALL BUTTON
    $("#all").click(function() {
        $('.post').removeClass('display-none').addClass('active-post');
        $("#template-post").removeClass('active-post').addClass('display-none');
    });
    
})