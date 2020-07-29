const firstReq = new XMLHttpRequest();

firstReq.addEventListener('load', function() {
	const data = JSON.parse(this.responseText);

	for (let planet of data.results) {
		console.log(planet.name);
	}
});
firstReq.addEventListener('error', () => {
	console.error('Error!!');
});

firstReq.open('get', 'https://swapi.dev/api/planets/');

firstReq.send();
