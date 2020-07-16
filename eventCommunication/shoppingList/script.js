const addItems = document.querySelector('#addItem');
const itemsUL = document.querySelector('.items');

addItems.addEventListener('keypress', function(e) {
	console.log(e);
	if (e.key === 'Enter') {
		//add item to list
		const newItemTxt = this.value;
		const newItem = document.createElement('li');
		newItem.innerText = newItemTxt;
		itemsUL.appendChild(newItem);
		//clear input field
		this.value = '';
	}
});
