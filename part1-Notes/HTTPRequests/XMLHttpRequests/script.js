const firstReq = new XMLHttpRequest();

firstReq.addEventListener('load', function() {
	console.log('first request worked');
	const data = JSON.parse(this.responseText);
	const filmURL = data.results[0].films[0];

	const filmReq = new XMLHttpRequest();
	filmReq.addEventListener('load', function() {
		console.log('film request worked');
		const filmData = JSON.parse(this.responseText);
		console.log(filmData);
	});
	filmReq.addEventListener('error', function(e) {
		console.error('Error!!', e);
	});
	filmReq.open('GET', filmURL);
	filmReq.send();

	// for (let planet of data.results) {
	// 	console.log(planet.name);
	// }
});
firstReq.addEventListener('error', () => {
	console.error('Error!!');
});

firstReq.open('get', 'https://swapi.dev/api/planets/');

firstReq.send();
