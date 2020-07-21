const btn = document.querySelector('button');

const moveX = (element, amount, delay, onSuccess, onFail) => {
	const screenWidth = document.body.clientWidth;
	const elRight = element.getBoundingClientRect().right;
	const currLeft = element.getBoundingClientRect().left;

	setTimeout(() => {
		// If trying to move off-screen, run fail function
		if (elRight + amount > screenWidth) {
			onFail();
		} else {
			// If there's room to move, move and run success function
			element.style.transform = `translateX(${currLeft + amount}px)`;
			onSuccess();
		}
	}, delay);
};

moveX(
	btn,
	300,
	1000,
	() => {
		//On success, run again (*4, total 5*300px jumps)
		moveX(
			btn,
			300,
			1000,
			() => {
				moveX(
					//On success, run again
					btn,
					300,
					1000,
					() => {
						moveX(
							//On success, run again
							btn,
							300,
							1000,
							() => {
								moveX(
									//On success, run again
									btn,
									300,
									1000,
									() => {
										//On last success, congrats
										alert('Cool screen, dude');
									},
									() => {
										// If not successful, alert
										alert('You are out of room');
									}
								);
							},
							() => {
								alert('You are out of room');
							}
						);
					},
					() => {
						alert('You are out of room');
					}
				);
			},
			() => {
				alert('You are out of room');
			}
		);
	},
	() => {
		alert('You are out of room');
	}
);
