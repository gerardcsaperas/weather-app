require('dotenv').config();
const request = require('request');
GEO_API_KEY = process.env.GEO_API_KEY;

// Function that returns coordinates
// desc.    Provide an address (can also be a city or country)
//          and the function will return the coordinates (long, lat)
//          of its center.
const addressToCoordinates = (address, callback) => {
	let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=${GEO_API_KEY}`;

	// Request data from geolocation API
	request(
		{
			url: url,
			json: true
		},
		(err, res, body) => {
			if (err) throw err;
			if (body.features.length === 0) return console.log('The query is empty. Double check your input.');

			// See https://docs.mapbox.com/api/search/#geocoding-response-object for more info
			const coordinates = body.features[0].center;

			// Set latitude and longitude for later pass to callback
			latitude = coordinates[1];
			longitude = coordinates[0];

			// Pass to callback
			callback({
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	);
};

module.exports = addressToCoordinates;
