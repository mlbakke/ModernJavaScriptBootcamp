// We can catch inside async/await function
async function getPlanets() {
	try {
		const res = await axios.get('https://swapi.dev/api/planets/');
		//does not run until promise above is resolved / data is fetched
		console.log(res.data);
	} catch (e) {
		console.log('Fetch error', e);
	}
}

getPlanets();

// Or we can call with a .catch later
// async function getPlanets() {
// 	const res = await axios.get('https://swapi.dev/api/planets/');
// 	console.log(res.data);
// }

// getPlanets().catch((e) => {
// 	console.log('Fetch error', e);
// });
