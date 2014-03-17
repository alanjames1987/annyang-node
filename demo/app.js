var annyang = require('../index');

// Let's define a command.
var commands = {
	'show tps report' : function() {
		// do something
	},
	'accept (a) query *query' : function(qurey) {
		console.log(qurey);
	}
};

// Initialize our commands with annyang
annyang.init(commands);

// Trigger a command
annyang.trigger('show tps report');
annyang.trigger('accept a query of something');
