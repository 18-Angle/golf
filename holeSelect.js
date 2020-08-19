function holeButton(x, y, width, n) {
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, width >> 0);
  if(onHole[playingCourse] >= n) {
    button(x, y, width, width, () => { setupHole(n) }, play, playb);
    return;
  }
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, width >> 0);
}

function wideHoleSelect(X, Y, w, h) {
  //ctx.drawImage(lock, X >> 0, Y >> 0, w >> 0, h >> 0);
  let onHole = 0;
  let HS = 1 / 6.5;
  for(let y = 1 / 6; y < 1; y += 1 / 3) {
    for(let x = 1 / 12; x < 1; x += 1 / 6) {
      holeButton(X + x * w - HS * h, Y + y * h - HS * h, HS * 2 * h, onHole++);
    }
  }
}

function s2() {
  let s = standardUnit;
  let onHole = 0,
    HS;
  switch (ARType) {
    case (1):
      HS = Math.min(1 / 17, w / 8.2 / h);
      for(let y = 1 / 12; y < 1; y += 1 / 6) {
        for(let x = 1 / 8; x < 1; x += 1 / 4) {
          if(y > 4 / 6 && x < 1 / 4) { continue; }
          if(onHole < 18) {
            holeButton(x * w - HS * h, y * h * 0.75 + (0.2 - HS) * h, HS * 2 * h, onHole++);
          }
        }
      }
      break;
    case (2):
    case (3):
      if(2 * (h - 0.8 * s) < w - s * 2) {
        callWithinAR(s, 0, w - s * 2, h - 0.4 * s, 2, wideHoleSelect);
      } else {
        callWithinAR(0, 0.4 * s, w, h - 0.8 * s, 2, wideHoleSelect);
      }
      break;
  }

  button(0, 0, s, 0.4 * s, () => { sb = 1 }, back, backb);
  button(w / 2 - s / 2, h - 0.4 * s, s, 0.4 * s, () => { setupHole(0) }, play, playb);

  //button(0, 0, 0.4 * h, 0.16 * h, () => { sb = 1 }, back, backb);
  //button(0.5 * w - 0.2 * h, 0.84 * h, 0.4 * h, 0.16 * h, () => { setupHole(0) }, play, playb);
}
