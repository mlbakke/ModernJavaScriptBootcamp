const prom = fetch('https://swapi.dev/api/planets/')
	.then((response) => {
		if (!response.ok) {
			// throw error -> .catch runs with this as argument
			throw new Error(`Status code error: ${response.status}`);
		}
		response.json().then((data) => {
			for (let planet of data.results) {
				console.log(planet.name);
			}
		});
	})
	.catch((err) => {
		console.error('Fetch problem', err);
	});
