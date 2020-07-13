const form = document.querySelector('#form');
const cc = document.querySelector('#cc');
const terms = document.querySelector('#terms');
const veggies = document.querySelector('#veggies');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (!terms.checked) {
		alert('You need to accept our terms!');
		return;
	}
	console.log(cc.value);
	console.log(veggies.value);
});

const formData = {};
for (let input of [ cc, terms, veggies ]) {
	input.addEventListener('input', ({ target }) => {
		const { name, type, value, checked } = target;
		formData[name] = type === 'checkbox' ? checked : value;
	});
}
