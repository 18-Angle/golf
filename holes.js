let holes = [
  [],
  [
    // Line Drive
    {
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
    //not-castle
    {
      "tee": { "x": 2.2, "y": 5 },
      "hole": { "x": 2, "y": 4 },
      "fairway": [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 2, 2, 2, 2, 2, 2, 3, 1],
        [1, 2, 2, 2, 1, 1, 2, 2, 2, 1]
      ],
      "machines": [{ "type": "piston", "variety": "square", "rotation": 0.25, "power": 5, "x": 1.6, "y": 5 }, { "type": "piston", "variety": "right-angle", "rotation": 0.25, "power": 0.6, "x": 1.2, "y": 3 }, { "type": "wedge", "rotation": 0.75, "x": 7, "y": 5 }, { "type": "wedge", "rotation": 0.5, "x": 7, "y": 2 }, { "type": "wedge", "rotation": 0.25, "x": 2, "y": 2 }],
      "par": 3,
      "best": 0
    },
    //triple piston
    {
      "tee": { "x": 7, "y": -0.2 },
      "hole": { "x": 1, "y": 3 },
      "fairway": [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1, 1, 1],
        [1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
        [1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
        [1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      "machines": [{ "type": "piston", "variety": "square", "rotation": 0.5, "power": 0.5, "x": 7, "y": -1 }, { "type": "piston", "variety": "square", "rotation": 0.75, "power": 2, "x": 8, "y": 2 }, { "type": "piston", "variety": "square", "rotation": 0.75, "power": 5, "x": 8, "y": 3 }, { "type": "piston", "variety": "square", "rotation": 0.75, "power": 10, "x": 8, "y": 4 }, { "type": "wedge", "variety": "square", "rotation": 0, "power": 50, "x": 1, "y": 4 }, { "type": "wedge", "variety": "square", "rotation": 0.25, "power": 15, "x": 1, "y": 2 }],
      "par": 3,
      "best": 0
    },
    //double-tap
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
    //zig-zag
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
      machines: [{
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

    //pinball
    {
      "tee": { "x": 3.4, "y": 5.9 },
      "hole": { "x": 4, "y": 1.5 },
      "fairway": [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 1, 1, 1, 1, 1, 3, 2],
        [2, 3, 1, 1, 1, 1, 1, 3, 2],
        [2, 3, 1, 1, 1, 1, 1, 3, 2],
        [2, 3, 1, 1, 1, 1, 1, 3, 2],
        [2, 1, 3, 1, 1, 1, 3, 1, 2],
        [1, 2, 2, 2, 2, 2, 2, 2, 1]
      ],
      "machines": [{ "type": "flipper", "variety": "right", "active": false, "rotation": 0, "x": 4.9, "y": 6 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0, "x": 3.1, "y": 6 }, { "type": "wedge", "rotation": 0.25, "x": 2, "y": 0.7 }, { "type": "wedge", "rotation": 0.5, "x": 5.99, "y": 0.7 }, { "type": "piston", "variety": "square", "rotation": 0.5, "power": 2, "x": 4, "y": -0.3 }, { "type": "piston", "variety": "square", "rotation": 0.5, "power": 2, "x": 3, "y": -0.3 }, { "type": "piston", "variety": "square", "rotation": 0.5, "power": 2, "x": 5, "y": -0.3 }],
      "par": 3,
      "best": 0
    },
    //maze
    {
      tee: { x: 0.8, y: 5.8 },
      hole: { x: 12, y: 7 },
      fairway: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 3, 1, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 1, 3, 1, 1, 3, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      machines: [{
          type: "piston",
          variety: "square",
          rotation: 0.250,
          power: 2,
          x: 0.2,
          y: 6,
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0,
          power: 2,
          x: 7,
          y: 6.8
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0.250,
          power: 2,
          x: 6,
          y: 2.1
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0.5,
          power: 2,
          x: 12,
          y: 1.2
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0,
          power: 2,
          x: 12,
          y: 8.9
        },
      ],
      par: 3,
      best: 0
    },
    //zig zag 2
    {
      tee: { x: 4, y: 7.6 },
      hole: { x: 3.5, y: 2 },
      fairway: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 3, 3, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 2, 0, 0, 0],
        [0, 0, 1, 1, 1, 2, 2, 0, 0],
        [0, 1, 1, 1, 1, 1, 2, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      machines: [{
        type: "piston",
        variety: "square",
        rotation: 0.15,
        power: 0.9,
        x: 3.5,
        y: 7.9
      }, {
        type: "piston",
        variety: "square",
        rotation: 0.77,
        power: 0.9,
        x: 7,
        y: 6
      }, {
        type: "piston",
        variety: "right-angle",
        rotation: 0,
        power: 0.9,
        x: 1,
        y: 5
      }],
      par: 3,
      best: 0
    },

    //hard-through piston triangle
    {
      "tee": { "x": 1.2, "y": 4 },
      "hole": { "x": 3, "y": 1 },
      "fairway": [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 3, 1, 1, 1, 0, 0, 3, 1],
        [2, 2, 2, 1, 1, 1, 1, 0, 3, 1],
        [2, 2, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 3, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
      ],
      "machines": [{ "type": "piston", "variety": "square", "rotation": 0.25, "power": 3, "x": 0.6, "y": 4 }, { "type": "piston", "variety": "left-angle", "rotation": 0, "power": 1, "x": 5, "y": 4.5 }, { "type": "wedge", "rotation": 0.75, "x": 7, "y": 4 }, { "type": "wedge", "rotation": 0.5, "x": 7, "y": 3 }, { "type": "gate", "rotation": 0.875, "active": true, "x": 5.1, "y": 1 }],
      "par": 3,
      "best": 0
    },
    //flipper level
    {
      "tee": { "x": 0.6, "y": 2 },
      "hole": { "x": 9, "y": 2 },
      "fairway": [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      "machines": [{ "type": "flipper", "variety": "right", "active": false, "rotation": 0.45, "x": 0.4, "y": 2 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 1, "y": 4 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 2, "y": 4 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 3, "y": 4 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 4, "y": 4 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 5, "y": 4 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 6, "y": 4 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 7, "y": 4 }, { "type": "flipper", "variety": "right", "active": false, "rotation": 0.05, "x": 8, "y": 4 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 1, "y": 0 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 2, "y": 0 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 3, "y": 0 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 4, "y": 0 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 5, "y": 0 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 6, "y": 0 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 7, "y": 0 }, { "type": "flipper", "variety": "left", "active": false, "rotation": 0.45, "x": 8, "y": 0 }, { "type": "wedge", "rotation": 0.5, "x": 9, "y": 0 }, { "type": "wedge", "rotation": 0.75, "x": 9, "y": 4 }],
      "par": 3,
      "best": 0
    },

    //tight window
    {
      "tee":{"x":1.7,"y":3},"hole":{"x":11,"y":3},"fairway":[[1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,1,0,0,0,0,0,0,0],[1,2,2,1,1,0,1,0,0,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,1,1,0,1,0,0,1,0,0],[1,2,2,2,1,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1]],"machines":[{"type":"piston","variety":"square","rotation":0.25,"power":0.8,"x":1,"y":3},{"type":"piston","variety":"right-angle","rotation":0,"power":0.25,"x":8.9,"y":3.5},{"type":"piston","variety":"right-angle","rotation":0.5,"power":0.5,"x":5.9,"y":2.5},{"type":"trapDoor","x":10,"y":3,"active":true},{"type":"trapDoor","x":7,"y":3,"active":true}],"par":3,"best":0
  },

    //Nick's insanity
    {
      "tee": { "x": 7.8, "y": 3 },
      "hole": { "x": 9, "y": 3 },
      "fairway": [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      "machines": [{ "type": "gate", "rotation": 0.5, "active": false, "x": 8, "y": 3 }, { "type": "piston", "variety": "square", "rotation": 0.125, "power": 1.5, "x": 1.5, "y": 6 }, { "type": "piston", "variety": "square", "rotation": 0.5, "power": 1, "x": 2.5, "y": 2 }, { "type": "piston", "variety": "square", "rotation": 0.5, "power": 0.5, "x": 6, "y": 2.4 }, { "type": "piston", "variety": "square", "rotation": 0.25, "power": 2, "x": 4, "y": 6 }, { "type": "wedge", "rotation": 0.625, "x": 6.5, "y": 4 }, { "type": "wedge", "rotation": 0.75, "x": 9, "y": 6 }],
      "par": 3,
      "best": 0
    },

    //impossible
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
  [
    //around
    {
      tee: { x: 2.5, y: 3.3 },
      hole: { x: 4, y: 3.3 },
      fairway: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      machines: [{
          type: "piston",
          variety: "square",
          rotation: 0,
          power: 0.2,
          x: 2.5,
          y: 4,
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0.250,
          power: 0.5,
          x: 1.5,
          y: 2,
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0.5,
          power: 0.3,
          x: 4,
          y: 1.1,
        },
        {
          type: "piston",
          variety: "square",
          rotation: 0.750,
          x: 6,
          y: 3.3
        },
      ],
      par: 3,
      best: 0
    },
    //back and forth
    {
      "tee":{"x":2.2,"y":4},"hole":{"x":8,"y":1},"fairway":[[0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,0,0,0],[0,1,1,1,1,1,1,1,1,0,0],[0,1,1,1,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,0]],"machines":[{"type":"piston","variety":"square","rotation":0.25,"power":1,"x":1.6,"y":4},{"type":"piston","variety":"square","rotation":0.8,"power":1,"x":7.8,"y":4.3},{"type":"piston","variety":"square","rotation":0.25,"power":2,"x":1.6,"y":1.5}],"par":3,"best":0
  },

    //impossible
    {
      tee: { x: 4, y: 3 },
      hole: { x: 9, y: 3 },
      fairway: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 2, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 0],
        [0, 0, 1, 2, 2, 1, 2, 2, 2, 1, 0],
        [0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        }
      ]
    },
  ],
  [],
  []
];
