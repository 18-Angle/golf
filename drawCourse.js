const DebugBodiesView = false;

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
          ctx.translate((-fixture.m_shape.m_centroid.x) * m, (-fixture.m_shape.m_centroid.y) * m);

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
  ctx.strokeStyle = '#0f0';

  ctx.beginPath();
  ctx.arc(
    (hole.hole.x + 0.5) * m + x,
    (hole.hole.y + 0.45) * m + y,
    0.17 * m, 0, 2 * Math.PI);
  ctx.stroke();
}

//let bottoms = [water,grass,sand,wall1];

function drawHole(x, y, w, h) {
  let W = hole.fairway[0].length,
    H = hole.fairway.length;

  ctx.drawImage(flag,
    x + w / W * (hole.hole.x - 0.58) >> 0,
    y + h / H * (hole.hole.y - 0.98) >> 0,
    (x + w / W * (hole.hole.x + 1) >> 0) - (x + w / W * (hole.hole.x - 1) >> 0),
    (y + h / H * (hole.hole.y + 1) >> 0) - (y + h / H * (hole.hole.y - 1) >> 0));

  let playerShadow = 'normal';

  for(let m of allMachines) {
    if(m.type == 'trapDoor') {
      m.drawShadow(m, x, y, w, h);
      if(
        ball.c_position.c.x + 0.1 > m.x &&
        ball.c_position.c.x - 0.1 < m.x + 1 &&
        ball.c_position.c.y + 0.1 > m.y &&
        ball.c_position.c.y - 0.2 < m.y + 1) {
        playerShadow = 'trap';
      }
    }
  }

  for(let i = W * 2 - 1; i >= 0; i--) {
    for(let j = H * 2 - 1; j >= 0; j--) {
      let ON = getFairway(i / 2 >> 0, j / 2 >> 0);

      let bits = [
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j - 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j - 1) / 2 >> 0),
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j + 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j + 1) / 2 >> 0),
      ];

      let mx = Math.max(Math.max(...bits), 1);

      //drawTile({img:trees}, x, y, w / 2, h / 2, i, j);
      if((bits + '').indexOf('0') >= 0) {
        Bits = bits.map(a => a !== 0 ? 1 : 0);
        Bits.unshift(j % 2);
        drawTile(fairwayAssets[parseInt(Bits.join(''), 2) + (i % 2 ? 32 : 0)], x, y, w / 2, h / 2, i, j);
      }
      if(ON === 0) {
        Bits = bits.map(a => a !== 0 ? 1 : 0);
        Bits.unshift(j % 2);
        drawTile(fairwayAssets[parseInt(Bits.join(''), 2) + (i % 2 ? 32 : 0)], x, y, w / 2, h / 2, i, j);
      }
      for(let m = 2; m < 4; m++) {
        let Bits = bits.map(a => a !== m ? 1 : 0);
        Bits.unshift(j % 2);
        let AS = parseInt(Bits.join(''), 2) + (i % 2 ? 32 : 0) + (m - 1) * 64;
        if(m !== 3 && fairwayAssets[AS]) {
          drawTile(fairwayAssets[AS], x, y, w / 2, h / 2, i, j);
        } else if(fairwayAssets[AS] && fairwayAssets[AS].img === shadowF && fairwayAssets[AS].f) {
          drawTile({ img: wall0 }, x, y, w / 2, h / 2, i, j);
        }
      }
    }
  }

  if(playerShadow === 'normal') {
    drawStaticObject(x, y, ball.c_position.c.x, ball.c_position.c.y, w / W, golfBallShadow);
  }

  for(let m of allMachines) {
    if(m.type != 'trapDoor') {
      m.drawShadow(m, x, y, w, h);
    }
  }

  for(let m of allMachines) {
    if(m.type == 'trapDoor') {
      m.draw(m, x, y, w, h);
    }
  }

  if(playerShadow !== 'normal') {
    drawStaticObject(x, y, ball.c_position.c.x, ball.c_position.c.y, w / W, golfBallShadow);
  }

  switch (ballType) {
    case 'jeff':
      drawObject(x, y, w / W, ball, jeff, 0.25, 0, 0.01);
      break;
    default:
      drawObject(x, y, w / W, ball, golfBall);
      drawStaticObject(x, y, ball.c_position.c.x, ball.c_position.c.y, w / W, golfBallShadow2);
  }

  for(let m of allMachines) {
    if(m.type != 'trapDoor') {
      m.draw(m, x, y, w, h);
    }
  }

  for(let i = W * 2 - 1; i >= 0; i--) {
    for(let j = H * 2 - 1; j >= 0; j--) {
      let ON = getFairway(i / 2 >> 0, j / 2 >> 0);

      let bits = [
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j - 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j - 1) / 2 >> 0),
        getFairway((i / 2 >> 0) + (i % 2 ? 1 : -1), (j + 1) / 2 >> 0),
        getFairway(i / 2 >> 0, (j + 1) / 2 >> 0),
      ];

      let mx = Math.max(Math.max(...bits), 1);

      m = 3;
      bits = bits.map(a => a !== m ? 1 : 0);
      bits.unshift(j % 2);
      let AS = parseInt(bits.join(''), 2) + (i % 2 ? 32 : 0) + (m - 1) * 64;
      if(fairwayAssets[AS]) {
        drawTile(fairwayAssets[AS], x, y, w / 2, h / 2, i, j);
      }
    }
  }
  for(let i = W * 2 - 1; i >= 0; i--) {
    for(let j = H * 2 - 1; j >= 0; j--) {
      if(getFairway(i / 2 >> 0, (j + 1) / 2 >> 0) === 3) {
        //drawTile({ img: wall0 }, x, y, w / 2, h / 2, i, j);
      }
    }
  }

  ctx.drawImage(flagPole,
    x + w / W * (hole.hole.x - 0.58) >> 0,
    y + h / H * (hole.hole.y - 0.98) >> 0,
    (x + w / W * (hole.hole.x + 1) >> 0) - (x + w / W * (hole.hole.x - 1) >> 0),
    (y + h / H * (hole.hole.y + 1) >> 0) - (y + h / H * (hole.hole.y - 1) >> 0));

  if(dev) {
    debugBodies(x, y, w / W);
  }
}
