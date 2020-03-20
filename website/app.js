// creating a date
let d = new Date();
let month = d.getMonth() + 1;
let newDate = d.getDate()+'.'+ month + '.'+ d.getFullYear();

// key and url for openweather api
let baseURL =  'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
const apiKey = '&APPID=bd13cd89e2841acdbab6011ea4942ce9'

// setting event listener to generate btn
document.getElementById('generate').addEventListener('click', performAction);

// callback function for event listener
function performAction(e) {
	const newZip = document.getElementById('zip').value;
	const newResponse = document.getElementById('feelings').value;
	
	getWeather(baseURL, newZip, apiKey)

	.then(function(data) {
		console.log(data)
		postData('/add', {date:newDate, temp:data.main.temp, newResponse})
	})
	.then(setTimeout(function() {
		updateUI();
		}, 700));
};

// get data from web api
const getWeather = async (baseURL, newZip, apiKey)=>{
  const res = await fetch(baseURL+newZip+apiKey)
  try {
    const data = await res.json();
    return data;
  }catch(error) {
    console.log("error", error);
  }
}

// post data to server
const postData = async (url = '', data = {})=> {
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),	
		});
	try {
		const newData = await response.json();
		console.log(newData);
	}catch(error) {
		console.log("error", error);
	}
}

// update UI
const updateUI = async () => {
	const request = await fetch('/all')
	try{
		const allData = await request.json();
		console.log(allData);
		document.getElementById('date').innerHTML = allData.date;
		document.getElementById('temp').innerHTML = allData.temperature;
		document.getElementById('content').innerHTML = allData.content;
	}catch(error) {
		console.log("error", error);
	}
}