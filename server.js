const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const UserRoutes = require('./users/users-routes');
const AuthRoutes = require('./auth/auth-routes');
const restriction = require('./auth/restriction-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/restricted', restriction, AuthRoutes);
server.use('/api', UserRoutes);

server.get('*', (req, res) => {
    res.status(200).json({message: 'Welcome! You\'ve safely landed'});
})

module.exports = server;
