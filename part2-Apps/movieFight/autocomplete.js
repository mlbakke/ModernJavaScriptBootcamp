const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue }) => {
	root.innerHTML = `
        <label><b>Search for a Movie</b></label>
        <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

	const input = root.querySelector('.input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrap = root.querySelector('.results');

	const onInput = async (e) => {
		const results = await fetchData(e.target.value);
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
		if (!results.length) {
			resultsWrap.innerHTML = 'Sorry, no results found.';
			return;
		}
		//If results
		for (let result of results) {
			const option = document.createElement('a');

			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(result);
			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(result);
				onOptionSelect(result);
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
};
