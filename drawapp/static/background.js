var bubbles = [];
var count = 0;
var obj_spawn_rate = 20;
var cursor_distance_limit = 80;

function setup(){
  var c = createCanvas(windowWidth, windowHeight)
  c.parent('p5_div')
  fill("#50505010")
  stroke("#50505030")
  strokeWeight(2)
  angleMode(RADIANS)
  for (var i = 0; i < 500; i++) {
    let r = random(10, 20)
    let b = new Bubble(random(windowWidth), random(windowHeight), r, cursor_distance_limit)
    bubbles.push(b)
  }
}

function draw(){
  background(255)
  for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].show()
      bubbles[i].checkCursor(mouseX, mouseY)
    }
  if(count % floor(random(obj_spawn_rate)) == 0){
    let r = random(10, 20)
    let b = new Bubble(random(windowWidth), random(windowHeight), r, cursor_distance_limit)
    bubbles.push(b)
  }
  if(count % floor(random(obj_spawn_rate)) == 0){
    bubbles.shift()
  }
  count += 1
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
class Bubble{
  constructor(x, y, r, dist_tolerance){
    this.dist_tolerance = dist_tolerance;
    this.x = x;
    this.y = y;
    this.r = r;
    this.last_pos_x = this.x;
    this.last_pos_y = this.y;
    this.state = '';
  }

  show(){
    ellipse(this.x, this.y, this.r*2)
  }

  checkCursor(mouse_x, mouse_y){
    var x_dist = this.x - mouse_x
    var y_dist = this.y - mouse_y
    var x_cur_in_range = abs(x_dist)  < this.dist_tolerance
    var y_cur_in_range = abs(y_dist)  < this.dist_tolerance

    if(x_cur_in_range && y_cur_in_range){
      this.state = "move_away"
    }
    else{
      this.state = 'move_back'
      if (this.state != "move_back") {
        this.last_pos_x = this.x
        this.last_pos_y = this.y
      }
    }

    if(this.state == 'move_away'){
      var arc = atan2(x_dist, y_dist) + PI
      var direction_arc = arc + PI
      var hyp = 0.1
      var adj = cos(direction_arc) * hyp
      var opp = sin(direction_arc) * hyp

      if(!isNaN(adj) || !isNaN(opp)){
        this.x += opp * (this.dist_tolerance - abs(x_dist))
        this.y += adj * (this.dist_tolerance - abs(y_dist))
      }
    }

    if(this.state == 'move_back'){
      var arc = atan2(this.x - this.last_pos_x, this.y - this.last_pos_y) + PI
      var hyp = 0.4
      var adj = cos(arc) * hyp
      var opp = sin(arc) * hyp
      this.x += opp
      this.y += adj
    }
  }
}
