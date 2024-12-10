const http = require('http');
const got = require('got');
const app = require('../../../index.js');

async function setup(t) {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        prefixUrl: `http://localhost:${port}`,
        responseType: 'json',
    });
}

function teardown(t) {
    t.context.server.close();
}

module.exports = { setup, teardown };