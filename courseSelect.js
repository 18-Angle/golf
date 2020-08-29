// w = width, h = height, sb = sceneBuffer (for changing scenes)

// button(X,Y,Width,Height,callbackFunction,imageA,imageB)
let onCourse = 1;

let courseAssets = [play, play, play, play, play];

let playingCourse = 1;

function setupCourse(L) {
  sb = 2;
  playingCourse = L;
}

const courseButtonAR = 2.5;

function courseButton(x, y, width, n) {
  height = width / courseButtonAR;
  ctx.drawImage(courseAssets[n], x >> 0, y >> 0, width >> 0, height >> 0);
  if(onCourse >= n) {
    button(x, y, width, height, () => { setupCourse(n) }, play, playb);
    return;
  }
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, height >> 0);
}

function wideCourseButtons(x, y, w, h) {
  courseButton(x, y, 0.5 * w, 1);
  courseButton(x, y + 0.5 * h, 0.5 * w, 2);

  courseButton(x + w * 0.5, y, 0.5 * w, 3);
  courseButton(x + w * 0.5, y + 0.5 * h, 0.5 * w, 4);
}

function tallCourseButtons(x, y, w, h) {
  courseButton(x, y + 0 * h, w, 1);
  courseButton(x, y + 0.25 * h, w, 2);
  courseButton(x, y + 0.5 * h, w, 3);
  courseButton(x, y + 0.75 * h, w, 4);
}

function cButton(x, y, w, h, callback, img, imgb, bx, bw) {
  if(mouseX > x+bx &&
    mouseX < x+bx + bw &&
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

function courseButtons(x,y,w,h){
  cButton(x, y, w*0.6, h*0.8, () => { setupCourse(1) }, forestButton, forestButtonb,0,w*0.6*0.82);
  cButton(x+w*0.4, y+h*0.2, w*0.6, h*0.8, () => { setupCourse(2) }, islandButton, islandButtonb,w*0.6*0.18,w*0.6*0.82);
}

function s1(tx, ty) {
  callWithinAR(0,0,w,h,5/3,drawForest);

  let s = getStandard(w / 2.5, w / 6)*1.5;

  button(0.0125*s, 0.01*s, s, 0.3 * s, () => { sb = 0 }, back, backb);
  //courseButton(w - s, 0, s, 0);
  /*
  switch (ARType) {
    case (1):
    case (2):
      callWithinAR(0, s * 0.4, w, h - s * 0.4, courseButtonAR / 4, tallCourseButtons);
      break;
    case (3):
      if(courseButtonAR * (h - 0.4 * s) < w - s * 2) {
        callWithinAR(s, 0, w - s * 2, h, courseButtonAR, wideCourseButtons);
      } else {
        callWithinAR(0, s * 0.4, w, h - s * 0.4, courseButtonAR, wideCourseButtons);
      }
      break;
  }
  */
  callWithinAR(0.2*s,0.4*s,w-0.4*s,h-0.8*s,2.2,courseButtons);
  ctx.font = (0.03 * min >> 0) + 'px sans-serif';
  ctx.textAlign = 'center';
}
