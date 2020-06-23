
var canvas;
var isMobile = false;
var orentation = window.screen.orientation.type

// check if device is a mobile device
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isMobile = true
  }

// hide and show controls or sketch based on orentation, is triggerd by orientationchange event
$(window).on( "orientationchange", function( event ) {
  orentation = window.screen.orientation.type
    if(orentation.includes("portrait")){
      canvas.hide()
      $("#container_id").show()
    }
    else if(orentation.includes("landscape")){
      $("#container_id").hide()
      canvas.show()
    }
});

// p5.js setup function, runs once once elements have loaded. initilises canvas
// in different ways based on if the device is mobile and the screens orientation.
function setup() {
  if(isMobile){
    var navHeight = $("#navbar").outerHeight()
    if(orentation.includes("portrait")){
      canvas = createCanvas(windowHeight, windowWidth - navHeight);
      canvas.hide()
    }
    else if(orentation.includes("landscape")){
      $("#container_id").hide()
      canvas = createCanvas(windowWidth, windowHeight - navHeight);
      canvas.hide()
      canvas.show()
    }
  }
  else{
    canvas = createCanvas(640, 480);
    canvas.parent("canvas_container")
  }
  background("#222222")
  stroke("#FFFFFF")
  strokeWeight(10)
}

// draw function for p5.js runs as often as screen refreshes
function draw(){
    if(mouseIsPressed){
      line(pmouseX, pmouseY, mouseX, mouseY)
    }
  }

// colour pickers from library
var background_cp = new iro.ColorPicker('#background_cp', {width:150})
var stroke_cp = new iro.ColorPicker('#stroke_cp', {width:150})

// expand background colour selector
$('#btn_background_cp').on('click', ()=>{
  $('#background_cp').toggle();
  $('#reset_btn').toggle()
})
// change background colour and collapse colour selector
$('#reset_btn').on('click', ()=>{
  background(background_cp.color.hexString)
  $('#background_cp').toggle()
  $('#reset_btn').toggle()
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
