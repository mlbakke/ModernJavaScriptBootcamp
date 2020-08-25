class Timer {
	constructor(durationInput, startBtn, pauseBtn, callbacks) {
		this.durationInput = durationInput;
		this.startBtn = startBtn;
		this.pauseBtn = pauseBtn;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}

		this.startBtn.addEventListener('click', this.start);
		this.pauseBtn.addEventListener('click', this.pause);
		this.durationInput.addEventListener('change', this.onDurationChange);
	}

	start = () => {
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}
		this.tick();
		this.interval = setInterval(this.tick, 10);
	};
	pause = () => {
		clearInterval(this.interval);
	};
	onDurationChange = () => {
		console.log(this);
	};
	tick = () => {
		const timeRemaining = this.timeRemaining;
		if (timeRemaining > 0) {
			this.timeRemaining = timeRemaining - .01;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		} else {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		}
	};
	get timeRemaining() {
		return parseFloat(this.durationInput.value).toFixed(2);
	}
	set timeRemaining(time) {
		//parseFloat(n.toFixed(2)) => max 2 digits, removes trailing 0
		this.durationInput.value = time.toFixed(2);
	}
}
