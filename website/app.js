// Client side code

// Global Variables - set up the OpenWeather API
const apiKey = '12519067d9a80da46f35d8e349bf4cab';
const apiUrl = (zip, apiKey) =>
      'https://api.openweathermap.org/data/2.5/weather' +
      `?zip=${zip},us&units=imperial&appid=${apiKey}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();