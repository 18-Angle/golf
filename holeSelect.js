function holeButton(x, y, width, n) {
  if(onHole[playingCourse] >= n) {
    button(x, y, width, width, () => { setupHole(n) }, level, levelb);
    return;
  }
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, width >> 0);
}

function wideHoleSelect(X, Y, w, h) {
  let onHole = 0;
  let HS = 1 / 6.5;
  for(let y = 1 / 6; y < 1; y += 1 / 3) {
    for(let x = 1 / 12; x < 1; x += 1 / 6) {
      holeButton(X + x * w - HS * h, Y + y * h - HS * h, HS * 2 * h, onHole++);
    }
  }
}

function drawForest(x,y,W,H){
  for(let m=0,i=w;i>0;i-=W){
    m++;
    ctx.drawImage(forestBackgroundb,w-W*m,0,W,h);
    ctx.drawImage(forestBackground,w-W*m,0,W,H);
  }
}

function drawIsland(x,y,w,h){
  ctx.drawImage(islandBackground,x,y,w,h);
}

function s2() {
  switch(playingCourse){
    case(2):
      ctx.fillStyle = 'rgb(90,169,177)';
      ctx.fillRect(0,0,w,h);
      callWithinAR(0,0,w,h,5/3,drawIsland);
    break;
    default:
      callWithinAR(0,0,w,h,5/3,drawForest);
  }

  let s = standardUnit*1.5;
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

  ctx.fillStyle = 'rgb(195,213,103)';
  ctx.fillRect(0,h-0.4*s,w,0.5*s);

  button(0.0125*s, 0.01*s, s, 0.3 * s, () => { sb = 1 }, back, backb);
  let playCourseAR = 1.5;
  button(w / 2 - (s / 2)*playCourseAR, h - 0.375 * s, s*playCourseAR, 0.35 * s, () => { setupHole(0) }, playCourse, playCourseb);
}
