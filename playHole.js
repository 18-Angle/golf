const DebugBodiesView = false;

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
  linearDamping: -4,
  angularDamping: 1.2
};
let ballFD = {
  friction: 1,
  density: 0.5,
  restitution: 0.4
};

let ball;

let allMachines = [];

let holeThemes = [forestTheme, forestTheme, forestTheme, forestTheme, forestTheme];

function drawPiston(obj, x, y, w, h) {
  let W = hole.fairway[0].length;


  drawStaticObject(x + 3, y + 3, obj.x + 0.5, obj.y + 0.5, w / W, pistonBlockShadow, 1, obj.rotation, 0, 0);
  drawStaticObject(x + 6, y + 6, obj.x + 0.5, obj.y + 0.5, w / W, pistonBlockShadow, 1, obj.rotation, 0, 0);
  drawStaticObject(x + 9, y + 9, obj.x + 0.5, obj.y + 0.5, w / W, pistonBlockShadow, 1, obj.rotation, 0, 0);
  //*
  switch (obj.variety) {
    case 'left-angle':
      drawObject(x + 3, y + 3, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2, true);
      drawObject(x + 6, y + 6, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2, true);
      drawObject(x + 9, y + 9, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2, true);
      drawObject(x, y, w / W, obj.body, triPiston, 1, 0, 0, 0.45 - 1, 2, true);
      break;
    case 'right-angle':
      drawObject(x + 3, y + 3, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2);
      drawObject(x + 6, y + 6, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2);
      drawObject(x + 9, y + 9, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2);
      drawObject(x, y, w / W, obj.body, triPiston, 1, 0, 0, 0.45 - 1, 2);
      break;
    default:
      drawObject(x + 3, y + 3, w / W, obj.body, pistonShadow, 1, 0, 0, 0.45);
      drawObject(x + 6, y + 6, w / W, obj.body, pistonShadow, 1, 0, 0, 0.45);
      drawObject(x + 9, y + 9, w / W, obj.body, pistonShadow, 1, 0, 0, 0.45);
      drawObject(x, y, w / W, obj.body, piston, 1, 0, 0, 0.45);
  } /**/
  drawStaticObject(x, y, obj.x + 0.5, obj.y + 0.5, w / W, pistonBlock, 1, obj.rotation, 0, 0);
}

function activatePiston(piston) {
  if(ball.isActive() && piston.body.c_velocity.v.length() > 0.01) { return; }
  let pistonStrength = 290;
  piston.body.applyForceToCenter(vec2(
    Math.sin(piston.body.getAngle()) * pistonStrength,
    -Math.cos(piston.body.getAngle()) * pistonStrength), true);
}

function drawGate(obj, x, y, w, h) {
  let W = hole.fairway[0].length;
  drawObject(x + 3, y + 3, w / W, obj.gate1, gateShadow, 1, 0.5, 0, -0.25);
  drawObject(x + 6, y + 6, w / W, obj.gate1, gateShadow, 1, 0.5, 0, -0.25);
  drawObject(x + 9, y + 9, w / W, obj.gate1, gateShadow, 1, 0.5, 0, -0.25);

  drawObject(x + 3, y + 3, w / W, obj.gate2, gateShadow, 1, 0, 0, -0.25);
  drawObject(x + 6, y + 6, w / W, obj.gate2, gateShadow, 1, 0, 0, -0.25);
  drawObject(x + 9, y + 9, w / W, obj.gate2, gateShadow, 1, 0, 0, -0.25);
  drawObject(x, y, w / W, obj.gate1, gate, 1, 0.5, 0, -0.25);
  drawObject(x, y, w / W, obj.gate2, gate, 1, 0, 0, -0.25);
}

function activateGate(gate) {
  if(gate.active) {
    gate.joint1.setMotorSpeed(10);
    gate.joint2.setMotorSpeed(-10);
  } else {
    gate.joint1.setMotorSpeed(-10);
    gate.joint2.setMotorSpeed(10);
  }
  gate.active = !gate.active;
}

function drawTrapDoor(door, x, y, w, h) {
  if(door.active) {
    door.active = door.active ? door.active - 1 : 0;
    if(door.active && ball.c_position.c.x >> 0 === door.x && ball.c_position.c.y >> 0 === door.y) {
      sb = 2;
      switchSong(menuMusic);
    }
  }
  drawTile({ img: door.active ? trapDoorOpen : trapDoor }, x, y, w, h, door.x, door.y);
}

function activateTrapDoor(door) {
  door.active = door.active === 0 ? 60 : door.active;
}

function machine(m) {
  switch (m.type) {
    case 'trapDoor': {
      let obj = {
        active: 0,
        draw: drawTrapDoor,
        activate: activateTrapDoor
      };
      for(let v in m) {
        obj[v] = m[v];
      }
      return obj;
    }
    case 'gate': {
      let ground = world.createBody(vec2(m.x + 0.5, m.y + 0.5));
      let gate1 = world.createDynamicBody({
        bullet: true,
        position: vec2(
          m.x + 0.5 + 0.25 * Math.cos(Math.PI * 2 * (-0.25 + m.rotation)),
          m.y + 0.5 + 0.25 * Math.sin(Math.PI * 2 * (-0.25 + m.rotation))),
        angle: Math.PI * 2 * (m.rotation)
      });

      let gate2 = world.createDynamicBody({
        bullet: true,
        position: vec2(
          m.x + 0.5 - 0.25 * Math.cos(Math.PI * 2 * (-0.25 + m.rotation)),
          m.y + 0.5 - 0.25 * Math.sin(Math.PI * 2 * (-0.25 + m.rotation))),
        angle: Math.PI * 2 * (m.rotation)
      });

      gate1.createFixture(pl.Box(0.05, 0.24), 100);
      gate2.createFixture(pl.Box(0.05, 0.24), 100);

      let gateD = {
        enableMotor: true,
        maxMotorTorque: 1000,
        enableLimit: true,
        motorSpeed: m.active ? -10 : 10,

        lowerAngle: -0.5 * Math.PI,
        upperAngle: 0,
      };

      let joint1 = pl.RevoluteJoint(gateD, ground, gate1,
        vec2(
          m.x + 0.5 + 0.45 * Math.cos(Math.PI * 2 * (-0.25 + m.rotation)),
          m.y + 0.5 + 0.45 * Math.sin(Math.PI * 2 * (-0.25 + m.rotation))),
      );

      gateD.motorSpeed = m.active ? 10 : -10;
      gateD.lowerAngle = 0;
      gateD.upperAngle = 0.5 * Math.PI;
      let joint2 = pl.RevoluteJoint(gateD, ground, gate2,
        vec2(
          m.x + 0.5 - 0.45 * Math.cos(Math.PI * 2 * (-0.25 + m.rotation)),
          m.y + 0.5 - 0.45 * Math.sin(Math.PI * 2 * (-0.25 + m.rotation))),
      );

      world.createJoint(joint1);
      world.createJoint(joint2);
      let obj = {
        active: false,
        gate1: gate1,
        joint1: joint1,
        gate2: gate2,
        joint2: joint2,
        draw: drawGate,
        activate: activateGate
      };
      for(let v in m) {
        obj[v] = m[v];
      }
      return obj;
    }
    case 'piston': {
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
            vec2(-0.46, -0.9),
            vec2(-0.46, 0.06),
            vec2(0.48, 0.06)
          ]), { restitution: 0 });
          break;
        case 'right-angle':
          piston.createFixture(pl.Polygon([
            vec2(0.46, -0.9),
            vec2(0.46, 0.06),
            vec2(-0.48, 0.06)
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
    }
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

let hitCountdown = 0;

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
        case (2):
          if(ball.c_position.c.x >> 0 === x && ball.c_position.c.y >> 0 === y) {
            ball.setLinearVelocity(ball.m_linearVelocity.mul(0.85));
          }
          break;
        default:
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
  if(ball.c_velocity.v.length() <= 0.1 && hitCountdown-- <= 0) {
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
    if(ball.c_velocity.v.length() > 0.15){
      hitSound.play();
    }
  }
}

let fairwayAssets = [
  0, { img: forest0 }, { img: forest1R }, { img: forest2 },
  { img: forest3R }, { img: grass }, { img: forest5R }, { img: grass }, { img: cornerShadow },
  { img: forest0Shadow }, { img: forest6R }, { img: forest7 }, { img: forest8 },
  { img: grass }, { img: forest9R }, { img: grass },
  0,

  0, 0, 0, { img: forest10R },
  { img: grass }, { img: forest10R }, { img: grass }, { img: forest11R },
  { img: forest11R }, { img: forest6R }, { img: forest12R },
  { img: grass }, { img: grass }, { img: grass }, { img: grass },

  0, { f: 1, img: forest0 }, { img: forest1L }, { f: 1, img: forest2 },
  { img: forest3L }, { img: grass }, { img: forest5L }, { img: grass },
  0,
  { f: 1, img: forest0 }, { img: forest6L }, { f: 1, img: forest7 }, { f: 1, img: forest8 },
  { img: grass }, { img: forest9L }, { img: grass },
  0,

  0, 0, 0, { img: forest10L },
  { img: grass }, { img: forest10L }, { img: grass }, { img: forest11L },
  { img: forest11L }, { img: forest6L }, { img: forest12L },
  { img: grass }, { img: grass }, { img: grass }, { img: grass },


  0, { img: sand0 }, { img: sand1R }, { img: sand2 },
  { img: sand3R }, { img: grass }, { img: sand5R }, { img: grass }, { img: sandCornerShadow },
  { img: sand0Shadow }, { img: sand6R }, { img: sand7 }, { img: sand8 },
  { img: grass }, { img: sand9R }, { img: grass },
  0,

  0, 0, 0, { img: sand10R },
  { img: grass }, { img: sand10R }, { img: grass }, { img: sand11R },
  { img: sand11R }, { img: sand6R }, { img: sand12R },
  { img: grass }, { img: grass }, { img: grass }, { img: grass },

  0, { f: 1, img: sand0 }, { img: sand1L }, { f: 1, img: sand2 },
  { img: sand3L }, { img: grass }, { img: sand5L }, { img: grass },
  0,
  { f: 1, img: sand0 }, { img: sand6L }, { f: 1, img: sand7 }, { f: 1, img: sand8 },
  { img: grass }, { img: sand9L }, { img: grass },
  0,

  0, 0, 0, { img: sand10L },
  { img: grass }, { img: sand10L }, { img: grass }, { img: sand11L },
  { img: sand11L }, { img: sand6L }, { img: sand12L },
  { img: grass }, { img: grass }, { img: grass }, { img: grass },
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

function drawObject(x, y, m, obj, image, s = 1, r = 0, xOffset = 0, yOffset = 0, ratio = 1, flipImage) {
  ctx.translate(x, y);
  ctx.translate(obj.c_position.c.x * m, obj.c_position.c.y * m);
  ctx.rotate(obj.getAngle() + r * Math.PI * 2);
  if(flipImage) {
    ctx.scale(-1, 1);
  }
  ctx.drawImage(image, xOffset * m - m * s / 2 >> 0, yOffset * m - m * s / 2 >> 0, m * s >> 0, m * ratio * s >> 0);
  ctx.setTransform();
}

function getFairway(x, y) {
  return hole.fairway[y] ? hole.fairway[y][x] ? hole.fairway[y][x] : hole.fairway[y][x] === 0 ? 0 : 1 : 1;
}

function debugBodies(x, y, m) {
  if(!DebugBodiesView) { return; }
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
            fixture.m_shape.m_vertex1.y * m + ty
          );
          ctx.lineTo(
            fixture.m_shape.m_vertex2.x * m + tx,
            fixture.m_shape.m_vertex2.y * m + ty
          );
          ctx.stroke();
          break;
        case 'polygon':
          //tx += fixture.m_shape.m_centroid.x * m;
          //ty += fixture.m_shape.m_centroid.y * m;

          a = fixture;
          ctx.beginPath();
          ctx.moveTo(
            fixture.m_shape.m_vertices[0].x * m + tx,
            fixture.m_shape.m_vertices[0].y * m + ty
          );

          for(let i of fixture.m_shape.m_vertices) {
            ctx.lineTo(
              i.x * m + tx,
              i.y * m + ty
            );
          }
          ctx.lineTo(
            fixture.m_shape.m_vertices[0].x * m + tx,
            fixture.m_shape.m_vertices[0].y * m + ty
          );
          //ctx.fill();
          ctx.stroke();
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(
            fixture.m_shape.m_p.x * m + tx,
            fixture.m_shape.m_p.y * m + tx,
            fixture.m_shape.m_radius * m, 0, 2 * Math.PI);
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

  let shown = [];

  for(let i = W * 2 - 1; i >= 0; i--) {
    for(let j = H * 2 - 1; j >= 0; j--) {
      switch (getFairway(i / 2 >> 0, j / 2 >> 0)) {
        case 2:
          drawTile({ img: sand }, x, y, w / 2, h / 2, i, j);
          break;
        default:
          drawTile({ img: water }, x, y, w / 2, h / 2, i, j);
      }

      let bits = [
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j - 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j - 1) / 2 >> 0),
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j + 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j + 1) / 2 >> 0),
      ];

      let mx = Math.max(Math.max(...bits), 1);
      bits = bits.map(a => a === 1 ? 1 : 0);

      bits.unshift(j % 2);

      if(fairwayAssets[parseInt(bits.join(''), 2) + (i % 2 ? 32 : 0) + (mx - 1) * 64]) {
        drawTile(fairwayAssets[parseInt(bits.join(''), 2) + (i % 2 ? 32 : 0) + (mx - 1) * 64], x, y, w / 2, h / 2, i, j);

        /*
        let V=parseInt(bits.join(''), 2)+(i%2?32:0)+(mx-1)*64;
        if(!shown[V]){
          shown[V]=true;
          ctx.fillStyle='#fff';
          ctx.textAlign='center';
          ctx.font=(0.25*(w/W)>>0)+'px monospace';
          ctx.fillText(V%64,x+w/W/2*(i+0.5),y+h/H/2*(j+0.6));
        }/**/
      }
    }
  }
  /*
  ctx.textAlign='left';
  for(let i=0;i<256;i++){
    shown[i]=shown[i]?shown[i]:0;
  }
  ctx.fillText(shown.map((a,b)=>a||!fairwayAssets[b]||fairwayAssets[b].img===grass?'':b+',').join(''),20,y+h+w/W/2);/**/

  ctx.drawImage(flag,
    x + w / W * hole.hole.x >> 0,
    y + h / H * (hole.hole.y - 1) >> 0,
    (x + w / W * (hole.hole.x + 1) >> 0) - (x + w / W * hole.hole.x >> 0),
    (y + h / H * (hole.hole.y + 1) >> 0) - (y + h / H * (hole.hole.y - 1) >> 0));

  for(let m of allMachines) {
    if(m.type == 'trapDoor') {
      m.draw(m, x, y, w, h);
    }
  }

  drawStaticObject(x, y, ball.c_position.c.x, ball.c_position.c.y, w / W, golfBallShadow);

  for(let m of allMachines) {
    if(m.type != 'trapDoor') {
      m.draw(m, x, y, w, h);
    }
  }
  drawStaticObject(x, y, ball.c_position.c.x, ball.c_position.c.y, w / W, golfBall);
  if(dev) {
    debugBodies(x, y, w / W);
  }
}

function callHole(x, y, width, height) {
  runHole();
  drawHole(x, y, width, height);
}

function hitBall() {
  hitCountdown = 30;
  hitSound.play();
  let v = Math.random() * Math.PI * 2;

  let dx = hole.hole.x + 0.5 - ball.c_position.c.x;
  let dy = hole.hole.y + 0.45 - ball.c_position.c.y;
  v = Math.atan2(dy, dx);
  let vv = Math.sqrt(dx * dx + dy * dy) * 2 + 2;
  ball.applyForceToCenter(vec2(Math.cos(v) * vv, Math.sin(v) * vv), 1)
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
