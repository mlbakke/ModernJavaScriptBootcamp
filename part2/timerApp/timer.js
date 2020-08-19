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
			this.onStart();
		}
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
			if (this.onTick) {
				this.onTick();
			}
		} else if (timeRemaining > 0 && timeRemaining < 1) {
			// If timeRemaining is between 0 and 1 round down to 0
			this.timeRemaining = parseInt(timeRemaining);
			if (this.onTick) {
				this.onTick();
			}
		} else {
			// Stop counting when timeRemaining = 0
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
		this.durationInput.value = parseFloat(time.toFixed(2));
	}
}
