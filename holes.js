let holes = [
  [],
  [{
      tee: { x: 0, y: 2 },
      hole: { x: 7, y: 2 },
      fairway: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      machines: [{
          type: "piston",
          variety: "square",
          rotation: 0.25,
          x: -0.5,
          y: 2
        },
        {
          type: "gate",
          rotation: 0,
          active: true,
          x: 6.5,
          y: 2,
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
        [1, 2, 2, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 3, 1],
        [1, 0, 0, 1, 0, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      machines: [{
          type: "piston",
          variety: "square",
          rotation: 0.25,
          power: 2,
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
      tee: { "x": 2, "y": 4.8 },
      hole: { "x": 0.1, "y": 3.9 },
      fairway: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 1, 3, 1],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 1],
        [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      machines: [
        {
          "type": "piston",
          "variety": "left-angle",
          "rotation": 0,
          "power": 1.7,
          "x": 2,
          "y": 6
        },
        {
          "type": "piston",
          "variety": "square",
          "rotation": 0.5,
          "power": 1.7,
          "x": 4,
          "y": 1
        }, {
          "type": "piston",
          "variety": "square",
          "rotation": 0.05,
          "power": 1.7,
          "x": 4.5,
          "y": 6
        }, {
          "type": "piston",
          "variety": "square",
          "rotation": 0.48,
          "power": 1.7,
          "x": 7,
          "y": 1
        }, {
          "type": "wedge",
          "variety": "left-angle",
          "rotation": 0.75,
          "power": 2,
          "x": 8,
          "y": 4
        }, {
          "type": "wedge",
          "variety": "left-angle",
          "rotation": 0,
          "power": 2,
          "x": 0.2,
          "y": 4.3
        }, {
          "type": "wedge",
          "variety": "left-angle",
          "rotation": 0.25,
          "power": 2,
          "x": 0.2,
          "y": 3.3
        }
      ],
      "par": 3,
      "best": 0
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
