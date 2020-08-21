require('dotenv').config();
const request = require('request');
WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// desc.    Provided latitude, longitude
//          from a data object, returns the current weather
//          in a location.
const getCurrentWeatherFromLatLon = (req, res, next) => {
	const { latitude, longitude } = req.query;

	const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${latitude},${longitude}`;

	request({ url: url, json: true }, (err, res, body) => {
		if (err) throw err;
		if (body.error) {
			req.data = body.error;
			next();
		} else {
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
		}
	});
};

// desc.    Provided a city name, returns the
// 			current weather in a location.
const getCurrentWeatherFromCity = (req, res, next) => {
	const { city } = req.query;

	const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${city}`;

	request({ url: url, json: true }, (err, res, body) => {
		if (err) throw err;
		if (body.error) {
			req.data = body.error;
			next();
		} else {
			const weatherDescription = body.current.weather_descriptions[0];
			const currTemp = body.current.temperature;
			const region = body.location.name;

			const response = {
				weatherDescription,
				currTemp,
				region
			};

			req.data = response;
			next();
		}
	});
};

module.exports = {
	getCurrentWeatherFromLatLon,
	getCurrentWeatherFromCity
};
