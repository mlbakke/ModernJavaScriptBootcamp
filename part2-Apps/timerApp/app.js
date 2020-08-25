const duration = document.querySelector('#duration');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const circle = document.querySelector('.svg__circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let startDuration;

const timer = new Timer(duration, start, pause, {
	onStart(totalDuration) {
		startDuration = totalDuration;
	},
	onTick(timeRemaining) {
		circle.setAttribute('stroke-dashoffset', 
			(perimeter * timeRemaining) / startDuration - perimeter
		);
	},
	onComplete() {
		console.log('Timer completed');
	}
});