
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isMobile = true
  }

 $(window).on("deviceorientation", function( event ) {
		if (window.matchMedia("(orientation: portrait)").matches) {
      alert("PORTRATE");
		}
		if (window.matchMedia("(orientation: landscape)").matches) {
      alert("LANDSCAPE");
		}
	});

function setup() {
  var c;
  if(isMobile){
    c = createCanvas(windowHeight, windowWidth)
    c.hide()
  }else{
    c = createCanvas(640, 480);
  }
  c.parent("canvas_container")
  background("#222222")
  stroke("#FFFFFF")
  strokeWeight(10)
}

function draw(){
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY)
  }
}

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
