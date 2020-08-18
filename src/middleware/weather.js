require('dotenv').config();
const request = require('request');
WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// desc.    Provided latitude, longitude and location
//          from a data object, returns the current weather
//          in a location.
const getCurrentWeather = (req, res, next) => {
	const { latitude, longitude } = req.query;

	const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${latitude},${longitude}`;

	request({ url: url, json: true }, (err, res, body) => {
		if (err) throw err;
		if (body.error) return console.log(body.error.info);

		const weatherDescription = body.current.weather_descriptions[0];
		const currTemp = body.current.temperature;
		const region = body.location.region;

		const response = {
			weatherDescription,
			currTemp,
			region
		};

		req.data = response;
		next();
	});
};

module.exports = getCurrentWeather;
