let onHole = [-1, 0, 0, 0, 0];
let playingHole = 0;

let pl = planck,
  vec2 = pl.Vec2;
let world = new pl.World({
  gravity: vec2(0, 0)
});

let holeAR = 1, hole;

let ballD = {
  bullet:true,
  linearDamping:1,
  angularDamping:1.6
};
let ballFD = {
  friction:0.9,
  density:1.0,
};

let ball;

function setupHole(L) {
  sb = 3;
  playingHole = L;

  world = new pl.World({
    gravity: vec2(0, 0)
  });

  hole = holes[playingCourse][playingHole];
  holeAR = hole.fairway[0].length/hole.fairway.length;

  ball = world.createDynamicBody(ballD);
  ball.createFixture(pl.Circle(0.4), ballFD);
  ball.setPosition(vec2(hole.tee.x+0.5, hole.tee.y+0.5));
}

function runHole() {
  let W=hole.fairway[0].length, H=hole.fairway.length;
  for(let x=W-1;x>=0;x--){
    for(let y=H-1;y>=0;y--){
      switch(hole.fairway[y][x]){
        case(1):
          if(ball.c_position.c.x>>0 === x && ball.c_position.c.y>>0 === y ){
            ball.setLinearVelocity(ball.m_linearVelocity.mul(0.9));
          }
        break;
      }
    }
  }
  world.step(1 / 60);
}

let fairwayAssets=[water,trees,fairway,green];

function drawObject(x,y,m,obj,image,s=1){
  ctx.translate(x,y);
  ctx.translate(obj.c_position.c.x*m,obj.c_position.c.y*m);
  ctx.rotate(-obj.c_position.a);
  ctx.drawImage(image,-m*s/2>>0,-m*s/2>>0,m*s>>0,m*s>>0);
  ctx.setTransform();
}

function drawHole(x, y, w, h) {
  let W=hole.fairway[0].length, H=hole.fairway.length;
  for(let i=W-1;i>=0;i--){
    for(let j=H-1;j>=0;j--){
      ctx.drawImage(fairwayAssets[hole.fairway[j][i]], x+w/W*i >> 0, y+h/H*j >> 0, (x+w/W*(i+1) >> 0)-(x+w/W*i >> 0), (y+h/H*(j+1) >> 0)-(y+h/H*j >> 0));
    }
  }
  ctx.drawImage(flag, x+w/W*hole.hole.x >> 0, y+h/H*(hole.hole.y-1) >> 0, (x+w/W*(hole.hole.x+1) >> 0)-(x+w/W*hole.hole.x >> 0), (y+h/H*(hole.hole.y+1) >> 0)-(y+h/H*(hole.hole.y-1) >> 0));

  drawObject(x,y,w/W,ball,golfBall,0.5);
}

function callHole(x, y, width, height) {
  //ctx.drawImage(lock, x >> 0, y >> 0, width >> 0, height >> 0);
  runHole();
  drawHole(x, y, width, height);
}

function activateStuff(){
  let v=Math.random()*Math.PI*2;

  let dx=hole.hole.x+0.5-ball.c_position.c.x;
  let dy=hole.hole.y+0.6-ball.c_position.c.y;
  v=Math.atan2(dy,dx);
  let vv=Math.sqrt(dx*dx+dy*dy)*10;
  ball.applyForceToCenter(vec2(Math.cos(v)*vv,Math.sin(v)*vv),1)
}

function s3(tx, ty) {
  let s = standardUnit;
  let ar = holeAR;
  button(0, 0, s, 0.4 * s, () => { sb = 2 }, back, backb);
  button(w / 2 - s / 2, h - 0.4 * s, s, 0.4 * s, activateStuff, play, playb);

  if(ar * (h - 0.8 * s) < w - s * 2) {
    callWithinAR(s, 0, w - s * 2, h - 0.4 * s, ar, callHole);
  } else {
    callWithinAR(0, 0.4 * s, w, h - 0.8 * s, ar, callHole);
  }
}
