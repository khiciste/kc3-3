$(document).ready(function() {
    
    var i = 60;
    var totalQuotes = $('.quotes').length;
    // var i = Math.floor(Math.random() * totalQuotes + 1);
    
    // hide all quotes and numbers, then display 1st quote
    $('.quotes').css({"display": "none"});
    // $('.quote-numbers').css({"visibility": "visible"});
    $("#quote-" + i).css({"display": "block"});
    
    // display selected quotes
    function displaySelectedQuotes(tag) {
        var quotesToDisplay = tag;
        quotesToDisplay.css({"display": "block"});
    }
    
    // number each quote 
    function numberAllQuotes() {
        $('.quotes').each(function(index) {
            // give each card a numbered ID -- currently doing manually in HTML for readability
            // $(this).find('.quotes').attr("id", "quote-" + index);
            // add #number to each quote's quote-numbers span
            $(this).find('.quote-numbers').text("#" + ++index);
            // add a numbered ID to each quote-para -- not currently in use
            $(this).find('.quote-para').attr("id", "quote-" + index + "-para");
            // add a value to each copy-button -- used by copy function below
            $(this).find('.copy-btn').val(index);
        }); 
    }
    
    numberAllQuotes();
    
    // toggle quote numbers visibility 
    $("#quote-numbers-box").click(function() {
        $('.quote-numbers').toggleClass("hidden");
    });
    
    // show all button
    $("#all-quotes-btn").click(function() {
        i = 1;
        displaySelectedQuotes($('.quotes'));
        $("#quote-___").css({ "display": "none" });
    });
    
    // next quote button
    $("#next-quote-btn").click(function() {
        i++;
        // reset to 1 if at end -- note: - 1 here skips the blank quote template at end (not an off-by-one thing -- i = quote # here)
        if (i > totalQuotes - 1) { i = 1; }
        // hide all quotes, the show the next one
        $('.quotes').css({"display": "none"});
        displaySelectedQuotes($("#quote-" + i));
    });
    // previous quote button
    $("#prev-quote-btn").click(function() {
        i--;
        // reset to 1 if at end -- note: - 1 here skips the blank quote template at end (not an off-by-one thing -- i = quote # here)
        if (i == 0) { i = totalQuotes - 1; }
        // hide all quotes, then show the previous one
        $('.quotes').css({"display": "none"});
        displaySelectedQuotes($("#quote-" + i));
    });
    
    // random quote button
    $("#random-quote-btn").click(function() {
        var randomIndex = Math.floor(Math.random() * totalQuotes + 1);
        i = randomIndex;
        $('.quotes').css({"display": "none"});
        displaySelectedQuotes($("#quote-" + randomIndex));
    });

    // copy quote button
    $('.copy-btn').click(function() {
        
        var quoteNumber = $(this).val();
        
        // create a temporary text area to stash quote text
        var $temp = $("<textarea>");
        // HTML to remove from quote 
        var brRegex = /<br\s*[\/]?>/gi;
        var spanRegex = /<span class="CAPS quote-author">/gi;
        var closeSpanRegex = /<\/span>/gi;
        var italicsRegex = /<span class="italics">/gi;
        
        // temporarily add the text area to the body
        $("body").append($temp);
        
        // add the text from the the quote to the text area, 
        // strip all the HTML, replace <br /> with \n
        $temp.val($("#quote-" + quoteNumber + "-para").html().replace(brRegex, "\r\n").replace(spanRegex, "").replace(closeSpanRegex, "").replace(italicsRegex, "")).select();
        
        // copy the text
        document.execCommand("copy");
        // remove the temporary text area
        $temp.remove();
        
        // notify the user copy was successful
        M.toast({html: 'Quote copied', displayLength: 2000 });
    });

})