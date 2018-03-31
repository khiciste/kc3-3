var min = 1;
var max = 59;
var usersNumbers = [];
var winningNumbers = [];
var currentRand;
var lottoCounter = 0;
var luckyNumber;
var currentBall;
var currentLucky;
var randomNumber;
var originalUsersNumbers;
var sortedUsersNumbers;
var sortedWinningsNumbers;
var weHaveAWinner;


$(document).ready(function(){
    
    $('input#input_text, textarea#textarea2').characterCounter();
    
    // $("#luckyNumber1").focus();
    
    var clickCounter = 0;
    
    // not sure what this was doing 
    // aside from causing a formatting error with the input field
    // $("#luckyNumber1").focus(function() { 
    //     $(this).select();
    //     $("#luckyNumber1").mouseup(function(e){
    //         e.preventDefault();
    //     });
    // });
    
    $("#nanError").hide();
    $("#lottoError").hide();
    $("#lottoResults").hide();
    
    
    $("#playButton").click(function() {
        $(".luckyNumbers").css({"color": "white"}); 
        // $(".luckyNumbers").css({"background-color": "#d9534f"});
        lottoCounter = 0;
        getUsersNumbers();
        // generateWinningNumbers();
        // $("#lottoResults").show();
    });

    // get user's lotto numbers
    function getUsersNumbers() {
        clickCounter++;
        if (clickCounter % 2 === 1) {
            // empty array
            usersNumbers = [];
            // goes to each div and stores value in usersNumbers array
            for (j = 1; j <= 6; j++) {
                luckyNumber = "#luckyNumber" + j;
                luckyNumber.toString();
                if ($(luckyNumber).val().length === 0) {
                    usersNumbers.push(j);
                }
                else {
                    currentLucky = parseInt($(luckyNumber).val(), 10);
                    usersNumbers.push(currentLucky);   
                }
            }
            // create a copy of usersNumbers to sort
            sortedUsersNumbers = usersNumbers.slice();
            // sort list to check for adjacent equality
            sortedUsersNumbers = sortedUsersNumbers.sort();
            // loop through to...
            for (r = 0; r < usersNumbers.length; r++) {
                usersNumbers[r] = parseInt(usersNumbers[r], 10);
                if (isNaN(usersNumbers[r])) {
                    luckyNumber = "#luckyNumber" + (r + 1);
                    luckyNumber.toString();
                    // $(luckyNumber).css("background-color", "#d9534f");
                    $("#nanError").css("color", "#d9534f");
                    $("#lottoResults").hide();
                    $("#nanError").show();
                    break;
                }
                // ...check for > 59
                else if (usersNumbers[r] < 1 || usersNumbers[r] > 59) {
                    luckyNumber = "#luckyNumber" + (r + 1);
                    luckyNumber.toString();
                    $(luckyNumber).addClass("invalid");
                    $("#lottoError").css("color", "#d9534f");
                    $("#lottoResults").hide();
                    $("#lottoError").show();
                    break;
                }
                // ...check for repetition
                else if (sortedUsersNumbers[r] === sortedUsersNumbers[r + 1]) {
                    luckyNumber = "#luckyNumber" + r;
                    luckyNumber.toString();
                    $(luckyNumber).addClass("invalid");
                    $("#lottoError").css("color", "#d9534f");
                    $("#lottoResults").hide();
                    $("#lottoError").show();
                    break;
                }
                else if (r === 5) {
                $("#lottoError").hide();
                $("#luckyList").text(usersNumbers); 
                generateWinningNumbers();   
                }
            }
        }
    }
    
    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    
    function removeCommas(str) {
        var nStr = str.replace(/\,/g,'');
        return parseInt(nStr, 10);
    }
    
    // draw the winning lotto balls
    function generateWinningNumbers() {
        lottoCounter = removeCommas(lottoCounter.toString());
        lottoCounter++;
        lottoCounter = addCommas(lottoCounter);
        // empty array
        winningNumbers = [];
        // create list of 6 numbers 1-59 w/o repetition to display as the winning #s
        while(winningNumbers.length < 6){
            randomNumber = Math.floor(Math.random()*(max - min + 1) + min);
            var found = false;
            for(k = 0; k < winningNumbers.length; k++){
                if(winningNumbers[k] === randomNumber) {
                    found = true;
                    // break;
                }
            }
            if(!found) {
                winningNumbers.push(randomNumber);
            }
        }
        // display winning lotto balls
        for (m = 1; m < winningNumbers.length + 1; m++) {
            currentBall = "#ball" + m;
            $(currentBall).text(winningNumbers[m - 1]);
        }
        
        checkNumbersForWin();
        $("#winners").text(winningNumbers);
        $("#numOfPlays").text(lottoCounter);
        setTimeout(function() {displayResults()}, 1);
    }
    
    // compare user's vs. winning numbers
    function checkNumbersForWin() {
        // compare arrays for equality regardless of order
        // if ($(usersNumbers).not(winningNumbers).length === 0 && $(winningNumbers).not(usersNumbers).length === 0) {
        // sortedUsersNumbers = usersNumbers.sort();
        sortedWinningNumbers = winningNumbers.sort();
        // for (p = 0; p < winningNumbers.length; p++) {
            // changed index to p for testing only
            // if (sortedUsersNumbers[p] === sortedWinningNumbers[p]) {
            if (sortedUsersNumbers[0] === sortedWinningNumbers[0] &&
                sortedUsersNumbers[1] === sortedWinningNumbers[1] &&
                sortedUsersNumbers[2] === sortedWinningNumbers[2] &&
                sortedUsersNumbers[3] === sortedWinningNumbers[3] &&
                sortedUsersNumbers[4] === sortedWinningNumbers[4] &&
                sortedUsersNumbers[5] === sortedWinningNumbers[5]) {
                
                weHaveAWinner = true;
            } else {
                weHaveAWinner = false;
            }
        // }
    }
    
    function displayResults() {
        if (weHaveAWinner) {
            for (q = 0; q < winningNumbers.length; q++) {
                luckyNumber = "#luckyNumber" + (q + 1);
                luckyNumber.toString();
                $(luckyNumber).css("background-color", "#0f9d58"); // Hangouts green
                $("#lottoResults").show();
                $("#luckyNums").text(usersNumbers);
                $("#numberOfWeeks").text(lottoCounter);
                lottoCounter = removeCommas(lottoCounter.toString());
                lottoCounter = parseInt(lottoCounter, 10);
                $("#numberOfYears").text(Math.round(lottoCounter / 52));
            }
        } else {
            generateWinningNumbers();
        }
    }
});
