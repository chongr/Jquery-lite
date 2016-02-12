/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* globals $l */
	var View = __webpack_require__(2);
	var Board = __webpack_require__(1);
	
	$l(function() {
	  var $el = $l("ul");
	  var board = new Board([0,0]);
	  var view = new View(board, $el);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map