const path = require('path');

const glob = require('glob');

const commandsPath = path.join(__dirname, '/../commands/');

glob(`${commandsPath}/**/*.js`, function(er, files) {
	console.log(files);
});