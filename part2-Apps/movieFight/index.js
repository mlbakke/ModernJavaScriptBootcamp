const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '565268d9',
			s      : searchTerm
		}
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
	<label><b>Search for a Movie</b></label>
	<input class="input">
	<div class="dropdown">
		<div class="dropdown-menu">
			<div class="dropdown-content results"></div>
		</div>
	</div>
`;

const input = document.querySelector('.input');
const dropdown = document.querySelector('.dropdown');
const resultsWrap = document.querySelector('.results');

const onInput = async (e) => {
	const movies = await fetchData(e.target.value);

	//clear previous results
	resultsWrap.innerHTML = '';
	//open dropdown and add search results
	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const option = document.createElement('a');
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${imgSrc}" class="poster">
			${movie.Title}
		`;

		resultsWrap.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (e) => {
	if (!root.contains(e.target)) {
		dropdown.classList.remove('is-active');
	}
});
