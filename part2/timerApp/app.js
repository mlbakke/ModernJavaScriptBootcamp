class Timer {
	constructor(durationInput, startBtn, pauseBtn) {
		this.durationInput = durationInput;
		this.startBtn = startBtn;
		this.pauseBtn = pauseBtn;

		this.startBtn.addEventListener('click', this.start);
		this.pauseBtn.addEventListener('click', this.pause);
		this.durationInput.addEventListener('change', this.onDurationChange);
	}

	start = () => {
		this.tick();
		this.interval = setInterval(this.tick, 1000);
	};
	pause = () => {
		clearInterval(this.interval);
	};
	onDurationChange = () => {
		console.log(this);
	};
	tick = () => {
		const timeRemaining = this.timeRemaining;
		if (timeRemaining >= 1) {
			// Count down 1s if timeRemaining >= 1
			this.timeRemaining = timeRemaining - 1;
		} else if (timeRemaining > 0 && timeRemaining < 1) {
			// If timeRemaining is between 0 and 1 round down to 0
			this.timeRemaining = parseInt(timeRemaining);
		} else {
			// Stop counting when timeRemaining = 0
			this.pause();
		}
	};
	get timeRemaining() {
		return parseFloat(this.durationInput.value).toFixed(2);
	}
	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}

const duration = document.querySelector('#duration');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const timer = new Timer(duration, start, pause);
