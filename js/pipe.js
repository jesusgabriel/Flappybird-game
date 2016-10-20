function Pipe(x, y, speed, width, height) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width= width;
  this.height = height;
}
Pipe.prototype.update = function(){
  this.x -= this.speed;
}

Pipe.prototype.render = function(ctx){
  ctx.save();
  ctx.fillStyle = "#00E800";
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.lineWidth = 10;
  ctx.strokeRect(this.x, this.y, this.width, this.height);
  ctx.restore();
}
  export default Pipe;
