const fetchNextPlanets = (url = 'https://swapi.dev/api/planets/') => {
	return axios.get(url);
};

const printPlanets = ({ data }) => {
	console.log('%cLoaded 10 planets', 'color: rgb(0, 124, 0)');
	for (let planet of data.results) {
		console.log(planet.name);
	}
	return Promise.resolve(data.next);
};

// With axios you:
//  1. don't have to parse JSON - it does it automatically
//  2. Don't have to weed out bad status codes - it catches it automatically
fetchNextPlanets()
	.then(printPlanets)
	.then(fetchNextPlanets)
	.then(printPlanets)
	.then(fetchNextPlanets)
	.then(printPlanets)
	.catch((err) => {
		console.log(err);
	});
