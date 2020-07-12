const player = document.querySelector('#player');
const coin = document.querySelector('#coin');

function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

window.addEventListener('keyup', function(e) {
	const currTop = extractPos(player.style.top);
	const currLeft = extractPos(player.style.left);
	switch (e.key.toLowerCase()) {
		case 'arrowup':
		case 'up':
		case 'w':
			player.style.top = `${currTop - 50}px`;
			break;
		case 'arrowdown':
		case 'down':
		case 's':
			player.style.top = `${currTop + 50}px`;
			break;
		case 'arrowleft':
		case 'left':
		case 'a':
			player.style.transform = 'scaleX(-1)';
			player.style.left = `${currLeft - 50}px`;
			break;
		case 'arrowright':
		case 'right':
		case 'd':
			player.style.transform = 'scaleX(1)';
			player.style.left = `${currLeft + 50}px`;
			break;
	}
	if (isTouching(player, coin)) moveCoin();
});

const extractPos = (pos) => {
	if (!pos) return 10;
	return parseInt(pos.slice(0, -2));
};

const moveCoin = () => {
	let y = Math.floor(Math.random() * window.innerHeight);
	let x = Math.floor(Math.random() * window.innerWidth);
	if (y > window.innerHeight - 100) {
		y -= 100;
	}
	if (x > window.innerWidth - 100) {
		x -= 100;
	}
	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;
};

moveCoin();
