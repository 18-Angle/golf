let onHole = [-1, 0, 0, 0, 0];
let playingHole = 0;

let ballType = 'ball';

function win() {
  ballType = 'jeff';
  console.log("You're a winner!");
}

let pl = planck,
  vec2 = pl.Vec2;
let world = new pl.World({
  gravity: vec2(0, 0)
});

let holeAR = 1,
  hole;

let ballD = {
  bullet: true,
  linearDamping: 0.4,
  angularDamping: 1.2
};
let ballFD = {
  friction: 0.2,
  density: 0.3,
  restitution: 0.4
};

let ball;

let allMachines = [];

let holeThemes = [forestTheme, forestTheme, forestTheme, forestTheme, forestTheme];

function setupHole(L, changeScene = true) {
  if(changeScene) {
    sb = 3;
    playingHole = L;

    withIntro(holeThemes[L]);
  }
  allMachines = [];
  world = new pl.World({
    gravity: vec2(0, 0)
  });

  hole = holes[playingCourse][playingHole];
  holeAR = hole.fairway[0].length / hole.fairway.length;

  ball = world.createDynamicBody(ballD);
  ball.createFixture(pl.Circle(0.1), ballFD);
  ball.setPosition(vec2(hole.tee.x + 0.5, hole.tee.y + 0.5));

  for(let m of hole.machines) {
    allMachines.push(machine(m));
  }

  let W = hole.fairway[0].length,
    H = hole.fairway.length;

  for(let i = W - 1; i >= 0; i--) {
    for(let j = H - 1; j >= 0; j--) {
      if(getFairway(i, j) === 3) {
        world.createBody(vec2(i + 0.5, j + 0.4)).createFixture(pl.Box(0.5, 0.5), 1);
        //drawTile({ img: wall0 }, x, y, w / 2, h / 2, i, j);
      }
    }
  }

  world.step(1 / 60);
}

let contactLag = 0;

function nextLevel() {
  if(playingHole < holes[playingCourse].length - 1) {
    playingHole++;
    if(playingHole > onHole[playingCourse]) {
      onHole[playingCourse] = playingHole;
    }
    setupHole(playingHole, false);
    return;
  }
  sb = 2;
  switchSong(menuMusic);
}

function runHole() {
  let W = hole.fairway[0].length,
    H = hole.fairway.length;
  for(let x = W - 1; x >= 0; x--) {
    for(let y = H - 1; y >= 0; y--) {
      switch (hole.fairway[y][x]) {
        case (1):
        case (3):
          if(ball.c_position.c.x >> 0 === x && ball.c_position.c.y >> 0 === y) {
            //ball.setLinearVelocity(ball.m_linearVelocity.mul(0.9));
          }
          break;
        case (2):
          if(ball.c_position.c.x >> 0 === x && ball.c_position.c.y >> 0 === y) {
            ball.setLinearVelocity(ball.m_linearVelocity.mul(0.85));
          }
          break;
        default:
          if(ball.c_position.c.x >> 0 === x && ball.c_position.c.y >> 0 === y) {
            setupHole(playingHole, false);
          }
          break;
      }
    }
  }
  world.step(1 / 60);

  let dx = hole.hole.x + 0.5 - ball.c_position.c.x;
  let dy = hole.hole.y + 0.45 - ball.c_position.c.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if(dist < 0.17) {
    nextLevel();
  }
  if(contactLag-- < 0 && ball.m_contactList && ball.m_contactList.contact.v_points.length > 0) {
    contactLag = 20;
    if(ball.c_velocity.v.length() > 0.15) {
      hitSound.play();
    }
  }
}

function activateStuff() {
  for(let m of allMachines) {
    m.activate(m);
  }
}

function s3(tx, ty) {
  ctx.fillStyle = "#41a963";
  ctx.fillRect(0, 0, w, h);
  let s = standardUnit;
  let ar = holeAR;
  button(s*0.0125, s*0.01, s, 0.3 * s, () => {
    sb = 2;
    switchSong(menuMusic);
  }, back, backb);
  button(w - s*0.4125, s*0.01, s*0.3, s*0.3, () => {
    setupHole(playingHole, false);
  }, restart, restartb);
  let actionAR=1.5;
  button(w / 2 - (s/2)*actionAR, h - 0.4 * s, s*actionAR, 0.4 * s, activateStuff, action, actionb);

  runHole();
  if(ar * (h - 0.8 * s) < w - s * 2) {
    callWithinAR(s, 0, w - s * 2, h - 0.4 * s, ar, drawHole);
  } else {
    callWithinAR(0, 0.4 * s, w, h - 0.8 * s, ar, drawHole);
  }
}
