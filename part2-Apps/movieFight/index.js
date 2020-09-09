const autoCompleteConfig = {
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
			<img src="${imgSrc}">
			${movie.Title} (${movie.Year})
		`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
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
	}
};

// Create two autocomplete widgets, show results in dropdown
createAutocomplete({
	...autoCompleteConfig,
	root           : document.querySelector('#left-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	}
});

createAutocomplete({
	...autoCompleteConfig,
	root           : document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	}
});

// When a movie is selected from dropdown menu, show movie details
let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, placement, side) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '565268d9',
			i      : movie.imdbID
		}
	});
	placement.innerHTML = movieTemplate(response.data);

	if (side === 'left') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}

	//Check that two movies has been selected, then run comparison
	if (leftMovie && rightMovie) {
		runComparison();
	}
};

const runComparison = () => {
	const leftStats = document.querySelectorAll('#left-summary .notification');
	const rightStats = document.querySelectorAll('#right-summary .notification');

	leftStats.forEach((leftStat, index) => {
		const rightStat = rightStats[index];
		const leftValue = leftStat.dataset.value;
		const rightValue = rightStat.dataset.value;
		if (leftValue < rightValue) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		} else {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
		}
	});
};

const movieTemplate = (movieDetails) => {
	const boxOffice = parseInt(movieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = parseInt(movieDetails.Metascore);
	const imdbRating = parseFloat(movieDetails.imdbRating);
	const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ''));

	//Split text, reduce to sum of number
	const awards = movieDetails.Awards.split(' ').reduce((prev, word) => {
		//parseInt to get Nans and ints
		const value = parseInt(word);
		if (isNaN(value)) {
			return prev;
		} else {
			return prev + value;
		}
	}, 0);

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

		<article class="notification is-primary" data-value=${awards}>
			<p class="title">${movieDetails.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary" data-value=${boxOffice}>
			<p class="title">${movieDetails.BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article class="notification is-primary" data-value=${metascore}>
			<p class="title">${movieDetails.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary" data-value=${imdbRating}>
			<p class="title">${movieDetails.imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article class="notification is-primary" data-value=${imdbVotes}>
			<p class="title">${movieDetails.imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
};
