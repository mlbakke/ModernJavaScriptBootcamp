const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;
const gridCols = 12; //number of columns in maze-grid
const gridRows = 10; //number of rows in maze-grid

const unitLength = width / gridCols;
const unitHeight = height / gridRows;
const wallThickness = 1;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		wireframes : false,
		width      : width,
		height     : height
	}
});

Render.run(render);
Runner.run(Runner.create(), engine);

// BORDERS
const walls = [
	Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
	Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
	Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
	Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// MAZE GENERATION
const shuffle = (arr) => {
	let counter = arr.length;
	while (counter > 0) {
		const idx = Math.floor(Math.random() * counter);
		counter--;
		//Swap elements
		const temp = arr[counter];
		arr[counter] = arr[idx];
		arr[idx] = temp;
	}

	return arr;
};

// Create grid
const grid = Array(gridRows).fill(null).map(() => Array(gridCols).fill(false));
// Vertical & horizontal grid lines
const verticals = Array(gridRows).fill(null).map(() => Array(gridCols - 1).fill(false));
const horizontals = Array(gridRows - 1).fill(null).map(() => Array(gridCols).fill(false));
//Starting place for deleting walls in maze-generation algorithm
const startRow = Math.floor(Math.random() * gridRows);
const startCol = Math.floor(Math.random() * gridCols);
//Go from one cell to a neighbour in maze-generation algorithm
const switchCell = (row, column) => {
	// If current cell is visited(true), return
	if (grid[row][column]) {
		return;
	}
	// Mark cell as visited
	grid[row][column] = true;

	//Create array of neighbours and randomize order
	const neighbours = shuffle([
		[ row - 1, column, 'up' ],
		[ row, column + 1, 'right' ],
		[ row + 1, column, 'down' ],
		[ row, column - 1, 'left' ]
	]);

	// For each neighbour:
	for (let neighbour of neighbours) {
		const [ nextRow, nextColumn, direction ] = neighbour;
		// -See if neighbour is out of bounds
		if (nextRow < 0 || nextRow >= gridRows || nextColumn < 0 || nextColumn >= gridCols) {
			continue;
		}
		// -If neighbour is visited, continue to check next neighbour
		if (grid[nextRow][nextColumn]) {
			continue;
		}
		// -Remove a wall from either horizontals or verticals
		if (direction === 'left') {
			verticals[row][column - 1] = true;
		}
		else if (direction === 'right') {
			verticals[row][column] = true;
		}
		else if (direction === 'up') {
			horizontals[row - 1][column] = true;
		}
		else if (direction === 'down') {
			horizontals[row][column] = true;
		}

		//Go to next cell
		switchCell(nextRow, nextColumn);
	}
};
switchCell(startRow, startCol);

// DRAW MAZE

// Horizontal lines
horizontals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open === true) {
			return;
		}
		const wall = Bodies.rectangle(
			columnIndex * unitLength + unitLength / 2,
			rowIndex * unitHeight + unitHeight,
			unitLength,
			wallThickness,
			{
                label : 'wall',
                isStatic : true,
                render : {
                    fillStyle : '#DCCCFF'
                }
			}
		);

		World.add(world, wall);
	});
});

// Vertical lines
verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open === true) {
			return;
		}
		const wall = Bodies.rectangle(
			columnIndex * unitLength + unitLength,
			rowIndex * unitHeight + unitHeight / 2,
			wallThickness,
			unitHeight,
			{
                label : 'wall',
				isStatic : true,
                render : {
                    fillStyle : '#DCCCFF'
                }
			}
		);

		World.add(world, wall);
	});
});

// DRAW GOAL
const goal = Bodies.rectangle(
	width - unitLength / 2,
	height - unitHeight / 2,
	unitLength * 0.7,
	unitHeight * 0.7,
	{
		label    : 'goal',
		isStatic : true,
        render : {
            fillStyle : '#B80C09'
        }
	}
);

World.add(world, goal);

// BALL
// Draw
const ballRadius = Math.min(unitLength, unitHeight) / 4;
const ball = Bodies.circle(unitLength / 2, unitHeight / 2, ballRadius, {
	label : 'ball',
    render : {
        fillStyle : '#F6AA1C'
    }
});
World.add(world, ball);

// User controlled movement
document.addEventListener('keydown', (e) => {
    const { x, y } = ball.velocity;
    const maxVelocity = 15;
	if (e.keyCode === 87) {
		Body.setVelocity(ball, { x, y: Math.max(y - 5, -maxVelocity) });
	}
	if (e.keyCode === 68) {
		Body.setVelocity(ball, { x: Math.min(x + 5, maxVelocity), y });
	}
	if (e.keyCode === 83) {
		Body.setVelocity(ball, { x, y: Math.min(y + 5, maxVelocity) });
	}
	if (e.keyCode === 65) {
		Body.setVelocity(ball, { x: Math.max(x - 5, -maxVelocity), y });
	}
});

// WIN CONDITION
Events.on(engine, 'collisionStart', (e) => {
	e.pairs.forEach((collision) => {
		const labels = [ 'ball', 'goal' ];

		if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
			winAnimation();
		}
	});
});

// WIN ANIMATION
function winAnimation() {
    world.gravity.y = 1;
    world.bodies.forEach ((body) => {
        if (body.label === 'wall') {
            Body.setStatic(body, false);
        }
    })
    
    document.querySelector('.winner').classList.remove('hidden');
}