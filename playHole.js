let onHole = [-1, 0, 0, 0, 0];
let playingHole = 0;

let pl = planck,
  vec2 = pl.Vec2;
let world = new pl.World({
  gravity: vec2(0, 0)
});

let holeAR = 1,
  hole;

let ballD = {
  bullet: true,
  linearDamping: 1,
  angularDamping: 1.6
};
let ballFD = {
  friction: 0.9,
  density: 1.0,
  restitution: 0.8
};

let ball;

let allMachines = [];

let holeThemes = [forestTheme, forestTheme, forestTheme, forestTheme, forestTheme];

function drawPiston(obj, x, y, w, h) {
  let W = hole.fairway[0].length;
  drawObject(x, y, w / W, obj.body, piston, 1, 0, 0, 1);
  switch (obj.variety) {
    case 'left-angle':
      drawObject(x, y, w / W, obj.body, pistonTriangle, 1);
      break;
    case 'right-angle':
      drawObject(x, y, w / W, obj.body, pistonTriangle, 1, -0.25);
      break;
    default:
      drawObject(x, y, w / W, obj.body, pistonBlockBlock, 1);
  }
  drawStaticObject(x, y, obj.x + 0.5, obj.y + 0.5, w / W, pistonBlock, 1, obj.rotation, 0, 0);
}

function activatePiston(piston) {
  if(piston.c_velocity.v.length() > 0.01) { return; }
  piston.applyForceToCenter(vec2(
    Math.sin(piston.getAngle()) * 250,
    -Math.cos(piston.getAngle()) * 250), true);
}

function machine(m) {
  switch (m.type) {
    case 'piston':
      let block = world.createBody(vec2(m.x + 0.5, m.y + 0.5));
      block.createFixture(pl.Box(0.5, 0.5));
      let ground = world.createBody(vec2(m.x + 0.5, m.y + 0.5));
      let piston = world.createDynamicBody({
        bullet: true,
        fixedRotation: true,
        position: vec2(
          m.x + 0.5 + Math.sin(Math.PI * 2 * m.rotation),
          m.y + 0.5 - Math.cos(Math.PI * 2 * m.rotation)),
        angle: Math.PI * 2 * m.rotation
      });

      switch (m.variety) {
        case 'left-angle':
          piston.createFixture(pl.Polygon([
            vec2(-0.5, 0.5),
            vec2(0.5, 0.5),
            vec2(-0.5, -0.5),
          ]), { restitution: 0 });
          break;
        case 'right-angle':
          piston.createFixture(pl.Polygon([
            vec2(-0.5, 0.5),
            vec2(0.5, 0.5),
            vec2(0.5, -0.5),
          ]), { restitution: 0 });
          break;
        default:
          piston.createFixture(pl.Box(0.5, 0.5), { restitution: 0 });
      }
      world.createJoint(pl.PrismaticJoint({}, ground, piston, vec2(m.x, m.y),
        vec2(
          Math.sin(Math.PI * 2 * m.rotation) * 1,
          Math.cos(Math.PI * 2 * m.rotation) * -1)
      ));
      world.createJoint(pl.DistanceJoint({ frequencyHz: 2.5, dampingRatio: 0 }, ground, piston,

        vec2(
          Math.sin(Math.PI * 2 * m.rotation) * 1 + Math.cos(Math.PI * 2 * m.rotation) * 1,
          Math.cos(Math.PI * 2 * m.rotation) * 1 + Math.sin(Math.PI * 2 * m.rotation) * 1),
        vec2(
          Math.sin(Math.PI * 2 * m.rotation) * 1,
          Math.cos(Math.PI * 2 * m.rotation) * 1)
      ));
      //world.createJoint(pl.FrictionJoint({}, ground, piston, vec2(m.x, m.y)));

      let obj = {
        body: piston,
        draw: drawPiston,
        activate: activatePiston
      };
      for(let v in m) {
        obj[v] = m[v];
      }
      return obj;
    default:
      return {
        body: 0,
          draw: a => {},
          activate: a => {}
      };
  }
}

let countDown = 0;

function setupHole(L, changeScene = true) {
  countDown = 120;
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
  ball.createFixture(pl.Circle(0.3), ballFD);
  ball.setPosition(vec2(hole.tee.x + 0.5, hole.tee.y + 0.5));

  for(let m of hole.machines) {
    allMachines.push(machine(m));
  }
}

let contactLag=0;

function runHole() {
  let W = hole.fairway[0].length,
    H = hole.fairway.length;
  for(let x = W - 1; x >= 0; x--) {
    for(let y = H - 1; y >= 0; y--) {
      switch (hole.fairway[y][x]) {
        case (1):
          if(ball.c_position.c.x >> 0 === x && ball.c_position.c.y >> 0 === y) {
            ball.setLinearVelocity(ball.m_linearVelocity.mul(0.9));
          }
          break;
        case (0):
          if(countDown < 0 && ball.c_position.c.x >> 0 === x && ball.c_position.c.y >> 0 === y) {
            sb = 2;
            switchSong(menuMusic);
          }
          break;
      }
    }
  }
  world.step(1 / 60);
  if(countDown-- > 0) { return; }
  if(ball.c_velocity.v.length() <= 0.1) {
    hitBall();
  }

  let dx = hole.hole.x + 0.5 - ball.c_position.c.x;
  let dy = hole.hole.y + 0.6 - ball.c_position.c.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if(dist < 0.25) {
    setupHole(playingHole, false);
  }
  if(contactLag--<0&&ball.m_contactList && ball.m_contactList.contact.v_points.length>0) {
    contactLag=20;
    console.log(ball.m_contactList.contact.v_points);
    hitSound.play();
  }
}

let fairwayAssets = [water, trees, fairway, green];

function drawStaticObject(x, y, mx, my, m, image, s = 1, r = 0, xOffset = 0, yOffset = 0) {
  ctx.translate(x + mx * m, y + my * m);
  ctx.rotate(r * Math.PI * 2);
  ctx.drawImage(image, xOffset * m - m * s / 2 >> 0, yOffset * m - m * s / 2 >> 0, m * s >> 0, m * s >> 0);
  ctx.setTransform();
}

function drawObject(x, y, m, obj, image, s = 1, r = 0, xOffset = 0, yOffset = 0) {
  ctx.translate(x, y);
  ctx.translate(obj.c_position.c.x * m, obj.c_position.c.y * m);
  ctx.rotate(obj.getAngle() + r * Math.PI * 2);
  ctx.drawImage(image, xOffset * m - m * s / 2 >> 0, yOffset * m - m * s / 2 >> 0, m * s >> 0, m * s >> 0);
  ctx.setTransform();
}

function drawHole(x, y, w, h) {
  let W = hole.fairway[0].length,
    H = hole.fairway.length;
  for(let i = W - 1; i >= 0; i--) {
    for(let j = H - 1; j >= 0; j--) {
      ctx.drawImage(fairwayAssets[hole.fairway[j][i]], x + w / W * i >> 0, y + h / H * j >> 0, (x + w / W * (i + 1) >> 0) - (x + w / W * i >> 0), (y + h / H * (j + 1) >> 0) - (y + h / H * j >> 0));
    }
  }
  ctx.drawImage(flag, x + w / W * hole.hole.x >> 0, y + h / H * (hole.hole.y - 1) >> 0, (x + w / W * (hole.hole.x + 1) >> 0) - (x + w / W * hole.hole.x >> 0), (y + h / H * (hole.hole.y + 1) >> 0) - (y + h / H * (hole.hole.y - 1) >> 0));

  drawObject(x, y, w / W, ball, golfBall, 0.8);

  for(let m of allMachines) {
    m.draw(m, x, y, w, h);
  }
}

function callHole(x, y, width, height) {
  runHole();
  drawHole(x, y, width, height);
}

function hitBall() {
  hitSound.play();
  let v = Math.random() * Math.PI * 2;

  let dx = hole.hole.x + 0.5 - ball.c_position.c.x;
  let dy = hole.hole.y + 0.6 - ball.c_position.c.y;
  v = Math.atan2(dy, dx);
  let vv = Math.sqrt(dx * dx + dy * dy) * 20 + 20;
  ball.applyForceToCenter(vec2(Math.cos(v) * vv, Math.sin(v) * vv), 1)
}

function activateStuff() {
  for(let m of allMachines) {
    m.activate(m.body);
  }
}

function s3(tx, ty) {
  let s = standardUnit;
  let ar = holeAR;
  button(0, 0, s, 0.4 * s, () => {
    sb = 2;
    switchSong(menuMusic);
  }, back, backb);
  button(w / 2 - s / 2, h - 0.4 * s, s, 0.4 * s, activateStuff, play, playb);

  if(ar * (h - 0.8 * s) < w - s * 2) {
    callWithinAR(s, 0, w - s * 2, h - 0.4 * s, ar, callHole);
  } else {
    callWithinAR(0, 0.4 * s, w, h - 0.8 * s, ar, callHole);
  }
}
