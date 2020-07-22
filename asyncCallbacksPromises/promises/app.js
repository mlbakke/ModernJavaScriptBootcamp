//TUTORIAL PART
const willBuyDog = new Promise((resolve, reject) => {
	const rand = Math.random();
	if (rand < 0.5) {
		resolve();
	} else {
		reject();
	}
});

willBuyDog
	.then(() => {
		console.log('Congratulations on your new dog!');
	})
	.catch(() => {
		console.log('Sorry about the dog');
	});

// SELF-MADE EXERCISE
// CALLBACK HELL REDONE WITH PROMISES
const btn = document.querySelector('button');

const moveX = (element, amount, delay) => {
	return new Promise((onSuccess, onFail) => {
		const screenWidth = document.body.clientWidth;
		const elRight = element.getBoundingClientRect().right;
		const currLeft = element.getBoundingClientRect().left;

		setTimeout(() => {
			// If trying to move off-screen, run fail function
			if (elRight + amount > screenWidth) {
				onFail();
			} else {
				// If there's room to move, move and run success function
				element.style.transform = `translateX(${currLeft + amount}px)`;
				onSuccess();
			}
		}, delay);
	});
};

moveX(btn, 300, 1000)
	.then(() => moveX(btn, 300, 1000))
	.then(() => moveX(btn, 300, 1000))
	.then(() => moveX(btn, 300, 1000))
	.then(() => moveX(btn, 300, 1000))
	.then(() => moveX(btn, 300, 1000))
	.catch(() => {
		alert('You are out of room');
	});
