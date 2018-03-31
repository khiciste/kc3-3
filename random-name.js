$(document).ready(function() {

var idClicked;
var classClicked;
var lengthOfClass;
var randomStudentNumber;
var studentChosen;
var count;
var classColor;
var classColorHex;
var lighterColor;
var darkerColor;
var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

// function to convert rgb color to hex format
// https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
function lightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

function chooseRandomStudent(lengthOfClass, classClicked) {
	var min = 1;
	var max = lengthOfClass;
	// generate a random # between 1 & class length
	randomStudentNumber = Math.floor(Math.random()*(max - min + 1) + 1);
	// build student's number to match id
	studentChosen = $("#" + classClicked + "-" + randomStudentNumber);
	highlightStudent(studentChosen);
}

function resetStudents() {
	// $("#test").text("");
	$('.students').css({"background-color": classColor});
}

function highlightStudent(student) {
	// reset all students to their appropriate colors 
	resetStudents();
	// lighten the background-color
	// lighterColor = lightenDarkenColor(classColorHex, 60);
	// darkerColor = lightenDarkenColor(classColorHex, -30);
	// time delay to see the change in case same student is selected back to back
	setTimeout(function() {
		//lighten all 
		// $('.' + classClicked).css({"background-color": lighterColor});
		$('.' + classClicked).css({
			"opacity": "0.2",
			"font-weight": "normal",
			"font-size": "1rem"
		});
		// darken selected
		// student.css({"background-color": darkerColor});
		student.css({
			"opacity": "1.0",
			"font-weight": "bold",
			"font-size": "1.5rem"
		});
		// student.addClass("darken-4");
		// student.addClass('highlight');
		// $("#test").text(classColorHex + ", " + darkerColor);
	}, 800);
}

	// hide/show students by class
	$('.class-btn').click(function(event) {
		count = 0;
		// when a class is clicked, hide all students
		$('.students').hide();
		// get id of class button clicked
		classClicked = $(this).attr('id');
		// display all elements with the classClicked
		$("." + classClicked).css({"display": "inline-block"});
		// get length of class list for chooseRandomStudent()
		lengthOfClass = $("." + classClicked).length;
		// get background-color of classClicked, send to converter
		classColor = $(this).css("backgroundColor");
		classColorHex = rgb2hex(classColor);
		resetStudents();
		// when a class is clicked, add id's to each student
		// ex. rangers-1, rangers-2, etc
		$('.students').each(function(i) {
			if ($(this).hasClass(classClicked)) {
				$(this).attr("id", classClicked + "-" + (i - count + 1));
			}
			else {
				count = i + 1;
				// note: count will be zero for rangers
			}
		})
	})
	
	$("#go-btn").click(function() {
		chooseRandomStudent(lengthOfClass, classClicked);
	})
	
})