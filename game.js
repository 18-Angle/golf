let dev = false;
let version = "0.0.1";

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
let ARType = 1,
  min;

function getARType(AR) {
  if(AR < 0.8) { ARType = 1; } else if(AR > 1.2) { ARType = 3; } else { ARType = 2; }
  min = w > h ? h : w;
}
getARType(w / h);

//asset stuff
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

function imageInSquare(img, x, y, W, H, tx, ty) {
  switch (ARType) {
    case (1):
      ctx.drawImage(img, x * min, ty + y * min, W * min, H * min);
      break;
    case (2):
      if(w > h * 0.85) {
        ctx.drawImage(img, 0.5 * (w - h * 0.85) + x * (h * 0.85), 0.15 * h + y * (h * 0.85), W * h * 0.85, H * h * 0.85);
      } else {
        ctx.drawImage(img, x * min, 0.15 * h + y * min, W * min, H * min);
      }
      break;
    case (3):
      let mn = 0,
        px = 0,
        py = 0;
      if(min > 0.6 * w) {
        mn = 0.6 * w;
        px = (w - 0.6 * w) / 2;
        py = (h - 0.6 * w);
        if((h - (0.6 * w)) * 3.2 < w * 0.2) {
          py /= 2;
        }
      } else {
        mn = min;
        px = (w - min) / 2;
      }
      ctx.drawImage(img, px + mn * x, py + mn * y, mn * W, mn * H);
      break;
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
};

document.addEventListener('contextmenu', event => event.preventDefault());
