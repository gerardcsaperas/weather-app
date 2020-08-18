const path = require('path');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

// Handlebars (hbs)
app.set('view engine', 'hbs');

// Serve files from public
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Gerard'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help'
	});
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
	console.log('Server running on port 3000...');
});
