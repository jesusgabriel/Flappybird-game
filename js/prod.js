(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Scene(mw) {
  this.bg = document.getElementById('bg');
  this.xOffset = 0;
  this.maxWidth = mw;
}
Scene.prototype.update = function () {
  if (this.xOffset <= -450) this.xOffset = 0;
  this.xOffset--;
};

Scene.prototype.render = function (ctx) {
  ctx.drawImage(this.bg, this.xOffset, 0, 450, 600);

  for (var i = 0; i + this.xOffset <= this.maxWidth; i += 449) {
    ctx.drawImage(this.bg, i + this.xOffset, 0, 450, 600);
  }
};

exports.default = new Scene(1000);

},{}],2:[function(require,module,exports){
"use strict";

var _Scene = require("./Scene.js");

var _Scene2 = _interopRequireDefault(_Scene);

var _pajaro = require("./pajaro.js");

var _pajaro2 = _interopRequireDefault(_pajaro);

var _pipeGenerator = require("./pipeGenerator.js");

var _pipeGenerator2 = _interopRequireDefault(_pipeGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var pipes = [];

window.onload = function () {
  var player = new _pajaro2.default(150, 250);
  setInterval(_pipeGenerator2.default, 3000, pipes);
  function initGameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    _Scene2.default.update();
    _Scene2.default.render(ctx);
    player.update();
    player.render(ctx);
    pipes.forEach(function (pipe, i) {
      if (pipe.x < -pipe.width) {
        delete pipes[i];
      } else {
        pipe.update();
        pipe.render(ctx);
      }
    });
    window.requestAnimationFrame(initGameLoop);
  }

  initGameLoop();
};

},{"./Scene.js":1,"./pajaro.js":3,"./pipeGenerator.js":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Bird(x, y) {
  this.x = x;
  this.y = y;
  this.velY = 0;
  this.gravity = 1.5;
  this.sprites = [document.getElementById("bird1"), document.getElementById("bird2"), document.getElementById("bird3")];
  this.currentSprite = 0;
  this.updates = 0;
  this.initControls();
}

Bird.prototype.update = function () {
  this.updates++;
  if (this.updates % 18 === 0) {
    this.currentSprite = (this.currentSprite + 1) % this.sprites.length;
  }
  this.velY += this.gravity;
  this.y += this.velY;
};
Bird.prototype.render = function (ctx) {
  ctx.drawImage(this.sprites[this.currentSprite], this.x, this.y, 90, 64);
};
Bird.prototype.initControls = function () {
  var _this = this;

  window.addEventListener("keydown", function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 32) {
      _this.velY = -15;
    }
  });
  window.addEventListener("touchstart", function (e) {
    _this.velY = -20;
  });
};

exports.default = Bird;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Pipe(x, y, speed, width, height) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = width;
  this.height = height;
}
Pipe.prototype.update = function () {
  this.x -= this.speed;
};

Pipe.prototype.render = function (ctx) {
  ctx.save();
  ctx.fillStyle = "#00E800";
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.lineWidth = 10;
  ctx.strokeRect(this.x, this.y, this.width, this.height);
  ctx.restore();
};
exports.default = Pipe;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pipe = require("./pipe.js");

var _pipe2 = _interopRequireDefault(_pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generatePipe(pipes) {
  var heightTop = Math.random() * 200 + 100;
  var heightBottom = 600 - heightTop - 200;
  var pipeTop = new _pipe2.default(1000, 0, 3, 150, heightTop);
  var pipeBottom = new _pipe2.default(1000, 610 - heightBottom, 3, 150, heightBottom);
  pipes.push(pipeTop);
  pipes.push(pipeBottom);
}

exports.default = generatePipe;

},{"./pipe.js":4}]},{},[2]);
