const axios = require('axios');
const chalk = require('chalk');

module.exports = function(licenseKey, uniqueId) {
	licenseCheck();
	async function licenseCheck() {

		// Initial Check
		const request = await axios({
			method: 'get',
			url: `https://store.mrgamer.xyz/api/v1/license/check/${licenseKey}`,
			headers: { Accept: 'application/json, text/plain, */*', 'User-Agent': '*', 'productid': uniqueId },
		});

		if (request.data.authorized) {
			console.log(`${chalk.green('[License Service]')} License ${chalk.green('successfully')} authenticated!`);
		}
		else {
			console.log(`${chalk.red('[License Service]')} Something went wrong while trying to authenticate your license.`);
			console.log(`${chalk.red('[ERROR]')} ${chalk.yellow(request.data.reason)}\n${chalk.blue.bold(`Requesting IP: ${request.data.requestingIp}`)}`);
			process.exit(1);
		}
	}
};