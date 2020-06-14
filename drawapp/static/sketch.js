
function setup() {
  var c = createCanvas(640, 480);
  c.parent("jumbotron_id")
  background(50)
  noStroke();

  button = createButton('Download');
  button.position(0, 100);
  button.mousePressed(download_canvas);

  button2 = createButton('Reset Canvas');
  button2.position(0, 150);
  button2.mousePressed(restart_canvas);
}

function draw(){
  if(mouseIsPressed){
    ellipse(mouseX, mouseY, 30, 30);
  }
}

function download_canvas(){
  saveCanvas()
}

function restart_canvas(){
  background(50)
}
