const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Import function to get current weather from latitude, longitude
const { getCurrentWeatherFromLatLon, getCurrentWeatherFromCity } = require('./middleware/weather');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location (hbs)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve (css, js, imgs...)
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App'
	});
});

app.get('/about', (req, res) => res.render('about'));
app.get('/about/*', (req, res) => res.render('404'));
app.get('/weather-from-geo', getCurrentWeatherFromLatLon, (req, res) => {
	res.send(req.data);
});

app.get('/weather-from-city', getCurrentWeatherFromCity, (req, res) => {
	res.send(req.data);
});

// Get 404s
app.get('*', (req, res) => res.render('404'));

app.listen(3000, () => {
	console.log('Server running on port 3000...');
});
