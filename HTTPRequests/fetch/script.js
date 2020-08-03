const checkStatusAndParse = (response) => {
	if (!response.ok) {
		// throw error -> .catch runs with this as argument
		throw new Error(`Status code error: ${response.status}`);
	}
	// Return promise:
	// avoids having to nest chained promises
	return response.json();
};

const printPlanets = (data) => {
	console.log('%cLoaded 10 planets', 'color: rgb(0, 124, 0)');
	for (let planet of data.results) {
		console.log(planet.name);
	}
	// Return promise to keep chaining promises
	return Promise.resolve(data.next);
};

const fetchNextPlanets = (url = 'https://swapi.dev/api/planets/') => {
	// fetch = promise - can now add another .then
	// 	looking into the next page from our API
	// First page set as default for first time promise runs
	return fetch(url);
};

// Fetches first three pages of planets, we could keep chaining
//	to fetch more planets if we wanted
fetchNextPlanets()
	.then(checkStatusAndParse)
	.then(printPlanets)
	.then(fetchNextPlanets)
	.then(checkStatusAndParse)
	.then(printPlanets)
	.then(fetchNextPlanets)
	.then(checkStatusAndParse)
	.then(printPlanets)
	.catch((err) => {
		console.error('Fetch problem', err);
	});
