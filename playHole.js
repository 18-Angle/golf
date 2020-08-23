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
  linearDamping: -6,
  angularDamping: 1.6
};
let ballFD = {
  friction: 1,
  density: 1,
  restitution: 0.4
};

let ball;

let allMachines = [];

let holeThemes = [forestTheme, forestTheme, forestTheme, forestTheme, forestTheme];

function drawPiston(obj, x, y, w, h) {
  let W = hole.fairway[0].length;
  drawObject(x, y, w / W, obj.body, piston, 1, 0, 0, 0.45);
  /*
  switch (obj.variety) {
    case 'left-angle':
      drawObject(x, y, w / W, obj.body, pistonTriangle, 1);
      break;
    case 'right-angle':
      drawObject(x, y, w / W, obj.body, pistonTriangle, 1, -0.25);
      break;
    default:
      drawObject(x, y, w / W, obj.body, piston, 1);
  }*/
  drawStaticObject(x, y, obj.x + 0.5, obj.y + 0.5, w / W, pistonBlock, 1, obj.rotation, 0, 0);
}

function activatePiston(piston) {
  if(ball.isActive() && piston.c_velocity.v.length() > 0.01) { return; }
  let pistonStrength = 300;
  piston.applyForceToCenter(vec2(
    Math.sin(piston.getAngle()) * pistonStrength,
    -Math.cos(piston.getAngle()) * pistonStrength), true);
}

function machine(m) {
  switch (m.type) {
    case 'piston':
      let block = world.createBody(vec2(
        m.x + 0.5 + Math.cos(Math.PI * 2 * (0.25 + m.rotation)) * 0.055,
        m.y + 0.5 + Math.sin(Math.PI * 2 * (0.25 + m.rotation)) * 0.055));
      block.setAngle(Math.PI * 2 * (0.5 + m.rotation));
      block.createFixture(pl.Box(0.47, 0.41));
      let ground = world.createBody(vec2(m.x + 0.5, m.y + 0.5));
      let piston = world.createDynamicBody({
        bullet: true,
        fixedRotation: true,
        position: vec2(
          m.x + 0.5 + 0.39 * Math.cos(Math.PI * 2 * (-0.25 + m.rotation)),
          m.y + 0.5 + 0.39 * Math.sin(Math.PI * 2 * (-0.25 + m.rotation))),
        angle: Math.PI * 2 * (m.rotation)
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
          piston.createFixture(pl.Box(0.48, 0.02), { restitution: 0 });
      }
      world.createJoint(pl.PrismaticJoint({}, ground, piston, vec2(m.x, m.y),
        vec2(
          Math.cos(Math.PI * 2 * (0.25 + m.rotation)) * 1,
          Math.sin(Math.PI * 2 * (0.25 + m.rotation)) * 1)
      ));
      world.createJoint(pl.DistanceJoint({ frequencyHz: 2.5, dampingRatio: 0 }, ground, piston,

        vec2(
          Math.cos(Math.PI * 2 * (m.rotation)) * 1,
          Math.sin(Math.PI * 2 * (m.rotation)) * 1),
        vec2(0, 0)
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
  ball.createFixture(pl.Circle(0.1), ballFD);
  ball.setPosition(vec2(hole.tee.x + 0.5, hole.tee.y + 0.5));

  for(let m of hole.machines) {
    allMachines.push(machine(m));
  }
  world.step(1 / 60);
}

let contactLag = 0;

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
  let dy = hole.hole.y + 0.45 - ball.c_position.c.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if(dist < 0.1) {
    setupHole(playingHole, false);
  }
  if(contactLag-- < 0 && ball.m_contactList && ball.m_contactList.contact.v_points.length > 0) {
    contactLag = 20;
    hitSound.play();
  }
}

let fairwayAssets = [
  0, forest0, forest1, forest2,
  forest3, grass, forest4, grass, 0,
  forest0, forest5, forest6, forest7,
  grass, forest8, grass, 0,

  0, 0, 0, forest10,
  grass, forest10, grass, forest9,
  forest9, forest5, forest11,
  grass, grass, grass, grass
];

// data {img: image, r: rotation, f: flip?}
function drawTransformedImage(data, x, y, w, h) {
  if(!data) { return; }

  ctx.translate(x + w / 2, y + h / 2);

  if(data.f) {
    ctx.scale(-1, 1);
  }
  if(data.r) {
    ctx.rotate(data.r * Math.PI * 2);
  }
  if(data.r === 0.25 || data.r === 0.75) {
    ctx.drawImage(data.img, -h / 2, -w / 2, h, w);
  } else {
    ctx.drawImage(data.img, -w / 2, -h / 2, w, h);
  }
  ctx.setTransform();
}

function drawTile(data, x, y, w, h, xOffset, yOffset) {
  let W = hole.fairway[0].length,
    H = hole.fairway.length;
  drawTransformedImage(data,
    (x + w / W * xOffset >> 0),
    (y + h / H * yOffset >> 0),
    (x + w / W * (xOffset + 1) >> 0) - (x + w / W * xOffset >> 0),
    (y + h / H * (yOffset + 1) >> 0) - (y + h / H * yOffset >> 0)); //gridhere
}

function drawStaticObject(x, y, mx, my, m, image, s = 1, r = 0, xOffset = 0, yOffset = 0) {
  ctx.translate(x + mx * m, y + my * m);
  ctx.rotate(r * Math.PI * 2);
  ctx.drawImage(image,
    xOffset * m - m * s / 2 >> 0,
    yOffset * m - m * s / 2 >> 0,
    m * s >> 0,
    m * s >> 0);
  ctx.setTransform();
}

function drawObject(x, y, m, obj, image, s = 1, r = 0, xOffset = 0, yOffset = 0) {
  ctx.translate(x, y);
  ctx.translate(obj.c_position.c.x * m, obj.c_position.c.y * m);
  ctx.rotate(obj.getAngle() + r * Math.PI * 2);
  ctx.drawImage(image, xOffset * m - m * s / 2 >> 0, yOffset * m - m * s / 2 >> 0, m * s >> 0, m * s >> 0);
  ctx.setTransform();
}

function getFairway(x, y) {
  return hole.fairway[y] ? hole.fairway[y][x] ? hole.fairway[y][x] : 0 : 0;
}

function debugBodies(x, y, m) {
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 1;
  for(let body = world.getBodyList(); body; body = body.getNext()) {
    ctx.strokeStyle = '#f00';
    for(let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      if(fixture.hasOwnProperty('m_body')) {
        ctx.translate(x + fixture.m_body.c_position.c.x * m, y + fixture.m_body.c_position.c.y * m);
        ctx.rotate(fixture.m_body.c_position.a);
      }
      tx = 0, ty = 0;
      switch (fixture.m_shape.m_type) {
        case 'edge':
          ctx.beginPath();
          ctx.moveTo(
            fixture.m_shape.m_vertex1.x * m + tx,
            fixture.m_shape.m_vertex1.y * -m + ty
          );
          ctx.lineTo(
            fixture.m_shape.m_vertex2.x * m + tx,
            fixture.m_shape.m_vertex2.y * -m + ty
          );
          ctx.stroke();
          break;
        case 'polygon':
          tx += fixture.m_shape.m_centroid.x * m;
          ty += fixture.m_shape.m_centroid.y * m;

          a = fixture;
          ctx.beginPath();
          ctx.moveTo(
            fixture.m_shape.m_vertices[0].x * m + tx,
            fixture.m_shape.m_vertices[0].y * -m + ty
          );

          for(let i of fixture.m_shape.m_vertices) {
            ctx.lineTo(
              i.x * m + tx,
              i.y * -m + ty
            );
          }
          ctx.lineTo(
            fixture.m_shape.m_vertices[0].x * m + tx,
            fixture.m_shape.m_vertices[0].y * -m + ty
          );
          //ctx.fill();
          ctx.stroke();
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(fixture.m_shape.m_p.x * m + tx, fixture.m_shape.m_p.y * m + tx, fixture.m_shape.m_radius * m, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        default:
          console.log(fixture);
      }
      ctx.setTransform();
    }
    for(let joint = body.getJointList(); joint; joint = joint.next) {
      switch (joint.joint.m_type) {
        case 'prismatic-joint':
          ctx.translate(x + body.c_position.c.x * m, y + body.c_position.c.y * m);
          ctx.strokeStyle = '#00f';
          ctx.beginPath();
          ctx.moveTo(
            (joint.joint.m_axis.x) * m,
            (joint.joint.m_axis.y) * m
          );
          ctx.lineTo(
            -(joint.joint.m_axis.x) * m,
            -(joint.joint.m_axis.y) * m
          );
          ctx.stroke();
          break;
        case 'distance-joint':
          ctx.translate(x + joint.joint.m_bodyA.c_position.c.x * m, y + joint.joint.m_bodyA.c_position.c.y * m);
          ctx.strokeStyle = '#0f0';
          ctx.beginPath();
          ctx.moveTo(
            (joint.joint.m_bodyA.c_position.c.x + joint.joint.m_rA.x) * m,
            (joint.joint.m_bodyA.c_position.c.y + joint.joint.m_rA.y) * m
          );
          ctx.lineTo(
            (joint.joint.m_bodyB.c_position.c.x + joint.joint.m_rB.x) * m,
            (joint.joint.m_bodyB.c_position.c.y + joint.joint.m_rB.y) * m
          );
          ctx.stroke();
          break;
        default:
          //console.log(joint.joint);
      }
      ctx.setTransform();
    }
  }
}

function drawHole(x, y, w, h) {
let W = hole.fairway[0].length,
  H = hole.fairway.length;

  for(let i = W * 2 - 1; i >= 0; i--) {
    for(let j = H * 2 - 1; j >= 0; j--) {
      drawTile({ img: water }, x, y, w / 2, h / 2, i, j);

      let bits = [
        j % 2,
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j - 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j - 1) / 2 >> 0),
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j + 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j + 1) / 2 >> 0),
      ];
      if(fairwayAssets[parseInt(bits.join(''), 2)]) {
        drawTile({ img: fairwayAssets[parseInt(bits.join(''), 2)], f: i % 2 }, x, y, w / 2, h / 2, i, j);
      }
    }
  }
  ctx.drawImage(flag,
    x + w / W * hole.hole.x >> 0,
    y + h / H * (hole.hole.y - 1) >> 0,
    (x + w / W * (hole.hole.x + 1) >> 0) - (x + w / W * hole.hole.x >> 0),
    (y + h / H * (hole.hole.y + 1) >> 0) - (y + h / H * (hole.hole.y - 1) >> 0));

  drawStaticObject(x, y, ball.c_position.c.x, ball.c_position.c.y, w / W, golfBallShadow);
  drawStaticObject(x, y, ball.c_position.c.x, ball.c_position.c.y, w / W, golfBall);

  for(let m of allMachines) {
    m.draw(m, x, y, w, h);
  }
  if(dev) {
    debugBodies(x, y, w / W);
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
  let dy = hole.hole.y + 0.45 - ball.c_position.c.y;
  v = Math.atan2(dy, dx);
  let vv = Math.sqrt(dx * dx + dy * dy) * 2 + 1.5;
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
