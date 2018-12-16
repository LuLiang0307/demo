var canvas = document.getElementById('xxx')
var context = canvas.getContext('2d')
autoSetCanvas(canvas)

listenToMouse(canvas)

var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true
  actions.className = "actions x"
}
brush.onclick = function(){
  eraserEnabled = false
  actions.className = "actions"
}

function autoSetCanvas(cnavas){
  setCanvasSize()

  window.onresize = function(){
    setCanvasSize()
  }
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2,true)
  context.fill()
}

function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1)
  context.lineTo(x2,y2)
  context.lineWidth=5
  context.stroke()
  context.closePath()
}

function listenToMouse(canvas){


  var using = false;
  var lastPoint = {x: undefined,y: undefined}

  canvas.onmousedown= function(a){
    var x= a.clientX
    var y= a.clientY
    using=true
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint ={x:x,y:y}
    }
  }

  canvas.onmousemove= function(a){
    var x= a.clientX
    var y= a.clientY
    if(!using){return}
    if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
    }else{
        var newPoint = {x:x, y:y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }
  }

  canvas.onmouseup= function(a){
    using = false;
  }

}
