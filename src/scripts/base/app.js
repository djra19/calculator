/* jshint strict: true */
/* exported Operations, app */

(function() {
"use strict";
  window.Operations = {
    ADD: 0,
    SUSTRACT: 1,
    MULTIPLY: 2,
    DIV: 3
  };

  window.app = {
  	s_result: true,
  	c_stack: [],
  	t_operation: Operations.ADD,

  	setEvs: function() {
  		var self = this;

  		// About
  		var btn_about = document.querySelector(".keypad .about");
  		btn_about.addEventListener("click", function() {
  			alert("Calculadora\n\nUna simple calculadora para la web.\nVersion: 1.0.0\nCreada por: David Romero.");
  		});

  		// Clear Output
  		var btn_ce = document.querySelector(".output .ce");
  		btn_ce.addEventListener("click", function(){self.clearAll();});

  		// Remove Number
  		var btn_remove = document.querySelector(".output .clear");
  		btn_remove.addEventListener("click", function() {
  			var o_node = document.querySelector(".output textarea");
  			if(self.s_result === true) {
  				self.setOutputZero();
  			}
  			else if(o_node.value.length > 1) {
  				o_node.value = o_node.value.substring(0, o_node.value.length - 1);
  			}
  			else {
				self.setOutputZero();
  			}
  		});

      // Key Buttons
      var btns_keys = document.querySelectorAll(".keys button");
      for (var i = btns_keys.length - 1; i >= 0; i--) {
        btns_keys[i].addEventListener("click", addRippleEffect);
      }

  		// Keypad
  		var btns_keypad = document.querySelectorAll(".keypad button[value]");
  		for (var i = 0; i < btns_keypad.length; i++) {
  		  var node = btns_keypad[i];
  		  node.addEventListener("click", function(){self.writeKey(this);});
  		}

  		// Operations
  		var btns_command = document.querySelectorAll(".operators button");
  		for (var i = 0; i < btns_command.length; i++) {
  		  var node = btns_command[i];
  		  node.addEventListener("click", function(){self.setOperation(this);});
  		}
  	},

  	setOutputZero: function() {
  	  var o_node = document.querySelector(".output textarea");

	  o_node.value = "0";
	  this.s_result = true;
  	},

  	clearAll: function() {
		this.c_stack = [];
		this.t_operation = Operations.ADD;

		this.setOutputZero();
  	},

  	writeKey: function(key) {
  		var o_node = document.querySelector(".output textarea");
  		var k_val = key.getAttribute("value") || 0;

  		if(this.s_result === true) {
  			o_node.value = null;
  			this.s_result = false;
  		}

  		o_node.value = o_node.value + k_val.toString();
  	},

  	setOperation: function(key) {
  		var o_node = document.querySelector(".output textarea");
  		var k_val = key.getAttribute("value");

  		// Si estamos mostrando un resultado solo admitimos cambio de operacion
  		if(this.s_result === true) {
  			this.t_operation = Operations[k_val];
  			return;
  		}

  		// Agregamos un nuevo termino a la pila
  		this.add2stack(parseInt(o_node.value), this.t_operation);

  		// Mostramos el resultado
  		if(k_val == "equal" || this.c_stack.length > 1)
  			this.resolve();

  		// Si la tecla presionada es "Igual", no queremos cambiar el operando.
  		if(k_val == "equal")
  			return;

  		// Actualizamos el operando
  		this.t_operation = Operations[k_val];
		this.s_result = true;
  	},

  	add2stack: function(val, op) {
  		if(isNaN(val))
  			throw new TypeError("El valor no es un numero.");

  		this.c_stack.push({
  			operation: op,
  			value: val
  		});
  	},

  	resolve: function() {
  		var c_buffer = 0;
  		this.c_stack.forEach(function(term) {
	  		switch(term.operation) {
	  			case Operations.ADD:
	  			  c_buffer = calc_add(term.value, c_buffer);
	  			break;

	  			case Operations.SUSTRACT:
	  			  c_buffer = calc_sustract(term.value, c_buffer);
	  			break;

	  			case Operations.MULTIPLY:
	  			  c_buffer = calc_mux(term.value, c_buffer);
	  			break;

	  			case Operations.DIV:
	  			  c_buffer = calc_div(term.value, c_buffer);
	  			break;

	  			default:
	  			  // Predeterminado: Operations.ADD
	  			  c_buffer = calc_add(term.value, c_buffer);
	  			break;
	  		}
	  	});

  		// Por los momentos solo soportamos enteros
  		if(!c_buffer) {
  		  this.clearAll();
  		  this.printOutput("Error!");
  		}
  		else {
  		  this.printOutput(c_buffer.toFixed());
  		}
  	},

  	printOutput: function(val) {
  		var o_node = document.querySelector(".output textarea");

  		this.s_result = true;
  		o_node.value = val.toString();
  	}
  };

  /*
      Operaciones
  */
  	  window.calc_add = function(val, dest) {
  	  	dest += val;
  	  	if(isNaN(dest))
  	  		return false;
  	    return dest;
  	  };

  	  window.calc_sustract = function(val, dest) {
  	  	dest -= val;
  	  	if(isNaN(dest))
  	  		return false;
  	    return dest;
  	  };

  	  window.calc_mux = function(val, dest) {
  	  	dest *= val;
  	  	if(isNaN(dest))
  	  		return false;
  	    return dest;
  	  };

  	  window.calc_div = function(val, dest) {
  	  	dest /= val;
  	  	if(isNaN(dest))
  	  		return false;
  	    return dest;
  	  };

  /*
 	    Arranque
  */
  	  app.setEvs();
})();