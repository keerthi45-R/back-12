const express = require('express'); // Use 'express' not 'sample'
const App_Server = express();       // Express app initialization

// Middleware to parse form data and JSON
App_Server.use(express.urlencoded({ extended: true }));
App_Server.use(express.json());

// Route setup
App_Server.use('/member', require('./Routers/addmemberrouter'));
App_Server.use('/diet', require('./Routers/dietplannerrouter'));
App_Server.use('/add', require('./Routers/addtainerrouter'));
App_Server.use('/allocate', require('./Routers/AllocateRouter'));

module.exports = App_Server;
