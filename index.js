function annyang() {

	// Save a reference to the global object (window in the browser)
	var root = this;

	var commandsList = [];
	var callbacks = {
		start : [],
		error : [],
		end : [],
		result : [],
		resultMatch : [],
		resultNoMatch : [],
		errorNetwork : [],
		errorPermissionBlocked : [],
		errorPermissionDenied : []
	};
	var debugState = false;

	var optionalParam = /\s*\((.*?)\)\s*/g;
	var optionalRegex = /(\(\?:[^)]+\))\?/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g;

	var commandToRegExp = function(command) {

		command = command.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
			return optional ? match : '([^\\s]+)';
		}).replace(splatParam, '(.*?)').replace(optionalRegex, '\\s*$1?\\s*');

		return new RegExp('^' + command + '$', 'i');

	};

	// This method receives an array of callbacks to iterate over, and invokes each of them
	var invokeCallbacks = function(callbacks) {
		callbacks.forEach(function(callback) {
			callback.callback.apply(callback.context);
		});
	};

	// Initialize annyang with a list of commands to recognize.
	// e.g. annyang.init({'hello :name': helloFunction})
	// annyang understands commands with named variables, splats, and optional words.

	this.init = function(commands) {

		for (var phrase in commands) {
			if (commands.hasOwnProperty(phrase)) {

				cb = root[commands[phrase]] || commands[phrase];

				if ( typeof cb !== 'function') {
					continue;
				}

				//convert command to regex
				command = commandToRegExp(phrase);

				commandsList.push({
					command : command,
					callback : cb,
					originalPhrase : phrase
				});

			}
		}

	};

	this.trigger = function(commandText) {

		for (var j = 0, l = commandsList.length; j < l; j++) {
			var result = commandsList[j].command.exec(commandText);

			if (result) {
				var parameters = result.slice(1);
				if (debugState) {
					root.console.log('command matched: %c' + commandsList[j].originalPhrase, debugStyle);
					if (parameters.length) {
						root.console.log('with parameters', parameters);
					}
				}
				// execute the matched command
				commandsList[j].callback.apply(this, parameters);
				invokeCallbacks(callbacks.resultMatch);
				return true;
			}
		}

	};

};

module.exports = annyang;
