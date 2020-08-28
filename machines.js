function nullFunction() {}

function drawPistonShadow(obj, x, y, w, h) {
  let W = hole.fairway[0].length;

  drawStaticObject(x, y, obj.x + 0.52, obj.y + 0.52, w / W, pistonBlockShadow, 1, obj.rotation, 0, 0);
  drawStaticObject(x, y, obj.x + 0.54, obj.y + 0.54, w / W, pistonBlockShadow, 1, obj.rotation, 0, 0);
  drawStaticObject(x, y, obj.x + 0.56, obj.y + 0.56, w / W, pistonBlockShadow, 1, obj.rotation, 0, 0);

  switch (obj.variety) {
    case 'left-angle':
      drawObject(x + w / W * 0.02, y + w / W * 0.02, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2, true);
      drawObject(x + w / W * 0.04, y + w / W * 0.04, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2, true);
      drawObject(x + w / W * 0.06, y + w / W * 0.06, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2, true);
      break;
    case 'right-angle':
      drawObject(x + w / W * 0.02, y + w / W * 0.02, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2);
      drawObject(x + w / W * 0.04, y + w / W * 0.04, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2);
      drawObject(x + w / W * 0.06, y + w / W * 0.06, w / W, obj.body, triPistonShadow, 1, 0, 0, 0.45 - 1, 2);
      break;
    default:
      drawObject(x + w / W * 0.02, y + w / W * 0.02, w / W, obj.body, pistonShadow, 1, 0, 0, 0.45);
      drawObject(x + w / W * 0.04, y + w / W * 0.04, w / W, obj.body, pistonShadow, 1, 0, 0, 0.45);
      drawObject(x + w / W * 0.06, y + w / W * 0.06, w / W, obj.body, pistonShadow, 1, 0, 0, 0.45);
  }
}

function drawPiston(obj, x, y, w, h) {
  let W = hole.fairway[0].length;

  let maxExtend = 1.22;

  if(Math.sqrt(Math.pow(obj.body.c_position.c.x + obj.body.c_velocity.v.x / 60 - obj.x - 0.5, 2) + Math.pow(obj.body.c_position.c.y + obj.body.c_velocity.v.y / 60 - obj.y - 0.5, 2)) > maxExtend) {
    obj.body.setLinearVelocity(vec2(-Math.sin(obj.rotation * Math.PI), Math.cos(obj.rotation * Math.PI)));
  }
  //*
  switch (obj.variety) {
    case 'left-angle':
      drawObject(x, y, w / W, obj.body, triPiston, 1, 0, 0, 0.45 - 1, 2, true);
      break;
    case 'right-angle':
      drawObject(x, y, w / W, obj.body, triPiston, 1, 0, 0, 0.45 - 1, 2);
      break;
    default:
      drawObject(x, y, w / W, obj.body, piston, 1, 0, 0, 0.45);
  } /**/
  drawStaticObject(x, y, obj.x + 0.5, obj.y + 0.5, w / W, pistonBlock, 1, obj.rotation, 0, 0);
}


function activatePiston(piston) {
  if(ball.isActive() && piston.body.c_velocity.v.length() > 0.01) { return; }
  let pistonStrength = 290 * (piston.power ? piston.power : 1);
  piston.body.applyForceToCenter(vec2(
    Math.sin(piston.body.getAngle()) * pistonStrength,
    -Math.cos(piston.body.getAngle()) * pistonStrength), true);
}


function drawGateShadow(obj, x, y, w, h) {
  let W = hole.fairway[0].length;
  drawObject(x + w / W * 0.02, y + w / W * 0.02, w / W, obj.gate1, gateShadow, 1, 0.5, 0, -0.25);
  drawObject(x + w / W * 0.04, y + w / W * 0.04, w / W, obj.gate1, gateShadow, 1, 0.5, 0, -0.25);
  drawObject(x + w / W * 0.06, y + w / W * 0.06, w / W, obj.gate1, gateShadow, 1, 0.5, 0, -0.25);

  drawObject(x + w / W * 0.02, y + w / W * 0.02, w / W, obj.gate2, gateShadow, 1, 0, 0, -0.25);
  drawObject(x + w / W * 0.04, y + w / W * 0.04, w / W, obj.gate2, gateShadow, 1, 0, 0, -0.25);
  drawObject(x + w / W * 0.06, y + w / W * 0.06, w / W, obj.gate2, gateShadow, 1, 0, 0, -0.25);
}

function drawGate(obj, x, y, w, h) {
  let W = hole.fairway[0].length;
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
    if(door.active &&
      ball.c_position.c.x > door.x &&
      ball.c_position.c.y > door.y &&
      ball.c_position.c.x < door.x + 1 &&
      ball.c_position.c.y < door.y + 1) {
      setupHole(playingHole, false);
    }
  }
  drawTile({ img: door.active ? trapDoorOpen : trapDoor }, x, y, w, h, door.x, door.y);
}

function activateTrapDoor(door) {
  door.active = !door.active;
}


function drawWedgeShadow(obj, x, y, w, h) {
  let W = hole.fairway[0].length;

  drawStaticObject(x, y, obj.x + 0.52, obj.y + 0.52, w / W, wedgeShadow, 1, obj.rotation, 0, 0);
  drawStaticObject(x, y, obj.x + 0.54, obj.y + 0.54, w / W, wedgeShadow, 1, obj.rotation, 0, 0);
  drawStaticObject(x, y, obj.x + 0.56, obj.y + 0.56, w / W, wedgeShadow, 1, obj.rotation, 0, 0);
}

function drawWedge(obj, x, y, w, h) {
  let W = hole.fairway[0].length;

  drawStaticObject(x, y, obj.x + 0.5, obj.y + 0.5, w / W, wedge, 1, obj.rotation, 0, 0);
}

function machine(m) {
  switch (m.type) {
    case 'trapDoor': {
      let obj = {
        active: 0,
        drawShadow: nullFunction,
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
        drawShadow: drawGateShadow,
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
        drawShadow: drawPistonShadow,
        draw: drawPiston,
        activate: activatePiston
      };
      for(let v in m) {
        obj[v] = m[v];
      }
      return obj;
    }
    case 'wedge': {
      let block = world.createBody(vec2(m.x + 0.5, m.y + 0.5));
      block.setAngle(Math.PI * 2 * m.rotation);
      block.createFixture(pl.Polygon([
        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
      ]), 1);
      let obj = {
        body: block,
        drawShadow: drawWedgeShadow,
        draw: drawWedge,
        activate: a => {}
      };
      for(let v in m) {
        obj[v] = m[v];
      }
      return obj;
    }
    default:
      return {
        body: 0,
          drawShadow: nullFunction,
          draw: nullFunction,
          activate: nullFunction
      };
  }
}
