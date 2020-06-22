function setup(){
  var canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('p5_div')
  fill("#50505010")
  stroke("#50505030")
  strokeWeight(2)
  angleMode(RADIANS)

  bubbleSwarm = new BubbleSwarm(1000, 20, 50, canvas, 0.05, mouseX, mouseY, 200)
  bubbleSwarm.initilize()
}

function draw(){
  background(255)
  bubbleSwarm.updateCursor(mouseX, mouseY)
  bubbleSwarm.checkCursor()
  bubbleSwarm.show()
  bubbleSwarm.move()
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bubbleSwarm.clear()
    bubbleSwarm.initilize()
  }

// ----------------------------------------------------------------------------
class BubbleSwarm{
  constructor(n, rMin, rMax, canvas, velScaleMax, mouseX, mouseY, max_cur_dist){
    this.bubbles = [];
    this.n = n;
    this.rMin = rMin;
    this.rMax = rMax;
    this.velScaleMax = velScaleMax;
    this.canvas = canvas;
    this.pMouseX;
    this.pMouseY;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.max_cur_dist = max_cur_dist;
    this.cursorHasMoved = false;
  }

  initilize(){
    for (var i = 0; i < this.n; i++) {
        var x = random(this.canvas.width)
        var y = random(this.canvas.height)
        var r = random(this.rMin, this.rMax)
        // var vScale = random(0.05, this.velScaleMax)
        var vScale = this.velScaleMax
        var b = new Bubble(x, y, r, vScale)
        this.bubbles.push(b)
      }
  }

  show(){
    this.bubbles.forEach((b) => {
      b.show()
    })
  }

  updateCursor(mouseX, mouseY){
    console.log(this.cursorHasMoved);
    this.pMouseX = this.mouseX
    this.pMouseY = this.mouseY
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    if(this.pMouseX == this.mouseX && this.pMouseY == this.mouseY){
        this.cursorHasMoved = false
        return;
    }
    this.cursorHasMoved = true
  }

  checkCursor(){
    this.bubbles.forEach((b) => {
      var  d =  int(dist(b.x, b.y, this.mouseX, this.mouseY))
      if(d < this.max_cur_dist && this.cursorHasMoved){
        var dirArc = atan2(b.y-this.mouseY, b.x-this.mouseX) + TWO_PI
        b.nextPos_x = b.x + (cos(dirArc) * 100)
        b.nextPos_y = b.y + (sin(dirArc) * 100)
      }
      else{
        b.nextPos_x = b.startX
        b.nextPos_y = b.startY
      }
    })
  }

  move(){
    this.bubbles.forEach((b) => {
      b.move()
    })
  }

  clear(){
    this.bubbles = []
  }




}
// ----------------------------------------------------------------------------
class Bubble{
  constructor(x, y, r, vScale){
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.r = r;
    this.vScale = vScale;
    this.nextPos_x = x;
    this.nextPos_y = y;
  }

  show(){
    ellipse(this.x, this.y, this.r*2)
  }

  move(){
    this.x += (this.nextPos_x - this.x) * this.vScale
    this.y += (this.nextPos_y - this.y) * this.vScale
  }
}
