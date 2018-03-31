$(document).ready(function() {
    
    var i = 47;
    var totalQuotes = $('.quotes').length;
    
    // hide all quotes, then display 1st quote
    $('.quotes').css({"display": "none"});
    $("#quote-" + i).css({"display": "block"});
    
    // display selected quotes
    function displaySelectedQuotes(tag) {
        var quotesToDisplay = tag;
        quotesToDisplay.css({"display": "block"});
    }
    
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