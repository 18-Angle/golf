// w = width, h = height, sb = sceneBuffer (for changing scenes)

// button(X,Y,Width,Height,callbackFunction,imageA,imageB)
let onCourse = 1;

let courseAssets = [play, play, play, play, play];

let playingCourse = 0;

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
  courseButton(x,y+ 0 * h, w, 1);
  courseButton(x,y+ 0.25 * h, w, 2);
  courseButton(x,y+ 0.5 * h, w, 3);
  courseButton(x,y+ 0.75 * h, w, 4);
}

function s1(tx, ty) {
  let s = getStandard(w / 2.5, w / 6);

  button(0, 0, s, 0.4 * s, () => { sb = 0 }, back, backb);
  courseButton(w - s, 0, s, 0);
  switch (ARType) {
    case (1):
    case (2):
      callWithinAR(0, s * 0.4, w, h - s * 0.4, courseButtonAR/4, tallCourseButtons);
      break;
    case (3):
      if(courseButtonAR * (h - 0.4 * s) < w - s * 2) {
        callWithinAR(s, 0, w - s * 2, h, courseButtonAR, wideCourseButtons);
      } else {
        callWithinAR(0, s * 0.4, w, h - s * 0.4, courseButtonAR, wideCourseButtons);
      }
      break;
  }

  ctx.font = (0.03 * min >> 0) + 'px sans-serif';
  ctx.textAlign = 'center';
}
