export function fetchWeather(laitude = null, longitude = null, city = null) {
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
				case 'Snowing':
					weatherImage.src = '/img/snowing.png';
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
