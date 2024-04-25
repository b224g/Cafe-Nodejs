/*require('dotenv').config();

const http = require('http');
const app = require('./index');

const server = http.createServer(app);
server.listen(process.env.PORT);
 */

require('dotenv').config();

const http = require('http');
const app = require('./index');

const port = process.env.PORT || 8080; // Use port 8080 as default if PORT is not defined

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});