function Bird(x,y) {
  this.x = x;
  this.y = y;
  this.velY =0;
  this.gravity = 1.5;
  this.sprites = [document.getElementById("bird1"),
                  document.getElementById("bird2"),
                  document.getElementById("bird3")];
  this.currentSprite = 0;
  this.updates = 0;
  this.initControls();
}

Bird.prototype.update = function(){
  this.updates++;
  if (this.updates % 18 === 0) {
    this.currentSprite = (this.currentSprite+1) % this.sprites.length;
  }
  this.velY += this.gravity;
  this.y += this.velY;

};
Bird.prototype.render = function(ctx){
  ctx.drawImage(this.sprites[this.currentSprite], this.x, this.y, 90, 64);
};
Bird.prototype.initControls = function(){
  window.addEventListener("keydown", (e)=>{
    console.log(e.keyCode);
    if (e.keyCode === 32){
        this.velY = -15;
    }
  });
  window.addEventListener("touchstart", e=>{
    this.velY = -20;
  });
};

export default Bird;
