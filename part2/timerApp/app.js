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
		console.log(this);
	};
	pause = () => {
		console.log(this);
	};
	onDurationChange = () => {
		console.log(this);
	};
	tick = () => {
		console.log(this);
	};
}

const duration = document.querySelector('#duration');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const timer = new Timer(duration, start, pause);
