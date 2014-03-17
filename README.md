*annyang-node!*
-----------------------------------------------

A javascript library for keyword based initiation of callback function.

This is a partial port of the amazing [annyang](https://github.com/TalAter/annyang) client side library by Tal Ater for Node.js.

Just like the client version, annyang has no dependencies and is free to use and modify under the MIT license.


Usage
-----
Just `require` the annyang library in your Node application, and define the commands you want.
````js
var annyang = require('annyang');

// Let's define a command.
var commands = {
	'show tps report': function() { 
		// do something 
	}
};

// Initialize our commands with annyang
annyang.init(commands);

// Trigger a command
annyang.trigger('show tps report');
````

For a full reference of how the keyword mathing works reference the official annyang site:
[https://www.talater.com/annyang/](https://www.talater.com/annyang/)

Author
------
Alan James: [alanjames1987@gmail.com](mailto:alanjames1987@gmail.com)

License
-------
Licensed under [MIT](https://github.com/alanjames1987/annyang-node/blob/master/LICENSE).