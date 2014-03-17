var annyang = require('../index');

// Let's define a command.
var commands = {
	'show tps report': function() { // do something }
};

// Initialize our commands with annyang
annyang.init(commands);

// Trigger a command
annyang.trigger('show tps report');
