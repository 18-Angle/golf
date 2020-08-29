let dev = false;
let version = "1.0.0";

const colors = ["white", "grey", "#151515", "white", "blue"];

//initialize canvas
const c = document.getElementById("canvas");
const ctx = c.getContext("2d", { alpha: false });
c.style.backgroundColor = "red";
c.width = window.innerWidth;
c.height = window.innerHeight;
//check for mobile
function isMobile() {
  let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  let mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }
  let query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

//initialize variables and constants
let w = c.width,
  h = c.height,
  mobile = isMobile(),
  last = true,
  mouseIsPressed = false;

let mouseX = 0,
  mouseY = 0;
//check aspect ratio
let ARType = 1, min;

let standardUnit = 1;

/**
 * getStandard - gets a standard unit width (for dynamic aspect ratios and screen sizes)
 *
 * @param  {type} min minimum width
 * @param  {type} max maximum width
 * @return {type}     width in pixels
 */
function getStandard(min, max) {
  return Math.max(Math.min((1 / w * h) * 256, min), max);
}

function getARType(AR) {
  standardUnit = getStandard(w / 2.5, w / 7);

  if(AR < 0.8) { ARType = 1; } else if(AR > 1.2) { ARType = 3; } else { ARType = 2; }
  min = w > h ? h : w;
}
getARType(w / h);

//asset stuff

/**
 * button - draws a rectangular button with an image & hover-image
 *
 * @param  {type} x        x
 * @param  {type} y        y
 * @param  {type} w        width
 * @param  {type} h        height
 * @param  {type} callback runs when clicked
 * @param  {type} img      main image
 * @param  {type} imgb     hover-image
 */
function button(x, y, w, h, callback, img, imgb) {
  if(img) {
    if(mouseX > x &&
      mouseX < x + w &&
      mouseY > y &&
      mouseY < y + h) {
      document.body.style.cursor = 'pointer';
      if(!last && mouseIsPressed) {
        callback();
        last = true;
      }
      ctx.drawImage(imgb, x >> 0, y >> 0, w >> 0, h >> 0);
    } else {
      ctx.drawImage(img, x >> 0, y >> 0, w >> 0, h >> 0);
    }
    return;
  }

  if(mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h) {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    document.body.style.cursor = 'pointer';
    if(!last && mouseIsPressed) {
      callback();
      last = true;
    }
    ctx.fillRect(x >> 0, y >> 0, w >> 0, h >> 0);
  } else if(!img) {
    ctx.fillStyle = colors[2];
    ctx.fillRect(x >> 0, y >> 0, w >> 0, h >> 0);
  }
}


/**
 * callWithinAR - Calls the callback function with parameters for a rect of the specified aspect ratio within the rect provided
 *
 * @param  {number} x        x
 * @param  {number} y        y
 * @param  {number} width    width
 * @param  {number} height   height
 * @param  {number} ar       aspect ratio
 * @param  {function} callback callback
 */
function callWithinAR(x, y, width, height, ar, callback) {
  if(height * ar < width) {
    //wide
    callback(x + width / 2 - height / 2 * ar >> 0, y >> 0, height * ar >> 0, height >> 0);
  } else {
    //tall
    callback(x >> 0, y + height / 2 - width / 2 / ar >> 0, width >> 0, width / ar >> 0);
  }
}

//scenes
let scene = 0,
  sb = 0;
const scenes = [s0, s1, s2, s3];

//draw
let lt = 0;

function drawCanvas(t) {
  ctx.imageSmoothingQuality = "high";
  document.body.style.cursor = 'default';
  ctx.fillStyle = "#242729";
  ctx.fillRect(0, 0, w, h);
  /*
  target ARs:
  16:9
  1:1
  9:16
  */
  let tx = 0;
  let ty = 0;
  if(w > h) {
    tx = (w - min) / 2;
  } else {
    ty = (h - min) / 2;
  }

  scenes[scene](tx, ty);
  scene = sb;

  if(dev) {
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'left';
    //ctx.fillText((1000/(t-lt)>>0)+" FPS",5,20);
  }
  lt = t;

  if(t) {
    window.requestAnimationFrame(drawCanvas);
  }
}
window.requestAnimationFrame(drawCanvas);

//event listeners
window.onresize = () => {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  w = c.width;
  h = c.height;
  getARType(w / h);
}

window.onmousemove = (event) => {
  if(!mobile || mouseIsPressed) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
}

window.onmouseup = (event) => {
  if(!mobile) {
    mouseIsPressed = true;
    last = false;
    drawCanvas(false);
    mouseIsPressed = false;
    last = true;
  }
}

window.onmouseleave = (event) => {
  mouseIsPressed = false;
  last = true;
}

let ltouch = [0, 0];
window.ontouchstart = (event) => {
  mouseX = event.touches[0].clientX;
  mouseY = event.touches[0].clientY;
  ltouch = [mouseX, mouseY];
  mouseIsPressed = true;
}

window.ontouchend = (event) => {
  mouseIsPressed = true;
  last = false;
  drawCanvas(false);
  mouseIsPressed = false;
  last = true;
  mouseX = -1;
  mouseY = -1;
}

window.ontouchmove = (event) => {
  if(mouseIsPressed) {
    mouseX = event.touches[0].clientX;
    mouseY = event.touches[0].clientY;
  }
}

let keys = false;

document.onkeydown = (event) => {
  if(event.code === 'KeyR'){
    setupHole(playingHole, false);
    return;
  }
  if(scene != 3 || keys){return;}
  keys = true;
  activateStuff();
}

document.onkeyup = (event) => {
  keys = false;
}

document.addEventListener('contextmenu', event => event.preventDefault());

// special dev settings
if(dev) {
  sb = 3;
  toggleMusic();
  setupHole(playingHole);
}
