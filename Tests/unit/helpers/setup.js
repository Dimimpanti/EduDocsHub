const http = require('http');
const got = require('got');
const app = require('../../../index.js');

//Setup a local server to perform the unit-testing
async function setup(t) {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        prefixUrl: `http://localhost:${port}`,
        responseType: 'json',
    });
}

// Teardown the server and release the port after tests are finished
function teardown(t) {
    t.context.server.close();
}

// Export the setup and teardown functions for use in tests
module.exports = { setup, teardown };