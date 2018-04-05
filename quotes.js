$(document).ready(function() {
    
    var i = 50;
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
    });
    
    // next quote button
    $("#next-quote-btn").click(function() {
        i++;
        if (i > totalQuotes) { i = 1; }
        $('.quotes').css({"display": "none"});
        displaySelectedQuotes($("#quote-" + i));
    });
    // previous quote button
    $("#prev-quote-btn").click(function() {
        i--;
        if (i == 0) { i = totalQuotes; }
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
        var brRegex = /<br\s*[\/]?>/gi;
        var spanRegex = /<span class="CAPS quote-author">/gi;
        var closeSpanRegex = /<\/span>/gi;
        var italicsRegex = /<span class="italics">/gi;
        
        $("body").append($temp);
        
        $temp.val($("#quote-" + quoteNumber + "-para").html().replace(brRegex, "\r\n").replace(spanRegex, "").replace(closeSpanRegex, "").replace(italicsRegex, "")).select();
        
        document.execCommand("copy");
        $temp.remove();
        
        M.toast({html: 'Quote copied'});
    });

})