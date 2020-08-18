//audio assets
var menuMusic = new Howl({
  src: ['assets/menu.mp3'],
  loop: true,
  autoplay: true
});

/*

var moosh = new Howl({
  src: ['assets/mooshed.mp3'],
  sprite: {
    start:[1550,1700],
    loop:[8000,18000,true]
  }
});

*/


let playMusic = true;

function toggleMusic() {
  playMusic = !playMusic;
  if(playMusic) {
    Howler.volume(1);
  } else {
    Howler.volume(0);
  }
}
