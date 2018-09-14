var canvasWidth = Math.min(400, window.innerWidth - 20);
var canvasHeight = canvasWidth;
var isMouseDown = false;
var lastLoc = {
  x: 0,
  y: 0
};
var lastTimestamp = 0;
var lastLineWidth = -1;
var curStrokeStyle = "black";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.height = canvasHeight;
canvas.width = canvasWidth;

drawGrid();
initCanvasEvent();
initEvent();

/**
 * html交互事件
 */
function initEvent() {
  var clearCanvas = document.querySelectorAll(".clear-canvas")[0];
  var colorButton = document.querySelectorAll(".color");
  //事件绑定
  clearCanvas.addEventListener(
    "click",
    function(e) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawGrid();
    },
    false
  );
  colorButton.forEach(function(e) {
    e.addEventListener(
      "click",
      function(e) {
        var dom = e.target;
        var color = dom.classList[1];
        colorButton.forEach(function(item) {
          item.classList.remove("selected");
        });
        dom.classList.add("selected");
        curStrokeStyle = color;
      },
      false
    );
  });
}

/**
 * canvas交互事件
 */
function initCanvasEvent() {
  //pc端 canvas鼠标事件
  canvas.onmousedown = function(e) {
    e.preventDefault();
    isMouseDown = true;
    lastLoc = windowToCanvas(e.clientX, e.clientY);
    lastTimestamp = new Date().getTime();
  };
  canvas.onmouseup = function(e) {
    e.preventDefault();
    isMouseDown = false;
  };
  canvas.onmouseout = function(e) {
    e.preventDefault();
    isMouseDown = false;
  };
  canvas.onmousemove = function(e) {
    e.preventDefault();
    if (isMouseDown) {
      var curLoc = windowToCanvas(e.clientX, e.clientY);
      var curTimeStamp = new Date().getTime();
      var s = calcDistance(curLoc, lastLoc);
      var t = curTimeStamp - lastTimestamp;

      var lineWidth = calcLineWidth(t, s);
      //画直线
      context.beginPath();
      context.moveTo(lastLoc.x, lastLoc.y);
      context.lineTo(curLoc.x, curLoc.y);
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.strokeStyle = curStrokeStyle;
      context.lineJoin = "round";
      context.stroke();
      lastLoc = curLoc;
      lastTimestamp = curTimeStamp;
      lastLineWidth = lineWidth;
    }
  };
  //移动端 canvas事件绑定
  canvas.ontouchstart = function(e) {
    console.log("ontouchstart");
    console.log(e);
  };
  canvas.ontouchmove = function(e) {
    console.log("ontouchmove");
    console.log(e);
  };
  canvas.ontouchend = function(e) {
    console.log("ontouchend");
    console.log(e);
  };
}

var maxLineWidth = 30;
var minLineWidth = 1;
var maxSpeed = 2;
var minSpeed = 0.1;

/**
 * 动态计算线条宽度
 * @param {*} t
 * @param {*} s
 */
function calcLineWidth(t, s) {
  var v = s / t;
  var resultLineWidth;
  if (v <= minSpeed) {
    resultLineWidth = maxLineWidth;
  } else if (v >= maxSpeed) {
    resultLineWidth = minLineWidth;
  } else {
    resultLineWidth =
      maxLineWidth -
      (v - minSpeed) / (maxSpeed - v) / (maxLineWidth - minLineWidth);
  }
  if (lastLineWidth == -1) {
    return resultLineWidth;
  } else {
    return (lastLineWidth * 2) / 3 + (resultLineWidth * 1) / 3;
  }
}

/**
 * 计算两点之间的距离
 * @param {*} loc1
 * @param {*} loc2
 */
function calcDistance(loc1, loc2) {
  return Math.sqrt(
    (loc1.x - loc2.x) * (loc1.x - loc2.x) +
      (loc1.y - loc2.y) * (loc1.y - loc2.y)
  );
}

/**
 * window坐标转canvas坐标
 * @param {*} x
 * @param {*} y
 */
function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: Math.round(x - bbox.left),
    y: Math.round(y - bbox.top)
  };
}

/**
 * 绘制米字格
 */
function drawGrid() {
  context.save();
  context.strokeStyle = "rgb(230,11,9)";
  //外边框
  context.beginPath();
  context.moveTo(3, 3);
  context.lineTo(canvasWidth - 3, 3);
  context.lineTo(canvasWidth - 3, canvasHeight - 3);
  context.lineTo(3, canvasHeight - 3);
  context.closePath();
  context.lineWidth = 6;
  context.stroke();
  //米字格
  context.beginPath();
  context.setLineDash([10]);
  context.moveTo(0, 0);
  context.lineTo(canvasWidth, canvasHeight);
  context.moveTo(canvasWidth, 0);
  context.lineTo(0, canvasHeight);
  context.moveTo(canvasWidth / 2, 0);
  context.lineTo(canvasWidth / 2, canvasHeight);
  context.moveTo(0, canvasHeight / 2);
  context.lineTo(canvasWidth, canvasHeight / 2);
  context.moveTo(0, 0);
  context.closePath();
  context.lineWidth = 1;
  context.stroke();
  context.restore();
}
