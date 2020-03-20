// Client side code

// Global Variables - set up the OpenWeather API
const apiKey = '12519067d9a80da46f35d8e349bf4cab';
const apiUrl = (zip, apiKey) =>
      'https://api.openweathermap.org/data/2.5/weather' +
      `?zip=${zip},us&units=imperial&appid=${apiKey}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET method to query weather
const getWeather = async (owmUrl, zip, apiKey) => {
    const apiResponse = await fetch(owmUrl(zip, apiKey));
    try {
        const weather = await apiResponse.json();
        return weather;
    } catch (error) { console.log(`Failed to get weather: ${error}`) };
};

// POST method to backend server
const postData = async (url = '', data = {}) => {
    try {
	const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
		'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
	});
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch(error) {
	console.log("the error is", error);
	// appropriately handle the error
    }; 
};

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', ev => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    getWeather(apiUrl, zip, apiKey)
        .then(data => {
            postData('/saveData',
		     {zip: zip, userFeelings: feelings,
                      temperature: data.main.temp, date: newDate})
	})
        .then(res => updateUi()) // Apparently the res arg is needed
				 // for requests to happen in right order.11
	.catch(error => console.log(`error: ${error}`));   
});


// Helper function to update UI
const uiUpdateHelper = (id, data) =>{
    document.getElementById(id).innerHTML = data;
}

// Update UI function
const updateUi = async () => {
    const resp = await fetch('/getData');
    try {
        const savedData = await resp.json();
        uiUpdateHelper('date', savedData.date);
        uiUpdateHelper('temp', savedData.temperature);
        uiUpdateHelper('content', savedData.userFeelings);
    } catch (error) {
        presentErr(`Failed to update UI: ${error}`);
    }
};