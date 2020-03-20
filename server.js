// Server side code 

// Global Variables 
const servePort = 8000;
let projectData = {};

// set up required modules: express, body-parser, cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// set up server
app.use(express.static('website'));

const server = app.listen(servePort, _ => {
    console.log(`Running on:${servePort}`);
});

// set up post and get methods
app.get('/getData', (req, res) => {
    console.log(`Sending data: `, projectData);
    res.send(projectData);
});

app.post('/saveData', async (req, res) => {
    projectData = req.body;
    console.log(`Saved data: `, projectData);
});