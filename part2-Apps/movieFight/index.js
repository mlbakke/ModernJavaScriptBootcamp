const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '565268d9',
			s      : 'avengers'
		}
	});
	console.log(response.data);
};
