///// SEQUENTIAL REQUEST
// async function get3Pokemon() {
//// Each pokemon we get waits for the response from the last one
////	- Sequential.

// 	const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon/1/');
// 	const poke2 = await axios.get('https://pokeapi.co/api/v2/pokemon/2/');
// 	const poke3 = await axios.get('https://pokeapi.co/api/v2/pokemon/3/');
// 	console.log(poke1.data.name);
// 	console.log(poke2.data.name);
// 	console.log(poke3.data.name);
// }

///// PARALLEL REQUEST
// In the example the requests don't depend on each other,
//	so we could instead run them parallel
async function get3Pokemon() {
	// Because we don't await, we first store the promise itself,
	//	- NOT the resolved value
	const prom1 = axios.get('https://pokeapi.co/api/v2/pokemon/1/');
	const prom2 = axios.get('https://pokeapi.co/api/v2/pokemon/2/');
	const prom3 = axios.get('https://pokeapi.co/api/v2/pokemon/3/');
	// We fetch all three pokemons parallel with each other -
	//	THEN we make sure we have all of them before we continue.
	// We now store the resolved value with await as well
	// Slightly more code - but way faster
	const poke1 = await prom1;
	const poke2 = await prom2;
	const poke3 = await prom3;
	console.log(poke1.data.name);
	console.log(poke2.data.name);
	console.log(poke3.data.name);
}

get3Pokemon();
