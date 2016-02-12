/* globals $l */
var View = require('./view.js');
var Board = require('./snake.js');

$l(function() {
  var $el = $l("ul");
  var board = new Board([0,0]);
  var view = new View(board, $el);
});
