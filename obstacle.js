// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

/* Implements the features of the Car object from the processing version,
 * but renamed to reflect that the logs also use this object.
 *
 * x: x position of the obstacle
 * y: y position of the obstacle
 * w: Obstacle width
 * h: Obstacle height
 * s: x speed of the obstacle
 */
function Obstacle(x, y, w, h, s, i) {
  Rectangle.call(this, x, y, w, h);
  this.speed = s;
  this.inverted = i;

  const CARS = false;
  const LOGS = true;

  if (this.inverted === CARS) {
    this.textureIndex = floor(random(assets.cars[0].number))
    this.texture = s > 0 ? assets.cars[0].right[this.textureIndex]
                         : assets.cars[0].left[this.textureIndex]
  } else if (this.inverted === LOGS) {
    this.texture = assets.log
  }
}

// Extend Rectangle
Obstacle.prototype = Object.create(Rectangle.prototype);

// Move this obstacle by its speed, and wrap it if off the screen.
Obstacle.prototype.update = function() {
  this.move(this.speed, 0);
  if(this.x > width + grid_size) {
    this.x = - this.w - grid_size;
  }
  if(this.x < - this.w - grid_size) {
    this.x = width + grid_size;
  }
}

// Display this obstacle.
Obstacle.prototype.show = function() {
  fill(200);
  var it = Math.floor(this.w/grid_size);

  for (var i = 0; i < it; i++) {
    image(this.texture, this.x + i * grid_size, this.y, grid_size, this.h);
  }

}
