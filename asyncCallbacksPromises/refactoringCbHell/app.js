// CALLBACK HELL REFACTORED
const btn = document.querySelector('button');

const moveX = (element, amount, delay) => {
	return new Promise((resolve, reject) => {
		const screenWidth = document.body.clientWidth;
		const elRight = element.getBoundingClientRect().right;
		const currLeft = element.getBoundingClientRect().left;

		setTimeout(() => {
			// If trying to move off-screen, run fail function
			if (elRight + amount > screenWidth) {
				reject({ screenWidth, elRight, amount });
			} else {
				// If there's room to move, move and run success function
				element.style.transform = `translateX(${currLeft + amount}px)`;
				resolve();
			}
		}, delay);
	});
};

moveX(btn, 300, 1000)
	.then(() => moveX(btn, 300, 1000))
	.then(() => moveX(btn, 300, 1000))
	.then(() => moveX(btn, 300, 1000))
	.then(() => moveX(btn, 300, 1000))
	.then(() => console.log('Cool screen'))
	.catch(({ screenWidth, elRight, amount }) => {
		console.error(`Your window is ${screenWidth}px wide`);
		console.error(`Element is at ${elRight}px, ${amount}px more is too far`);
	});
