const btn = document.querySelector('.btn');
const screenW = window.innerWidth;
const screenH = window.innerHeight;

btn.addEventListener('mouseover', function() {
	const x = Math.floor(Math.random() * screenW);
	const y = Math.floor(Math.random() * screenH);
	btn.style.transform = `translate(${x}px, ${y}px)`;
});

btn.addEventListener('click', buttonHit);

function buttonHit(e) {
	if (e.screenX == 0 && e.screenY == 0) {
		// If button is hit with shift+enter
		btn.textContent = `That's cheating! Congratulations, you rigged the system!`;
		btn.style.transform = `translate(0px, 0px)`;
		btn.style.backgroundColor = 'green';
		btn.style.color = 'white';
	} else {
		// If mouseclicked
		btn.textContent = 'You madman! You actually did it!';
		btn.style.transform = `translate(0px, 0px)`;
		btn.style.backgroundColor = 'green';
		btn.style.color = 'white';
	}
}
