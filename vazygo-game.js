// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// colors
const GAME_BACKGROUND_COLOR = 'assets/nerf.png';
const BLACK = "#000000";
const WIDTH = 600;
const HEIGHT = 900;
const BORDER_WIDTH = 5;
const CIRCLE_RADIUS = 20;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: WIDTH,
    height: 900,
    wireframes: false,
    background: GAME_BACKGROUND_COLOR,
  },
});

// walls
var ground = Bodies.rectangle(WIDTH/2, HEIGHT, HEIGHT, BORDER_WIDTH, {
  isStatic: true,
  render: { fillStyle: BLACK },
});
var wallLeft = Bodies.rectangle(0, HEIGHT/2, BORDER_WIDTH, HEIGHT, {
  isStatic: true,
  render: { fillStyle: BLACK },
});
var wallRight = Bodies.rectangle(WIDTH, HEIGHT/2, BORDER_WIDTH, HEIGHT, {
  isStatic: true,
  render: { fillStyle: BLACK },
});

// add all of the bodies to the world
Composite.add(engine.world, [
  ground,
  wallLeft,
  wallRight,
]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// when click on the canvas add a new circle falling from the top
render.canvas.addEventListener("click", function (event) {
  var x = event.pageX - render.canvas.getBoundingClientRect().left;
  var circle = Bodies.circle(x, 0, CIRCLE_RADIUS, {
    render: {
      sprite: {
        texture: "./assets/fruit_a.png",
        xScale: CIRCLE_RADIUS / 120,
        yScale: CIRCLE_RADIUS / 120,
      },
    },
  });
  Composite.add(engine.world, circle);
});

// if two circle collide, make them merge and grow from half their radius
Matter.Events.on(engine, "collisionStart", function (event) {
  var pairs = event.pairs;
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    if (pair.bodyA.label === "Circle Body" && pair.bodyB.label === "Circle Body") {
      var newRadius = (pair.bodyA.circleRadius + pair.bodyB.circleRadius);
      var newCircle = Bodies.circle(
        (pair.bodyA.position.x + pair.bodyB.position.x) / 2,
        (pair.bodyA.position.y + pair.bodyB.position.y) / 2,
        newRadius,
        {
          // set image fruit_a.png as texture with the right scale and rounded image
          render: {
            sprite: {
              texture: "./assets/fruit_a.png",
              xScale: newRadius / 120,
              yScale: newRadius / 120,
            },
          },
        }
      );
      Composite.remove(engine.world, pair.bodyA);
      Composite.remove(engine.world, pair.bodyB);
      Composite.add(engine.world, newCircle);
    }
  }
});
