var Board = require('./snake.js');
// var Coord = require('./snake.js');
var $l = window.$l;
// var $l = require('../../jquery_lite.js');

function View (board, $el) {
  this.$el = $el;
  this.board = board;


  window.setInterval(function() {
    this.renderBoard();
    this.board.snake.move();
  }.bind(this),500);
}

View.prototype.renderBoard = function () {
  $l("li").remove();
  var ul = this.$el;
  var boardStored = this.board;
  this.board.grid.forEach( function(row, rowIdx) {
    row.forEach( function(col, colIdx) {
      var snake = boardStored.snake.segments;
      var li = document.createElement("li");
      var liNode = $l(li);
      liNode.attr("pos", rowIdx +", " + colIdx);
      for(var i = 0; i < snake.length; i++) {
        if (snake[i].equals([rowIdx, colIdx])) {
          liNode.addClass("snake");
        }
      }
      ul.append(liNode.array[0]);
    });
  });


};

module.exports = View;
