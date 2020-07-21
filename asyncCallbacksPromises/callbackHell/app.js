const btn = document.querySelector('button');

const moveX = (element, amount, delay, onSuccess, onFail) => {
	const screenWidth = document.body.clientWidth;
	const elRight = element.getBoundingClientRect().right;
	const currLeft = element.getBoundingClientRect().left;

	setTimeout(() => {
		if (elRight + amount > screenWidth) {
			onFail();
		} else {
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
		moveX(
			btn,
			300,
			1000,
			() => {
				moveX(
					btn,
					300,
					1000,
					() => {
						moveX(
							btn,
							300,
							1000,
							() => {
								moveX(
									btn,
									300,
									1000,
									() => {
										alert('Cool screen, dude');
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
	},
	() => {
		alert('You are out of room');
	}
);
