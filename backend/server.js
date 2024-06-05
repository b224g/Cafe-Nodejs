
require('dotenv').config();
const http = require('http');
const cors = require('cors'); 
const app = require('./index');

app.use(cors({
    origin: 'http://localhost:4200'
}));

const port = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
