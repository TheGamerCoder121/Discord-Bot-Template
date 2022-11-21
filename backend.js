/* eslint-disable no-unused-vars */
require('hyperz-verbatim').setExtension('.gamer');
const figlet = require('figlet');
const chalk = require('chalk');
const axios = require('axios');
const pjson = require('./package.json');
const config = require('./config.json');
const os = require('os');

async function init() {
	if (Number(process.version.slice(1).split('.')[0] < 16)) throw new Error('Node.js v16 or higher is required, Discord.JS relies on this version, please update @ https://nodejs.org');
	// require('./licenseService.gamer')(config.licenseKey, 'DtvrGSM82nS76P', { log: true });
	// eslint-disable-next-line no-undef
	const font = await maths(['Graffiti', 'Standard', 'Stop', 'Slant', 'Pagga', 'Larry 3D']);
	figlet.text('Listing Bot', { font: font, width: 700 }, function(err, data) {
		if (err) throw err;
		const str = `${data}\n-------------------------------------------`;
		console.log(chalk.bold(chalk.blueBright(str)));
		console.log(`${chalk.hex('#004892').bold('👋 Hello!')} This bot was created by Mr.Gamer#2222`);
		console.log(`${chalk.cyan('[STORE]')} https://mrgamer.xyz/store`);
	});
	console.clear();
	setTimeout(async () => {
		const currver = pjson.version;
		const request = await axios({
			method: 'get',
			url: 'https://raw.githubusercontent.com/TheGamerCoder121/version-pub-api/main/versions.json',
			headers: { Accept: 'application/json, text/plain, */*', 'User-Agent': '*' },
		});
		const latestver = request.data.boards;
		if (latestver != currver) {
			console.log(`${chalk.yellow('[Version Checker]')} ${chalk.red(`You are not on the latest version.\nCurrent Version: ${currver}\nLatest Version: ${latestver}`)}`);
		}
		else {
			console.log(`${chalk.green('[Version Checker]')} You are on the latest version.`);
		}
	}, 100);
}
async function maths(array) {
	const bruh = array[Math.floor(array.length * Math.random())];
	return bruh;
}

module.exports = {
	init: init,
	maths: maths,
};