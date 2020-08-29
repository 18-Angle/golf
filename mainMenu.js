function drawMenu(x,y,w,h){
  ctx.drawImage(menuBackground, x,y,w,h);
  ctx.drawImage(menuBackgroundTile, x+w,y,w,h);
  ctx.drawImage(menuBackgroundTile, x-w,y,w,h);
  ctx.drawImage(menuBackgroundTile, x+w*2,y,w,h);
  ctx.drawImage(menuBackgroundTile, x-w*2,y,w,h);
}
function drawTitle(x,y,w,h){
  ctx.drawImage(title, x,y+w/20,w,h);
}

function s0(tx, ty) {
  ctx.fillStyle = "rgb(90,169,177)";
  ctx.fillRect(0, 0, w, h/2+min/10);
  ctx.fillStyle = "rgb(90,178,121)";
  ctx.fillRect(0, h/2+min/10, w, h/2);

  callWithinAR(w/40,0,w-w/20,h,5/3,drawMenu);
  callWithinAR(w/40,0,w-w/20,h/3,2680/1047,drawTitle);

  let btnAR = 1549/585;

  switch (ARType) {
    case (1):
      button(0.1 * w, 0.55 * h, 0.8 * w, 0.3 * w, () => { sb = 1 }, play, playb);
      if(window.innerHeight == screen.height) {
        button(0.84 * w, h - 0.16 * w, 0.15 * w, 0.15 * w, () => { document.exitFullscreen() }, exitFullscreen, exitFullscreenb);
      } else {
        button(0.75 * w, h - 0.25 * w, 0.2 * w, 0.2 * w, () => { document.body.requestFullscreen() }, fullscreen, fullscreenb);
      }
      break;
    case (2):
      button(0.2 * w, 0.6 * h, 0.6 * w, 0.2 * w, () => { sb = 1 }, play, playb);
      if(window.innerHeight == screen.height) {
        button(0.84 * w, h - 0.16 * w, 0.15 * w, 0.15 * w, () => { document.exitFullscreen() }, exitFullscreen, exitFullscreenb);
      } else {
        button(0.82 * w, h - 0.18 * w, 0.15 * w, 0.15 * w, () => { document.body.requestFullscreen() }, fullscreen, fullscreenb);
      }
      break;
    case (3):
      button(0.5 * (w - min) + min * 0.2, 0.6 * h, 0.6 * min, 0.2 * min, () => { sb = 1 }, play, playb);
      if(window.innerHeight == screen.height) {
        button(0.89 * w, h - 0.11 * w, 0.1 * w, 0.1 * w, () => { document.exitFullscreen() }, exitFullscreen, exitFullscreenb);
      } else {
        button(0.89 * w, h - 0.11 * w, 0.1 * w, 0.1 * w, () => { document.body.requestFullscreen() }, fullscreen, fullscreenb);
      }
      break;
  }

  button(0.88 * w, 0.02 * w, 0.1 * w, 0.1 * w, () => { toggleMusic() }, playMusic ? music : noMusic, playMusic ? noMusic : music);

  button(0.02 * w, 0.02 * w, 0.1 * w, 0.1 * w, () => { toggleSound() }, playSound ? sound : noSound, playSound ? noSound : sound);

  ctx.fillStyle = colors[0];
  ctx.textAlign = 'left';
  ctx.font = (0.03 * min >> 0) + "px sans-serif";
  ctx.fillText("v" + version, 0.05 * w, h - 0.01 * min);
  ctx.textAlign = 'center';
  ctx.fillText("© 18°Angle 2020", w / 2, h - 0.01 * min);
}
