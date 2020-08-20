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

function fetchWeather(latitude = null, longitude = null, city = null) {
	const url =
		city == null
			? `/weather-from-geo?latitude=${latitude}&longitude=${longitude}`
			: `/weather-from-city?city=${city}`;

	try {
		fetch(url).then((res) => res.json()).then((data) => {
			title.innerHTML = data.region;
			message.innerHTML = `It's currently ${data.weatherDescription} in ${data.region}, with a temperature of ${data.currTemp} ºC.`;
			// Set image depending on the weather description (sunny, cloudy, rainy...)
			switch (data.weatherDescription) {
				case 'Sunny':
					weatherImage.src = '/img/sunny.png';
					break;
				case 'Overcast':
					weatherImage.src = '/img/overcast.png';
					break;
				case 'Cloudy':
					weatherImage.src = '/img/cloudy.png';
					break;
				case 'Partly cloudy':
					weatherImage.src = '/img/partly-cloudy.png';
					break;
				case 'Snowing':
					weatherImage.src = '/img/snowing.png';
					break;
				case 'Shower In Vicinity':
					weatherImage.src = 'img/rainy.png';
					break;
				case 'Raining':
					weatherImage.src = 'img/rainy.png';
					break;
				default:
					weatherImage.src = '/img/idk.gif';
					break;
			}
		});
	} catch (err) {
		message.innerHTML = 'There has been an error with your request. Please try again.';
	}
}
