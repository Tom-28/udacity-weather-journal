// object as endpoint for all routes
projectData = {};

// requiringxpress to run server and routes
const express = require('express')
const app = express()

//configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// initialize website as the main project folder
app.use(express.static('website'));

// setup Server
const port = 8000;
const server = app.listen(port, listening);

// confirm server is running
function listening() {
	console.log(`running on localhost: ${port}`)
};

//GET route
app.get('/all', function (req, res) {
	res.send(projectData);
});

// POST route
app.post('/add', (req, res) => {
	console.log(req.body);
	newData = {
		temperature: req.body.temp,
		date: req.body.date,
		content: req.body.newResponse
	}
	Object.assign(projectData, newData);
})