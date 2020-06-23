
var canvas;
var isMobile = false;
var orentation = window.screen.orientation.type
var lastScrollTop = 0;


var background_cp = new iro.ColorPicker('#background_cp', {width:150, color:"#22222f"})
var stroke_cp = new iro.ColorPicker('#stroke_cp', {width:150, color:"#FFFFFF"})

// setup function for p5.js, it is ran only once when the page is ready
function setup() {
  newCanvas()
}

// draw function for p5.js runs as often as screen refreshes
function draw(){
    if(mouseIsPressed){
      line(pmouseX, pmouseY, mouseX, mouseY)
    }
  }

function newCanvas(){
  var w = $("#canvas_container").width()
  canvas = createCanvas(w, w/2)
  canvas.parent("canvas_container")
  background(background_cp.color.hexString)
  stroke(stroke_cp.color.hexString)
}

// event listeners to disable scrolling with touch, only when using the canvas.
$("#canvas_container").on("touchstart",() => {
  $("body").css('overflow', 'hidden')
})
$("#canvas_container").on("touchend",() => {
  $("body").css('overflow', 'visible')
})


// expand background colour selector
$('#btn_background_cp').on('click', ()=>{
  $('#background_cp').toggle();
  $('#reset_btn').toggle()
})
// change background colour and collapse colour selector
$('#reset_btn').on('click', ()=>{
  newCanvas()
})

// expand stroke colour selector
$('#btn_stroke_cp').on('click', ()=>{
  $('#stroke_cp').toggle()
})
// change stroke color on change
stroke_cp.on('color:change', function(color) {
  stroke(color.hexString)
});

// expand collapse stroke weight
$('#btn_stroke_weight').on('click', ()=>{
  $('#stroke_weight_div').toggle()
})
// change stroke weight and display value
$('#stroke_weight_range').on('input',()=>{
  var val = $('#stroke_weight_range').val()
  strokeWeight(val)
  $('#stroke_weight_label').html(val+" px")
})

// expand collapse download div
$('#download_btn').on('click', ()=>{
  $('#download_div').toggle()
})
// download sketch
$('#download_btn_submit').on('click', ()=>{
  var val = $("#download_input").val()
  if(val == ''){
      save()
  }
  else {
    save(val)
  }
})
