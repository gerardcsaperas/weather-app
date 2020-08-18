// Get location of the user
function getLocation() {
	if (navigator.geolocation) {
		// 1. Get current position and set latitude and longitude accordingly
		navigator.geolocation.getCurrentPosition((data) => {
			const { latitude, longitude } = data.coords;

			fetch(`/geo?latitude=${latitude}&longitude=${longitude}`)
				.then((res) => res.json())
				.then((data) => console.log(data));
		});
	} else {
		x.innerHTML = 'Geolocation is not supported by this browser.';
	}
}

getLocation();

// fetch('/example').then((res) => res.json().then((data) => console.log(data)));
