//for implementing operations
var first_entry = null;
var new_entry = false; //boolean that is true if something new has been written on the screen
var current_operation_string;
var restart_display = false; //boolean that determines if display value should be replaced on press


var display = document.getElementById("num-display");
var operator_display = document.getElementById("operator-display")

function compute_operation(a, b, op_string){
	var maybe_answer;
	if(op_string == "+"){
		maybe_answer = a + b;
	}
	else if(op_string == "-"){
		maybe_answer = a - b;
	}
	else if(op_string == "&times"){
		maybe_answer = a * b;
	}
	else if(op_string == "&divide"){
		maybe_answer = a / b;
	}

	if(!isFinite(maybe_answer)){
		return "Not a number";
	}

	return maybe_answer;
}

function operation_press(op_string){
	if(first_entry === null){
		first_entry = Number(display.innerHTML);
		
	}
	else if(new_entry == true){
		display.innerHTML = compute_operation(first_entry, Number(display.innerHTML),current_operation_string);
		first_entry = Number(display.innerHTML);

	}
	current_operation_string = op_string;
	operator_display.innerHTML = op_string;
	restart_display = true;
	new_entry = false;
}

var clear = document.getElementById("button-C");
clear.onclick = function(e){
	display.innerHTML = "0";
	current_operation_string = "";
	operator_display.innerHTML = "";
	first_entry = null;
}


var button;
for(var i = 0; i < 10; i++){
	button = document.getElementById("button-" + i);
	button.onclick = function(e){
		new_entry = true;

		if(display.innerHTML == "0" || restart_display){
			display.innerHTML = e.target.innerHTML;
			restart_display = false;
		}
		else{
			display.innerHTML += e.target.innerHTML;
		}
	} 
}

var decimal = document.getElementById("button-.");
decimal.onclick = function(e){
	var current_display = display.innerHTML;
	for (var i = 0; i < current_display.length; i++) {
		if(current_display[i] == "."){
			return;
		} 
	}
	if(restart_display){
		new_entry = true;
		display.innerHTML = "0.";
		restart_display = false;
		return;
	}
	display.innerHTML += ".";
}

var pm = document.getElementById("button-+/-");
pm.onclick = function(e){
	var current_display = display.innerHTML;
	if(current_display == "0"){
		return;
	}
	else if(current_display[0] == "-"){
		display.innerHTML = current_display.substring(1);
	}
	else{
		display.innerHTML = "-" + current_display;
	}
}

var add = document.getElementById("button-+");
add.onclick = function(e){
	operation_press("+");
}

var subtract = document.getElementById("button--");
subtract.onclick = function(e){
	operation_press("-");
}

var mult = document.getElementById("button-X");
mult.onclick = function(e){
	operation_press("&times");
}

var divide = document.getElementById("button-/");
divide.onclick = function(e){
	operation_press("&divide");
}

var equals = document.getElementById("button-=");
equals.onclick = function(e){
	if(current_operation_string == ""){
		restart_display = true;
		return;
	}
	else if(first_entry != null){
		if(new_entry == false){
			display.innerHTML = compute_operation(first_entry, first_entry, current_operation_string);
		}
		else{
			display.innerHTML = compute_operation(first_entry, Number(display.innerHTML), current_operation_string);
		}
		first_entry = null;

	}

	restart_display = true;
	new_entry = false;
	current_operation_string = "";
	operator_display.innerHTML = "";
}






