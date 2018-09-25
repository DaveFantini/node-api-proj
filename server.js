const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

//the nodemon package monitors all the project files
//and if one of them changes it restart the server
server.listen(port);

