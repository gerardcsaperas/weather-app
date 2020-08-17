const path = require('path');
const express = require('express');

const app = express();

// Use the static path of our public folder for the app
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
	console.log('Server running on port 3000...');
});
