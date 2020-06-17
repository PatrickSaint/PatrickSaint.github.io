
var content; // main div
var section; // content section
var button_case;	 // header button case
var buttons; // header buttons
var sign;	 // activated button sign

//var color = ["#ef476f", "#ffd166", "#06d6a0", "#2CA6CE", "#654aeb"];
var button_color = [ "#999ba3", "#f29e50", "#f55353" ];

var button_text_off = [ "<h2> Começo </h2>", 
						"<h2>Sobre Mim</h2>", 
						"<h2>Site</h2>" ];

var button_text_on = [ 	"<h2 style='color: #999ba3;'>/* Começo */</h2>", 
						"<h2 style='color: #f29e50;'>[ Sobre Mim ]</h2>", 
						"<h2 style='color: #f55353;'>// Site = 0.1</h2>" ];

var position = 0;
var delta = 0;
var delay = false;
var page = 0;

function run() {
	get_elements();
	get_events();
	set_sign();
}

function get_elements() {
	content = document.getElementById("content");
	section = document.getElementsByClassName("page");
	button_case = document.getElementById("buttons");
	buttons = document.getElementsByTagName("button");
	sign = document.getElementById("sign");
}

function get_events() {
	content.addEventListener( "wheel", event => { slide(event); });
}

function set_sign() {
	sign.style["width"] = ( button_case.clientWidth / buttons.length ) + "px";
	sign.style["left"] = ( - 3 * sign.clientWidth ) + "px";
}

function goto(destination) {
	if( destination >= 0 && destination < section.length ){
		position = destination * content.clientHeight;
		content.scrollTo(0, position);

		//sign.style["background-color"] = color[destination];
		sign.style["left"] = (destination * sign.clientWidth - 3 * sign.clientWidth) + "px";
		sign.style["background-color"] = button_color[destination];

		buttons[page].innerHTML = button_text_off[page];
		buttons[destination].innerHTML = button_text_on[destination];

		//buttons[page].style["color"] = "#cccccc";
		//buttons[destination].style["color"] = "#ffffff";

		page = destination;

	}

}

/*function fullscreen() {

	document.body.requestFullscreen();

}*/

function slide( event ) {

	event.preventDefault();

	delta = Math.sign(event.deltaY);
	
	if( delay )
		return;
		
	delay = true;
    setTimeout( function(){ delay = false }, 500 );

   	goto(page + delta);

}

/*function send_email() {
	
	Email.send( {
		
		Host: "smtp.gmail.com",
		Username : "patricksantanadeveloper@gmail.com",
		Password : "familia02",
		To : 'antoniopatricksantana@gmail.com',
		From : document.getElementById("input_email").value,
		Subject : document.getElementById("input_subject").value,
		Body : document.getElementById("input_name").value + ": " + document.getElementById("input_message").value,
		
	} ).then( message => alert( "mail sent successfully" ) );

}*/

/*function loop() {

	alert("loop");
	window.requestAnimationFrame(this);

}*/

window.onload = run;
