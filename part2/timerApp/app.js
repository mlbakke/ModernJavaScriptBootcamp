const duration = document.querySelector('#duration');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');

const timer = new Timer(duration, start, pause, {
	onStart() {
		console.log('Timer started');
	},
	onTick() {
		console.log('Timer ticked');
	},
	onComplete() {
		console.log('Timer completed');
	}
});
