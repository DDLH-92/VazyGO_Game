// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// colors
const GAME_BACKGROUND_COLOR = "#ffffff";
const WALL_COLOR = "#000000";
const WIDTH = 600;
const HEIGHT = 900;
const BORDER_WIDTH = 10;
const CIRCLE_RADIUS = 20;
const STATIC_FRUIT_Y = 100;
const FRUIT_DROP_Y = 150;

// create an engine
var engine = Engine.create();

let fruits = [];
let randomFruits = [];

let currentFruit = null;
let nextFruit = null;
let staticFruit = null;
let validRamdomFruits = [];

let lastClick = Date.now();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
    wireframes: false,
    background: GAME_BACKGROUND_COLOR,
  },
});

// walls
var ground = Bodies.rectangle(WIDTH/2, HEIGHT, HEIGHT, BORDER_WIDTH, {
  isStatic: true,
  render: { fillStyle: WALL_COLOR },
});
var wallLeft = Bodies.rectangle(0, HEIGHT/2, BORDER_WIDTH, HEIGHT, {
  isStatic: true,
  render: { fillStyle: WALL_COLOR },
});
var wallRight = Bodies.rectangle(WIDTH, HEIGHT/2, BORDER_WIDTH, HEIGHT, {
  isStatic: true,
  render: { fillStyle: WALL_COLOR },
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

start();
function start(){
  setupFruits();
  setupWalls(WALL_COLOR, BORDER_WIDTH, HEIGHT, WIDTH);
  setNextFruit();
}
render.canvas.addEventListener("mousemove", function (event) {
  let pageX = event.pageX - render.canvas.getBoundingClientRect().left;
staticFruit.position.x = pageX;});

// drop the fruit on click
render.canvas.addEventListener("click", function (event) {
  let pageX = event.pageX - render.canvas.getBoundingClientRect().left;
  if (Date.now() - lastClick > 500) {
    lastClick = Date.now();
    let fruit = currentFruit.body(pageX, FRUIT_DROP_Y);
    Composite.add(engine.world, fruit);
    setNextFruit(pageX);
  }
});


function setupFruits() {
  fruits = [
    cherry,
    strawberry,
    grape,
    apple,
    orange,
    lemon,
    pear,
    peach,
    lemonade,
    melon,
    watermelon
  ];
  validRamdomFruits = [
    cherry,
    strawberry,
    grape,
    apple,
    orange
  ]
}




function setupWalls(color, width, height, border_width) {
  ground = Bodies.rectangle(width/2, height, height, border_width, {
    isStatic: true,
    render: { fillStyle: color },
  });
  wallLeft = Bodies.rectangle(0, height/2, border_width, height, {
    isStatic: true,
    render: { fillStyle: color },
  });
  wallRight = Bodies.rectangle(width, height/2, border_width, height, {
    isStatic: true,
    render: { fillStyle: color },
  });

}

function getRandomFruit() {
  return validRamdomFruits[Math.floor(Math.random() * validRamdomFruits.length)];
}

function setNextFruit(positionX = WIDTH / 2) {
  currentFruit = nextFruit || getRandomFruit();
  nextFruit = getRandomFruit();

  // updateNextFruitView(nextFruit);

  setupStaticFruit(positionX);
}


function setupStaticFruit(positionX) {
  if (staticFruit) {
    Composite.remove(engine.world, staticFruit);
  }
  staticFruit = currentFruit.body(positionX, STATIC_FRUIT_Y);

  staticFruit.isStatic = true;

  Composite.add(engine.world, staticFruit);
}

// hide cursor when over canvas
render.canvas.addEventListener("mouseover", function () {
  render.canvas.style.cursor = "none";
});
