const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const width = 600;
const height = 600;

const gridCols = 3; //number of columns in maze-grid
const gridRows = 3; //number of rows in maze-grid

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		wireframes : true,
		width      : width,
		height     : height
	}
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
	world,
	MouseConstraint.create(engine, {
		mouse : Mouse.create(render.canvas)
	})
);

// Borders
const walls = [
	Bodies.rectangle(width / 2, 0, width, 25, { isStatic: true }),
	Bodies.rectangle(width / 2, height, width, 25, { isStatic: true }),
	Bodies.rectangle(0, height / 2, 25, height, { isStatic: true }),
	Bodies.rectangle(width, height / 2, 25, height, { isStatic: true })
];
World.add(world, walls);

// Maze generation
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
	// If I have visted the cell at [row, column], return
	// Mark cell as visited
	// Assemble randomly-ordered list of neighbours
	// For each neighbour:
	// -See if neighbour is out of bounds
	// -See if neighbour is visited, is so continue to next neighbour
	//Remove a wall from either horizontals or verticals
	//Go to cell
};

switchCell(startRow, startCol);