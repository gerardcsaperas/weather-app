const fetchWeather = require('./utils/fetchWeather');

// Get #response-box
const responseBox = document.getElementById('response-box');
// Get h1#location element
const title = document.getElementById('location');
// Get p#response element
const message = document.getElementById('message');
// Get img#weather-icon element
const weatherImage = document.getElementById('weather-image');

// Get location of the user
function getLocation() {
	if (navigator.geolocation) {
		// 1. Get current position and set latitude and longitude accordingly
		navigator.geolocation.getCurrentPosition((data) => {
			const { latitude, longitude } = data.coords;

			// 2. Make GET request based on geolocation info and set HTML content based on response
			fetchWeather(latitude, longitude);
		});
	} else {
		message.innerHTML = 'Geolocation is not supported by this browser.';
	}
}

// Call to getLocation as soon as the web loads
getLocation();

// Form handler
// Fetch weather API passing the city inputted in the request query
function weatherByCity(e) {
	e.preventDefault();

	const city = e.target.form[0].value;

	// 2. Make GET request based on city and set HTML content based on response
	fetchWeather(null, null, city);
}

// Add event listener to form's submit button
const submit = document.getElementById('submit');
submit.addEventListener('click', weatherByCity);
