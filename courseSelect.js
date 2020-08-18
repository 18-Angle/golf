// w = width, h = height, sb = sceneBuffer (for changing scenes)

// button(X,Y,Width,Height,callbackFunction,imageA,imageB)
let onCourse = 1;

let courseAssets = [play, play, play, play, play];

let playingCourse = 0;

function setupCourse(L) {
  sb = 2;
  playingCourse = L;
}

function courseButton(x, y, width, n) {
  height = width / 3;
  ctx.drawImage(courseAssets[n], x >> 0, y >> 0, width >> 0, height >> 0);
  if(onCourse >= n) {
    button(x, y, width, height, () => { setupCourse(n) }, play, playb);
    return;
  }
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, height >> 0);
}

function s1(tx, ty) {
  switch (ARType) {
    case (1):
      button(0, 0, 0.3 * h, 0.12 * h, () => { sb = 0 }, back, backb);

      courseButton(w - 0.3 * h, 0, 0.3 * h, 0);

      courseButton(0.5 * w - 0.3 * h, 0.14 * h, 0.6 * h, 1);
      courseButton(0.5 * w - 0.3 * h, 0.35 * h, 0.6 * h, 2);
      courseButton(0.5 * w - 0.3 * h, 0.56 * h, 0.6 * h, 3);
      courseButton(0.5 * w - 0.3 * h, 0.78 * h, 0.6 * h, 4);
      break;
    case (2):
      button(0, 0, 0.3 * h, 0.12 * h, () => { sb = 0 }, back, backb);

      courseButton(w - 0.3 * h, 0, 0.3 * h, 0);

      courseButton(0.5 * w - 0.3 * h, 0.14 * h, 0.6 * h, 1);
      courseButton(0.5 * w - 0.3 * h, 0.35 * h, 0.6 * h, 2);
      courseButton(0.5 * w - 0.3 * h, 0.56 * h, 0.6 * h, 3);
      courseButton(0.5 * w - 0.3 * h, 0.77 * h, 0.6 * h, 4);
      break;
    case (3):
      button(0, 0, 0.4 * h, 0.16 * h, () => { sb = 0 }, back, backb);

      courseButton(w - 0.4 * h, 0, 0.4 * h, 0);

      courseButton(0.5 * w - 0.61 * h, 0.3 * h, 0.6 * h, 1);
      courseButton(0.5 * w - 0.61 * h, 0.55 * h, 0.6 * h, 2);

      courseButton(0.5 * w + 0.01 * h, 0.3 * h, 0.6 * h, 3);
      courseButton(0.5 * w + 0.01 * h, 0.55 * h, 0.6 * h, 4);
      break;
  }

  ctx.font = (0.03 * min >> 0) + 'px sans-serif';
  ctx.textAlign = 'center';
}
