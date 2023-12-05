const DEFAULT_DENSITY = 0.001; // default 0.001
const DEFAULT_FRICTION = 0.1; // default 0.1

let cherry = {
  type: "cherry",
  color: "#ff0000",
  circleRadius: 25,
  points: 0,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return strawberry.body(x, y);
  },
}

let strawberry = {
  type: "strawberry",
  color: "#00ffff",
  circleRadius: 35,
  points: 1,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return grape.body(x, y);
  },
}
// grape
let grape = {
  type: "grape",
  color: "#6f2da8",
  circleRadius: 45,
  points: 4,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return apple.body(x, y);
  },
}
//orange
let apple = {
  type: "apple",
  color: "#d2691e",
  circleRadius: 50,
  points: 6,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return orange.body(x, y);
  },
}
//kaki
let orange = {
  type: "orange",
  color: "#ff9900",
  circleRadius: 70,
  points: 10,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return lemon.body(x, y);
  },
}
//apple
let lemon = {
  type: "lemon",
  color: "#7fff00",
  circleRadius: 85,
  points: 15,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return pear.body(x, y);
  },
}
//pear
let pear = {
  id: "pear",
  color: "#d0e429",
  circleRadius: 100,
  points: 21,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return peach.body(x, y);
  },
}
//peach
let peach = {
  type: "peach",
  color: "#ff1493",
  circleRadius: 120,
  points: 28,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return lemonade.body(x, y);
  },
}
//ananas
let lemonade = {
  type: "lemonade",
  color: "#ffff00",
  circleRadius: 140,
  points: 36,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return melon.body(x, y);
  },
}
//melon
let melon = {
  type: "melon",
  color: "#2f4f4f",
  circleRadius: 170,
  points: 45,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return watermelon.body(x, y);
  },
}
//watermelon
let watermelon = {
  type: "watermelon",
  color: "#f0b8b8",
  circleRadius: 200,
  points: 55,
  body: function(x, y) {
    return Bodies.circle(x, y, this.circleRadius, {
      render: { fillStyle: this.color, lineWidth: 3, strokeStyle: "#000000" },
      density: DEFAULT_DENSITY,
      friction: DEFAULT_FRICTION,
      plugin: {
        fruit: this,
      },
    });
  },
  next: function(x, y) {
    return cherry.body(x, y);
  },
}
