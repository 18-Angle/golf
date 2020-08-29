//audio assets
var menuMusic = new Howl({
  src: ['assets/menu.mp3'],
  loop: true,
  autoplay: true
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

D= 18492.87;
DD=57262.11;
var islandTheme = new Howl({
  src: ['assets/island-theme.mp3'],
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

var splashSound = new Howl({
  src: ['assets/splash.mp3']
});

var winSound = new Howl({
  src: ['assets/ball-in-hole.mp3']
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
let playSound = true;
let transitionLength = 500;
let playingSong = menuMusic;

forestTheme.on('end',v=>{if(forestTheme.duration(v)>20){return};forestTheme.play('loop');});
islandTheme.on('end',v=>{if(islandTheme.duration(v)>20){return};islandTheme.play('loop');});

function withIntro(audio){
  playingSong.stop();
  audio.play('start');
  playingSong = audio;
  playingSong.volume(playMusic?1:0);
}

function switchSong(audio){
  playingSong.fade(playMusic?1:0,0,transitionLength);
  playingSong.on('fade',v=>{
    playingSong.stop();
    audio.play();
    playingSong = audio;
    playingSong.volume(playMusic?1:0);
  })
}

function toggleMusic() {
  playMusic = !playMusic;
  playingSong.volume(playMusic?1:0);
}


function toggleSound() {
  playSound = !playSound;
  hitSound.volume(playSound?1:0);
  splashSound.volume(playSound?1:0);
  winSound.volume(playSound?1:0);
  //if(playSound) {
  //  Howler.volume(1);
  //} else {
  //  Howler.volume(0);
  //}
}
