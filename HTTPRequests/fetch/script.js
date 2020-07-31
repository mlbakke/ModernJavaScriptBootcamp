const prom = fetch('https://swapi.dev/api/planets/')
	.then((response) => {
		if (!response.ok) {
			// throw error -> .catch runs with this as argument
			throw new Error(`Status code error: ${response.status}`);
		}
		// Return promise:
		// avoids having to nest chained promises
		return response.json();
	})
	.then((data) => {
		console.log('Fetched planets');
		const filmUrl = data.results[0].films[0];
		// fetch - promise
		// can now add another .then
		return fetch(filmUrl);
	})
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Status code error: ${response.status}`);
		}
		// parse filmURL
		return response.json();
	})
	.then((data) => {
		console.log('Fetched first film, based off of first planet');
		console.log(data.title);
	})
	.catch((err) => {
		console.error('Fetch problem', err);
	});
