function Coord (rowColArray) {
  this.row = rowColArray[0];
  this.col = rowColArray[1];
}

Coord.prototype.plus = function (dir) {
  if (dir === 'E') {
    this.col += 1;
  } else if (dir === 'W') {
    this.col -= 1;
  } else if (dir === 'N') {
    this.row += 1;
  } else if (dir === 'S'){
    this.row -= 1;
  } else {
    console.log("invalid");
  }
};

Coord.prototype.equals = function (pos) {
  if (this.row === pos[0] && this.col === pos[1]) {
    return true;
  }
  return false;
};

function Snake(startArray) {
  this.direction = 'N';
  this.segments = [new Coord(startArray)];

}

Snake.prototype.turn = function(newDir) {
  this.direction = newDir;
};

Snake.prototype.move = function() {
  var snake = this;
  this.segments.forEach( function(el) {
    el.plus(snake.direction);
  });
};

function createGrid(rows, cols) {
  var grid = new Array(rows);
    for (var i = 0; i < rows; i ++) {
      grid[i] = [];
      for (var j = 0; j < cols; j ++) {
        grid[i][j] = " ";
      }
    }
  return grid;
}

function Board(startingPos) {
  this.grid = createGrid(100,100);
  this.snake = new Snake(startingPos);
}


module.exports = Board;
// module.exports = Coord;
