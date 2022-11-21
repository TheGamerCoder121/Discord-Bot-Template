const backend = require('./structures/backend.js');
const config = require('../config.json');
const MrGamerClient = require('./structures/MrGamerClient');

const client = new MrGamerClient(config);

backend.init();
client.start();