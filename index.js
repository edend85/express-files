require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const DB = require('./utils/db');
const uploadImage = require('./uploadImage');


// Only for Dev
const db = new DB();

const port = process.env.PORT || 3000;
//creating server
let server = express();
server.use(express.json());
server.use(cors());

//creating routes
//1.users
server.use('/api/users', require('./routes/users.route'));


server.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image).then((url) => res.send(url)).catch((err) => res.status(500).send(err));
});

//2.reports
server.use('/api/reports', require('./routes/reports.route'));


//3.info
server.use('/api/info', require('./routes/info.route'));


//turn server
server.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


