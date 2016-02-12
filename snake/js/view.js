var Board = require('./snake.js');
var $l = window.$l;
// var $l = require('../../jquery_lite.js');

function View (board, $el) {
  this.$el = $el;
  this.board = board;

  this.renderBoard();
}

View.prototype.renderBoard = function () {
  var ul = this.$el;
  this.board.grid.forEach( function(row, rowIdx) {
    row.forEach( function(col, colIdx) {
      var li = document.createElement("li");
      var liNode = $l(li);
      liNode.attr("pos", rowIdx +", " + colIdx);
      ul.append(liNode.array[0]);
    });
  });
};

module.exports = View;
