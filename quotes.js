$(document).ready(function() {

  // ON STARTUP! ====================================================
    var allQuotes = $('.quotes');
    var totalQuotes = $('.quotes').length;
    // get current URL
    // var url = window.location.href;
    // begin with quotes numbered
    numberAllQuotes();
    // set a default quote to open with
        // var i = 23;
    // to begin with a random quote
    var i = Math.floor(Math.random() * totalQuotes + 1);
  // ================================================================


    // check URL to display the requested quote(s)
    var hashTag = window.location.hash;
    if (hashTag.includes("#quote-")) {
        // strip all text from URL up to and including the dash
        // (i.e., just get the number for the quote and set it to i)
        // 1. find location of #- (quote number will succeed #-)
        //    - needs + 7 for length of str #quote-
        var quoteNumberPosition = hashTag.indexOf("#quote-") + 7;
        // 2. get length of current URL
        var lengthOfHash = hashTag.length;
        // 3. remove all other text from before #quote- to end 
        i = hashTag.slice(quoteNumberPosition, lengthOfHash);
        // 4. pass quote # to display quotes function
        displaySelectedQuotes($("#quote-" + i));
        updateURL("#quote-" + i);
    }
    // contains all (from closing modal)
    else if (hashTag.includes("#all")) {
        // display all quotes 
        displaySelectedQuotes($('.quotes'));
        updateURL("#all");
    }
    else {
        // just display ith quote
        displaySelectedQuotes($("#quote-" + i));
        updateURL("");
    }


    // number each quote 
    function numberAllQuotes() {
        allQuotes.each(function(index) {
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
    
    // display selected quotes
    function displaySelectedQuotes(tag) {
        // hide all first
        allQuotes.css({"display": "none"});
        tag.css({"display": "block"});
            // keep the template hidden
            $("#quote-___").css({ "display": "none" });
    }

    
    // update URL to include current quote number
    function updateURL(urlSuffix) {
        // for c9 testing
        // history.pushState(null, '', ("/kcleland/kc3-3/quotes.html" + urlSuffix).toString());
        // for iwishwehadmoretime
        history.pushState(null, '', ("/quotes.html" + urlSuffix).toString());
    }
    
    // toggle quote numbers visibility 
    $("#quote-numbers-box").click(function() {
        $('.quote-numbers').toggleClass("hidden");
    });
    
    // show all button
    $("#all-quotes-btn").click(function() {
        i = 1;
        displaySelectedQuotes($('.quotes'));
        updateURL("#all");
            // keep the template hidden
            $("#quote-___").css({ "display": "none" });
    });
    
    // previous quote button
    $("#prev-quote-btn").click(function() {
        i--;
        // reset to 1 if at end -- note: - 1 here skips the blank quote template at end (not an off-by-one thing -- i = quote # here)
        if (i == 0) { i = totalQuotes - 1; }
        // hide all quotes, then show the previous one
        $('.quotes').css({"display": "none"});
        displaySelectedQuotes($("#quote-" + i));
        updateURL("#quote-" + i);
    });
    // next quote button
    $("#next-quote-btn").click(function() {
        i++;
        // reset to 1 if at end -- note: - 1 here skips the blank quote template at end (not an off-by-one thing -- i = quote # here)
        if (i > totalQuotes - 1) { i = 1; }
        // hide all quotes, the show the next one
        $('.quotes').css({"display": "none"});
        displaySelectedQuotes($("#quote-" + i));
        updateURL("#quote-" + i);
    });
    
    // random quote button
    $("#random-quote-btn").click(function() {
        var randomIndex = Math.floor(Math.random() * totalQuotes + 1);
        i = randomIndex;
        $('.quotes').css({"display": "none"});
        displaySelectedQuotes($("#quote-" + randomIndex));
        updateURL("#quote-" + i);
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
        M.toast({html: 'Quote copied to clipboard', displayLength: 2000 });
    });

})