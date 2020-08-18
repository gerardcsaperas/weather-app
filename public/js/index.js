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

			fetch(`/weather-from-geo?latitude=${latitude}&longitude=${longitude}`)
				.then((res) => res.json())
				.then((data) => {
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
						case 'Snowing':
							weatherImage.src = '/img/snowing.png';
							break;
						default:
							weatherImage.src = '/img/idk.gif';
							break;
					}
				});
		});
	} else {
		message.innerHTML = 'Geolocation is not supported by this browser.';
	}
}

getLocation();

// fetch('/example').then((res) => res.json().then((data) => console.log(data)));
