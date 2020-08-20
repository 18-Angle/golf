//audio assets
var menuMusic = new Howl({
  src: ['assets/menu.mp3'],
  loop: true,
  autoplay: true
});

var forestTheme2 = new Howl({
  src: ['assets/forest-theme.mp3'],
  loop: true
});

var D=14263.47;
var DD=71152.4;
var CD=2000;
var forestTheme = new Howl({
  src: ['assets/forest-theme.mp3'],
  sprite: {
    start:[0,D],
    loop:[D,DD-D,true]

    //start:[DD-CD,CD],
    //loop:[D,CD]
  }
});

var hitSound = new Howl({
  src: ['assets/hit.mp3']
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
let transitionLength = 500;
let playingSong = menuMusic;
function withIntro(audio){
  playingSong.fade(1,0,transitionLength);
  playingSong.on('fade',v=>{
    playingSong.stop();
    let a={a:audio.play('start')};
    audio.on('end',v=>{a.a=audio.play('loop');},a.a);
    playingSong = audio;
    playingSong.volume(1);
  })
}
function switchSong(audio){
  playingSong.fade(1,0,transitionLength);
  playingSong.on('fade',v=>{
    playingSong.stop();
    audio.play();
    playingSong = audio;
    playingSong.volume(1);
  })
}

function toggleMusic() {
  playMusic = !playMusic;
  if(playMusic) {
    Howler.volume(1);
  } else {
    Howler.volume(0);
  }
}
