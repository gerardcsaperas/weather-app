require('dotenv').config();
const request = require('request');
WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// desc.    Provided latitude, longitude and location
//          from a data object, returns the current weather
//          in a location.
const getCurrentWeather = ({ latitude, longitude, location } = {}) => {
	const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${latitude},${longitude}`;

	request({ url: url, json: true }, (err, res, body) => {
		if (err) throw err;
		if (body.error) return console.log(body.error.info);

		const weatherDescription = body.current.weather_descriptions[0];
		const currTemp = body.current.temperature;

		console.log(
			`It's currently ${weatherDescription} in ${location}, with a current temperature of is ${currTemp} ºC.`
		);
	});
};

module.exports = getCurrentWeather;
