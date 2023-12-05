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
    wireframes: false,
    height: HEIGHT,
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
  if (pageX < (BORDER_WIDTH / 2) + staticFruit.circleRadius) {
    staticFruit.position.x = (BORDER_WIDTH / 2) + staticFruit.circleRadius;
  } else if (pageX > WIDTH - (BORDER_WIDTH / 2) - staticFruit.circleRadius) {
    staticFruit.position.x = WIDTH - (BORDER_WIDTH / 2) - staticFruit.circleRadius;
  } else {
    staticFruit.position.x = pageX;
  }
});

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


  setupStaticFruit(positionX);
}


function setupStaticFruit(positionX = WIDTH / 2) {
  if (staticFruit) {
    Composite.remove(engine.world, staticFruit);
  }
  staticFruit = currentFruit.body(positionX, STATIC_FRUIT_Y);
  staticFruit.isStatic = true;
  // make staticFruit impossible to touch other fruits
  staticFruit.collisionFilter = {
    mask: 0x0000,
  };
  // make it invisible for 0.5 second
  staticFruit.render.opacity = 0.2;
  setTimeout(function () {
    staticFruit.render.opacity = 1;
  }, 500);

  Composite.add(engine.world, staticFruit);
}

function setupNextFruit(positionX) {
  if (nextFruit) {
    Composite.remove(engine.world, nextFruit);
  }
  nextFruit = getRandomFruit();
  nextFruit = nextFruit.body(newPositionX, STATIC_FRUIT_Y);
  nextFruit.isStatic = true;
  Composite.add(engine.world, nextFruit);
}

// hide cursor when over canvas
render.canvas.addEventListener("mouseover", function () {
  render.canvas.style.cursor = "none";
});

// make a line on the top of the canvas, if fruits cross it, a popup will appear to inform the player that he lost and give the final score and a button to restart the game
// var line = Bodies.rectangle(WIDTH/2, 200, WIDTH, BORDER_WIDTH, {
//   isStatic: true,
//   render: { fillStyle: WALL_COLOR },
// });
// Composite.add(engine.world, line);

//when two fruits of the same type collide, they merge into the next type of fruit and the score is updated
Matter.Events.on(engine, "collisionStart", function (event) {
  var pairs = event.pairs;
  for (var i = 0, j = pairs.length; i != j; ++i) {
    var pair = pairs[i];
    if (pair.bodyA.plugin && pair.bodyB.plugin) {
      // check if the body plugin contains a fruit
      var fruitA = pair.bodyA.plugin.fruit;
      var fruitB = pair.bodyB.plugin.fruit;
      if (fruitA && fruitB) {
        // check if the fruits are the same type
        if (fruitA.type === fruitB.type) {
          // remove the fruits from the world
          Composite.remove(engine.world, pair.bodyA);
          Composite.remove(engine.world, pair.bodyB);
          // find the position of the two fruits when they collide
          var x = (pair.bodyA.position.x + pair.bodyB.position.x) / 2;
          var y = (pair.bodyA.position.y + pair.bodyB.position.y) / 2;
          // add the next fruit to the world
          var nextFruit = fruitA.next(x,y);
          Composite.add(engine.world, nextFruit);
          // update the score
          // score += fruitA.points + fruitB.points;
          // updateScoreView(score);
          // update the next fruit
          setNextFruit();
        }
      }
    }
  }
});

//Avoid the fruits to fall out of the canvas
Matter.Events.on(engine, "afterUpdate", function () {
  for (var i = 0; i < engine.world.bodies.length; i++) {
    var body = engine.world.bodies[i];
    if (body.position.y > HEIGHT + 100) {
      Composite.remove(engine.world, body);
    }
  }
});

function updateNextFruitView(nextFruit) {
  var nextFruitView = document.getElementById("nextFruit");
  nextFruitView.src = nextFruit.src;
}

function restart() {
  window.location.reload();
}
