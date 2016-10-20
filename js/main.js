const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
import escena from "./Scene.js"
import Bird from "./pajaro.js"
import generatePipe from "./pipeGenerator.js"
const pipes = [];

window.onload = function(){
  let player = new Bird(150, 250);
  setInterval(generatePipe, 3000, pipes);
  function initGameLoop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    escena.update();
    escena.render(ctx);
    player.update();
    player.render(ctx);
    pipes.forEach(function(pipe, i) {
      if (pipe.x < -pipe.width){
        delete pipes[i]
      }
      else {
        pipe.update();
        pipe.render(ctx);
      }
    });
    window.requestAnimationFrame(initGameLoop);
}

initGameLoop();

}
