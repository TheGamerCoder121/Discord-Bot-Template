const config = require('../config.json');
const MrGamerClient = require('./structures/MrGamerClient');

const client = new MrGamerClient(config);

client.start();