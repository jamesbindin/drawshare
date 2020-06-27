var canvas;

// p5.js setup function, is called when page is ready, only once.
function setup(){
  pixelDensity(1)
  canvas = createCanvas(windowWidth, windowHeight)

  // scale ammount of bubbles according to screen size
  var bubbleCount = windowWidth*windowHeight*0.000050
  canvas.parent('p5_div')
  strokeWeight(2)

  bubbleSwarm = new BubbleSwarm(bubbleCount, 20, 30, canvas)
  bubbleSwarm.initilize(canvas)
  bubbleSwarm2 = new BubbleSwarm(bubbleCount, 20, 40, canvas)
  bubbleSwarm2.initilize(canvas)
  bubbleSwarm3 = new BubbleSwarm(bubbleCount, 30, 40, canvas)
  bubbleSwarm3.initilize(canvas)
}

// p5.js draw function, called every time the screen is refreshed. the screen
// was cleared and the bubbles were redrawn on every itteration.
function draw(){
  background(255)
  bubbleSwarm.update(mouseX, mouseY, "#50505010", "#ef476f20")
  bubbleSwarm2.update(mouseX, mouseY, "#50505010", "#ffd16620")
  bubbleSwarm3.update(mouseX, mouseY, "#50505010", "#06d6a020")
}

// redraws canvas when screen is resized, re initilises bubbles
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    bubbleSwarm.initilize()
    bubbleSwarm2.initilize()
    bubbleSwarm3.initilize()
  }

// Listen for orientation changes reverse dimentions of canvas when rotated
window.addEventListener("orientationchange", function() {
    if (window.orientation == 90) {
      resizeCanvas(height, width)
    }
    else if(window.orientation == 0){
      resizeCanvas(height, width)
    }
}, false);

$("#p5_div").bind('touchend', (e)=>{
  mouseX = null
  mouseY = null
  return false
})

//-----------------------------------------------------------------------------
// The BubbleSwarm class is generating bubbles given the number n, radius min
// and max as well as colour. It has a list of bubbles which it can clear,
// initilize. It also updates the bubbles, giving them the cursor position.
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

  update(mouseX, mouseY, stroke, fill){
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
// Bubble is responsible for storing information speciffic to each bubble.
// such as its position, radius, and start position. It draws itself to the
// canvas and decides when to move, based on where the cursor is and to ensure
// it doesn't leave the canvas
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
    // if cursor is close by, scaled by the bubbles size, move away, bounds are
    // also checked.
      if(d < curDistTollerance){
        var dirArc = atan2(this.y-mouseY, this.x-mouseX) + TWO_PI
        var nX = this.x + (((cos(dirArc)  * curDistTollerance) + this.x) - this.x) * speedScale
        var nY = this.y + (((sin(dirArc)  * curDistTollerance) + this.y) - this.y) * speedScale
        if(nX > 0 && nX < width && nY > 0 && nY < height){
          this.x = nX
          this.y = nY
        }
      }
      // if cursor not in range, move back to start position.
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
