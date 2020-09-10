const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width: width,
        height: height
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

const walls = [
    Bodies.rectangle((width/2), 0, width, 40, { isStatic: true}),
    Bodies.rectangle((width/2), height, width, 40, { isStatic: true}),
    Bodies.rectangle(0, (height/2), 40, height, { isStatic: true}),
    Bodies.rectangle(width, (height/2), 40, height, { isStatic: true})
];
World.add(world, walls);

//random shapes
for (let i = 0; i < 25; i++) {
    if (Math.random() > 0.5) {
        World.add( world, 
            Bodies.circle(Math.random() * width, Math.random() * height, 30, {
                render: {
                    fillStyle: 'rgb(110, 210, 70)'
                }
            })
        );
    } else {
        World.add( world, 
            Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {
                render: {
                    fillStyle: 'rgb(222, 55, 53)'
                }
            })
        );
    }
};