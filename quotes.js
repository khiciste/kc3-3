$(document).ready(function() {
    
    var i = 47;
    var totalQuotes = $('.quotes').length;
    
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
            $(this).find('.quote-numbers').text("#" + ++index);
        }); 
    }
    
    numberAllQuotes();
    
    // toggle quote numbers visibility 
    $("#quote-numbers-box").click(function() {
        $('.quote-numbers').toggleClass("hidden");
    })
    
    // display all quote numbers
    function displayQuoteNumbers() {
        $('.quote-numbers').css({"display": "block"}); 
    }
    
    // displayQuoteNumbers();
    
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
})