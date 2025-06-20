const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./Database/Dbconfig');

const Http_Server = express();

Http_Server.use(express.json());
Http_Server.use(express.urlencoded({ extended: false }));
Http_Server.use(cors());

// Serve static images
const imagePath = path.join(process.cwd(), "Controllers","Data","image");
Http_Server.use('/member/Data/image/', express.static(imagePath));


// Test Route
Http_Server.get('/', (req, res) => {
  res.send(`Server is running..`);
});

// Server Listener
const PORT = process.env.PORT || 6000;
Http_Server.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});

// App routes
Http_Server.use('/', require('./app'));
