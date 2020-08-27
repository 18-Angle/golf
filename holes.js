let holes = [
  [],
  [
    {
      tee: { x: 1.5, y: 2 },
      hole: { x: 7, y: 2 },
      fairway: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      machines: [{
          type: "piston",
          variety: "square",
          rotation: 0.25,
          power: 1,
          x: 0.5,
          y: 2
        },
        {
          type: "gate",
          rotation: 0,
          active: true,
          x: 6,
          y: 2
        },
      ],
      par: 3,
      best: 0
    },
    {
      tee: { x: 0.6, y: 2 },
      hole: { x: 5, y: 1 },
      fairway: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 3, 1],
        [1, 0, 0, 1, 0, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 1, 1],
      ],
      machines: [{
          type: "piston",
          variety: "square",
          rotation: 0.25,
          power:2,
          x: 0,
          y: 2
        }, {
          type: "piston",
          variety: "square",
          rotation: 0,
          x: 3,
          y: 2.75
        }, {
          type: "wedge",
          rotation: .25,
          x: 3,
          y: 1
        }, {
          type: "gate",
          rotation: 0.5,
          active: false,
          x: 4,
          y: 1
        }

      ],
      par: 3,
      best: 0
    },
    {
      tee: { x: 4, y: 3 },
      hole: { x: 9, y: 3 },
      fairway: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 0, 1, 2, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1],
        [1, 0, 1, 2, 2, 1, 2, 2, 2, 1, 1],
        [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      machines: [{
          type: "gate",
          rotation: 0,
          x: 5,
          y: 3
        },
        {
          type: "trapDoor",
          x: 8,
          y: 3
        },
        {
          type: "gate",
          rotation: 0.5,
          active: true,
          x: 6,
          y: 2
        },
        {
          type: "piston",
          variety: "left-angle",
          rotation: 0.25,
          x: 2,
          y: 3
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0,
          x: 3,
          y: 6
        },
      ]
    },
  ],
  [],
  [],
  []
];
