// With axios you:
//  1. don't have to parse JSON - it does it automatically
//  2. Don't have to weed out bad status codes - it catches it automatically
axios
	.get('https://swapi.dev/api/planetsfeafea/')
	.then((res) => {
		console.log(res.data);
	})
	.catch((err) => {
		console.log(err);
	});
