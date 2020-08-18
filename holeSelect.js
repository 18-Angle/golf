function holeButton(x, y, width, n) {
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, width >> 0);
  if(onCourse >= n) {
    button(x, y, width, width, () => { setupHole(n) }, play, playb);
    return;
  }
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, width >> 0);
}

function s2() {
  switch (ARType) {
    case (1):
      var onHole = 0;
      var HS = 1 / 21;
      for(var y = 1 / 12; y < 1; y += 1 / 6) {
        for(var x = 1 / 8; x < 1; x += 1 / 4) {
          if(y > 4 / 6 && x < 1 / 4) { continue; }
          if(onHole < 18) {
            holeButton(x * w - HS * h, y * h * 0.6 + (0.2 - HS) * h, HS * 2 * h, ++onHole);
          }
        }
      }
      break;
    case (2):
      var onHole = 0;
      var HS = w / 13 / h;
      for(var y = 1 / 6; y < 1; y += 1 / 3) {
        for(var x = 1 / 12; x < 1; x += 1 / 6) {
          holeButton(x * w - HS * h, y * h * 0.6 + (0.2 - HS) * h, HS * 2 * h, ++onHole);
        }
      }
      break;
    case (3):
      var onHole = 0;
      var HS = 1 / 11;
      for(var y = 1 / 6; y < 1; y += 1 / 3) {
        for(var x = 1 / 12; x < 1; x += 1 / 6) {
          holeButton(x * w - HS * h, y * h * 0.6 + (0.2 - HS) * h, HS * 2 * h, ++onHole);
        }
      }
      break;
  }

  button(0, 0, 0.4 * h, 0.16 * h, () => { sb = 1 }, back, backb);
  button(0.5 * w - 0.2 * h, 0.84 * h, 0.4 * h, 0.16 * h, () => { setupHole() }, play, playb);
}
