const MAP = {
  '{"tee":{"x":': '<',
  '},"hole":{"x":': 'Z',
  '},"fairway":[[': '*',
  ']],"machines":[{': '!',
  '"type":': 'E',
  '"piston",': 'P',
  '"trapdoor",': 'D',
  '"flipper",': 'J',
  '"circle",': 'C',
  '"wedge",': 'W',
  '"gate",': 'G',
  '"ball",': 'B',
  '"square",': 'S',
  '"variety":': 'V',
  '"rotation":': 'O',
  '"power":': 'M',
  '"active":': 'A',
  'true': 'T',
  'false': 'F',
  '"left"': 'L',
  '"right"': 'R',
  '"left-angle"': '@',
  '"right-angle"': '^',
  '}],"par":': 'N',
  '"x":': 'X',
  '"y":': 'Y',

  '},{': '~',
  '0.': '\'',
  '0,0,0,': '(',
  '1,1,1,': ')',
  '0,': 'H',
  '1,': 'K',
  '2,': 'Q',
  '3,': 'U',
  '],[': '_',
  ',': 'I',

};

function compressor(txt) {
  let ans = JSON.stringify(txt);
  ans = ans.replace(',"best":0', '');
  for(let m in MAP) {
    while(ans.indexOf(m) >= 0) {
      ans = ans.replace(m, MAP[m]);
    }
  }
  return ans.slice(1,ans.length-1);
}

function decompressor(txt) {
  let ans = '<'+txt+'}';
  let temp = txt;
  temp = temp.replace(/[A-Z0-9*$()>.'#-_!~]+/, '');
  if(temp !== '') {
    console.error(`invalid character: ${temp[0]}`);
    return;
  }
  let kys = Object.keys(MAP);
  for(let i = kys.length - 1; i >= 0; i--) {
    let m = kys[i];
    while(ans.indexOf(MAP[m]) >= 0) {
      ans = ans.replace(MAP[m], m);
    }
  }
  console.log(ans);

  let obj;
  try {
    obj = JSON.parse(ans);
  } catch (e) {
    console.error(`non-compliant`,ans);
    return;
  }

  if(ans !== JSON.stringify(obj)) {
    console.error(`non-compliant`);
    return;
  }

  if(Object.keys(obj) + '' !== 'tee,hole,fairway,machines,par') {
    console.error(`bad keys`);
    return;
  }
  if(typeof obj.tee !== 'object' || Object.keys(obj.tee) + '' !== 'x,y') {
    console.error(`bad keys`);
    return;
  }
  if(typeof obj.hole !== 'object' || Object.keys(obj.hole) + '' !== 'x,y') {
    console.error(`bad keys`);
    return;
  }
  if(!Array.isArray(obj.fairway) || !Array.isArray(obj.fairway[0]) || !Array.isArray(obj.fairway[obj.fairway.length - 1])) {
    console.error(`bad keys`);
    return;
  }

  if(obj.fairway.toString().replace(/[0-3,]+/, '') !== '' || obj.fairway[0].length <= 0) {
    console.error(`bad fairway`);
    return;
  }

  if(!Array.isArray(obj.machines)) {
    console.error(`bad machines`);
    return;
  }

  for(let i = 0; i < obj.machines.length; i++) {
    if(typeof obj.machines[i] !== 'object') {
      console.error(`bad machines`);
      return;
    }
    let kys = Object.keys(obj.machines[i]);
    if(kys.indexOf('x') < 0 || kys.indexOf('y') < 0 || kys.indexOf('type') < 0) {
      console.error(`missing keys`);
      return;
    }
  }

  return obj;
}


function drawlevelEditor() {

}

//loads level
(new URL(window.location.href)).searchParams.forEach((x, y) =>{
  if(y==='level'){
    let lvl = decompressor(x);
    if(lvl){
      holes[0][0] = lvl;
      playingCourse = 0;
      setupHole(0);
      toggleMusic();
      toggleSound();
    }
  }
})
