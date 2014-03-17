var annyang = require('../index');

annyang.init({
	'(testing) a command' : function() {
		console.log('this function will run when the trigger function is passed a matching initiation string');
	},

	'another command' : function() {
		console.log('this function will not run in this example');
	}
});

// pass the trigger function a string
annyang.trigger('testing a command');
