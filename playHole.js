let onHole = [0,0,0,0,0];
let playingHole = 0;
function setupHole(L) {
  sb = 3;
  playingHole = L;
}

function drawHole(x, y, width, height) {
  ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, height >> 0);
}

function s3(tx, ty) {
  let s = standardUnit;
  let ar = 1;
  button(0, 0, s, 0.4 * s, () => { sb = 2 }, back, backb);
  button(w/2-s/2, h-0.4*s, s, 0.4 *s, () => { }, play, playb);

  if( ar*(h - 0.8 * s) < w-s*2){
    callWithinAR(s, 0, w-s*2, h - 0.4 * s, ar, drawHole);
  }
  else{
    callWithinAR(0, 0.4 * s, w, h - 0.8 *s, ar, drawHole);
  }
}
