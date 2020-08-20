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
