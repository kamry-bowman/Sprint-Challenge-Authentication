const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const configureRoutes = require('./config/routes');

const server = express();
server.use(morgan('combined'));

server.use(express.json());
server.use(cors({credentials: true, origin: 'http://localhost:3000' }));

configureRoutes(server);

module.exports = {
  server,
};
