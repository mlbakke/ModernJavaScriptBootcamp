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
	//Remove dropdown when input is empty
	if (e.target.value === '') {
		dropdown.classList.remove('is-active');
		return;
	}
	//Clear previous results
	resultsWrap.innerHTML = '';
	//Open dropdown and add search results
	dropdown.classList.add('is-active');
	//If no results
	if (!movies.length) {
		resultsWrap.innerHTML = 'Sorry, no results found.';
		return;
	}
	//If results
	for (let movie of movies) {
		const option = document.createElement('a');
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${imgSrc}" class="poster">
			${movie.Title}
		`;
		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie);
		});

		resultsWrap.appendChild(option);
	}
};

// Search for movies on input, .5s delay
input.addEventListener('input', debounce(onInput, 500));

// Remove dropdown when clicking outside of it
document.addEventListener('click', (e) => {
	if (!root.contains(e.target)) {
		dropdown.classList.remove('is-active');
	}
});

const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '565268d9',
			i      : movie.imdbID
		}
	});

	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetails) => {
	return `
		<article class="media">
			<figure class="media-left">
				<p class="image">
					<img src="${movieDetails.Poster}">
				</p>
			</figure>
			<div class="media-content">
				<div class="content">
					<h1>${movieDetails.Title}</h1>
					<h4>${movieDetails.Genre}</h4>
					<p>${movieDetails.Plot}</p>
				</div>
		</article>
	`;
};
