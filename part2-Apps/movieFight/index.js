const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '565268d9',
			s      : searchTerm
		}
	});
	console.log(response.data);
};

const input = document.querySelector('input');
let timeoutId;

const onInput = (e) => {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}

	timeoutId = setTimeout(() => {
		fetchData(e.target.value);
	}, 750);
};

input.addEventListener('input', onInput);
