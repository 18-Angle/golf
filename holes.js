/*
Key:
0 - water
1 - thick-grass
2 - fareway
3 - green

#0 - slope NW
#1 - slope N
#2 - slope NE
#3 - slope W
#4 - no slope
#5 - slope E
#6 - slope SW
#7 - slope S
#8 - slope SE

*/

let holes = [
  [],
  [{
    tee: { x: 2, y: 3 },
    hole: { x: 10, y: 3 },
    fairway: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
      [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
      [0, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 0],
      [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
      [0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    machines: [{
        type: "piston",
        variety: "square",
        rotation: 0,
        x: 4,
        y: 5
      },
      {
        type: "piston",
        variety: "left-angle",
        rotation: 0.5,
        x: 8,
        y: 1
      },
      {
        type: "trap-door",
        variety: "square",
        rotation: 0,
        x: 4,
        y: 5
      }
    ],
    par: 3,
    best: 0
  }, {
    tee: { x: 1, y: 2 },
    hole: { x: 7, y: 2 },
    fairway: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 3, 3, 1],
      [1, 3, 3, 1, 0, 0, 3, 3, 1],
      [1, 3, 3, 2, 1, 0, 2, 3, 1],
      [1, 1, 2, 2, 2, 2, 2, 1, 1],
      [1, 1, 1, 2, 2, 2, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    par: 3,
    best: 0
  }, ],
  [],
  [],
  []
];
