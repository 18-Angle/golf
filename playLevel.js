let playingHole = 0;

function setupHole(L) {
  sb = 3;
  playingHole = L;
}

function drawHole(tx, ty) {
  imageInSquare(lock, 0, 0, 1, 1, tx, ty);
}

function s3(tx, ty) {
  ctx.fillStyle = colors[0];
  switch (ARType) {
    case (1):
      if(h / w > 1.4) {
        button(0, (h - min) * 0.25 - 0.1 * w, 0.2 * w, 0.2 * w, () => { sb = 2 }, backMini, backMinib);
      } else {
        button(0, 0, 0.5 * (h - min), 0.5 * (h - min), () => { sb = 2 }, backMini, backMinib);
      }
      break;
    case (2):
      button(0, 0, 0.14 * h, 0.14 * h, () => { sb = 2 }, backMini, backMinib);
      break;
    case (3):
      if(w / h > 2.6) {
        button(0.5 * w - h, 0, 0.5 * h, 0.2 * h, () => { sb = 2 }, back, backb);
      } else {
        button(0, 0, 0.2 * w, 0.08 * w, () => { sb = 2 }, back, backb);
      }
      break;
  }
  //drawBoard(levels[level],tx,ty);
  drawHole(tx, ty);
}
