function setup(){
  var canvas = createCanvas(windowWidth, windowHeight)
  var bubbleCount = windowWidth*windowHeight*0.00003
  canvas.parent('p5_div')
  strokeWeight(2)

  bubbleSwarm = new BubbleSwarm(bubbleCount, 20, 30, canvas)
  bubbleSwarm.initilize()
  bubbleSwarm2 = new BubbleSwarm(bubbleCount, 20, 50, canvas)
  bubbleSwarm2.initilize()
  bubbleSwarm3 = new BubbleSwarm(bubbleCount, 30, 80, canvas)
  bubbleSwarm3.initilize()
}

function draw(){
  background(255)
  bubbleSwarm.update(mouseX, mouseY, "#50505010", "#ef476f20")
  bubbleSwarm2.update(mouseX, mouseY, "#50505010", "#ffd16620")
  bubbleSwarm3.update(mouseX, mouseY, "#50505010", "#06d6a020")
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bubbleSwarm.initilize()
    bubbleSwarm2.initilize()
    bubbleSwarm3.initilize()
  }
  function mouseReleased() {
    mouseX = null
    mouseY = null
  }
//-----------------------------------------------------------------------------
class BubbleSwarm{
  constructor(n, rMin, rMax, canvas){
    this.bubbles = [];
    this.n = n;
    this.rMin = rMin;
    this.rMax = rMax;
    this.canvas = canvas;
  }

  initilize(){
    this.clear()
    for (var i = 0; i < this.n; i++) {
        var x = random(this.canvas.width)
        var y = random(this.canvas.height)
        var r = random(this.rMin, this.rMax)
        var b = new Bubble(x, y, r)
        this.bubbles.push(b)
      }
  }

  update(mouseX,  mouseY, stroke, fill){
    this.canvas.stroke(stroke)
    this.canvas.fill(fill)

    this.bubbles.forEach((b) => {
      b.move(mouseX, mouseY)
      b.show(stroke, fill)
    })
  }

  clear(){
    this.bubbles = []
  }
}
//-----------------------------------------------------------------------------
class Bubble{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.startX = x;
    this.startY = y;
  }

  show(){
    ellipse(this.x, this.y, this.r*2)
  }

  move(mouseX, mouseY){
    angleMode(RADIANS)
    var  d =  int(dist(this.x, this.y, mouseX, mouseY))
    var curDistTollerance = this.r*5
    var speedScale = 1/this.r
      if(d < curDistTollerance){
        var dirArc = atan2(this.y-mouseY, this.x-mouseX) + TWO_PI
        this.x += (((cos(dirArc)  * curDistTollerance) + this.x) - this.x) * speedScale
        this.y += (((sin(dirArc)  * curDistTollerance) + this.y) - this.y) * speedScale
      }
      else{
        var px = this.x
        var py = this.y
        this.x += (this.startX - this.x) * speedScale
        this.y += (this.startY - this.y) * speedScale
        if(int(dist(this.x, this.y, mouseX, mouseY)) < curDistTollerance){
          this.x = px
          this.y = py
        }
      }
  }
}
