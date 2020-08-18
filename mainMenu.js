function s0(tx, ty) {
  ctx.drawImage(title, tx >> 0, ty >> 0, min >> 0, min >> 0);
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

  ctx.fillStyle = colors[0];
  ctx.textAlign = 'left';
  ctx.font = (0.03 * min >> 0) + "px sans-serif";
  ctx.fillText("v" + version, 0.05 * w, h - 0.01 * min);
  ctx.textAlign = 'center';
  ctx.fillText("© 18°Angle 2020", w / 2, h - 0.01 * min);
}
