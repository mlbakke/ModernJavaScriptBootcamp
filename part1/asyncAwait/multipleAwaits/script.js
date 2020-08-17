const btn = document.querySelector('button');
const moveX = (element, amount, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const screenWidth = document.body.clientWidth;
			const elRight = element.getBoundingClientRect().right;
			const currLeft = element.getBoundingClientRect().left;
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

async function moveRight(el, amt) {
	for (let i = 0; i < 10; i++) {
		await moveX(el, amt, 1000);
	}
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
	// await moveX(el, amt, 1000);
}

moveRight(btn, 100).catch((e) => {
	console.log('All out of space!');
});
