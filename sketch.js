// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var frog;

var grid_size = 50;

var rows = [];

var assets = {}

const HIDEOUT = 0
const STREET = 1
const RIVER = 2

// Handles game reset if the frog dies, or at the initial load.
function resetGame() {
  frog = new Frog(width / 2, height - grid_size, grid_size);
}

// p5js setup function, ran on page load.
function setup() {
  width = 500;
  rows = [
    new Row(            0, 1,    0,         width,   0,   0, true, HIDEOUT),
    new Row(    grid_size, 1,    0,         width,   0,   0, true, HIDEOUT),
    new Row(2 * grid_size, 2,  0.5, 4 * grid_size, 400,  10, true, RIVER),
    new Row(3 * grid_size, 3, -1.3, 2 * grid_size, 200,  30, true, RIVER),
    new Row(4 * grid_size, 2,  2.3, 3 * grid_size, 250,  25, true, RIVER),
    new Row(5 * grid_size, 1,    0,         width,   0,   0, true, HIDEOUT),
    new Row(6 * grid_size, 3,  1.2, 1 * grid_size, 150, 100, false, STREET),
    new Row(7 * grid_size, 2, -3.5, 1 * grid_size, 200, 150, false, STREET),
    new Row(8 * grid_size, 2,    2, 2 * grid_size, 300,   0, false, STREET),
    new Row(9 * grid_size, 2,    0,         width,   0,   0, true, HIDEOUT),
  ];
  createCanvas(width, rows.length * grid_size);
  resetGame();
}

// p5js draw function, ran on every frame.
function draw() {
  background(0);
  fill(255, 100);

  var intersects = null;

  for(var i = 0; i < rows.length; i++) {
    rows[i].show();
    rows[i].update();
    if(frog.intersects(rows[i])) {
      intersects = rows[i].hits(frog);
      if((intersects !== null) ^ rows[i].inverted) {
        resetGame();
      }
    }
  }

  frog.attach(intersects);
  frog.update();
  frog.show();
}

// p5js key pressed function, runs when any key is pressed on the keyboard
// while the game is open.
function keyPressed() {
  if(keyCode === UP_ARROW) {
    frog.move(0, -grid_size);
  } else if(keyCode === DOWN_ARROW) {
    frog.move(0, grid_size);
  } else if(keyCode === LEFT_ARROW) {
    frog.move(-grid_size, 0);
  } else if(keyCode === RIGHT_ARROW) {
    frog.move(grid_size, 0);
  }
}

// p5js preload function, used to preload assets
function preload() {
  assets.cars = [
    {
      left: [
        loadImage('https://s3.postimg.org/xzutj848j/orange-left.png'),
        loadImage('https://s17.postimg.org/t130hmx4v/blue-left.png'),
        loadImage('https://s17.postimg.org/lmiqmdhkv/yellow-left.png')
      ],
      right: [
        loadImage('https://s3.postimg.org/crlqfjf5f/orange-right.png'),
        loadImage('https://s17.postimg.org/dtn0xa5a7/blue-right.png'),
        loadImage('https://s17.postimg.org/5pjypnp6n/yellow-right.png')
      ],
      number: 3
    }
  ];

  assets.log = loadImage('https://s8.postimg.org/6qi6auig5/logs.png');
  assets.frog = loadImage('https://s24.postimg.org/blvcnlbdh/frog.png');
}