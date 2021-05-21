const noteData = [[], [], [], []];

class Upg {
  constructor(type, cost, weight, desc, effect, arg, condition) {
    noteData[type].push(this);
    this.type = type;
    this.cost = cost;
    this.weight = weight;
    this.desc = desc;
    this.effect = effect;
    this.arg = arg;
    this.condition = condition;
  }
}

// yellow
new Upg(
  0,
  [0, 0, 0, 0],
  10,
  "+1 note",
  getNotes,
  [0, 1],
  () => player.rate[0] < 2
);
new Upg(
  0,
  [0, 0, 0, 0],
  10,
  "+2 notes",
  getNotes,
  [0, 2],
  () => player.notes[0] >= 5 && player.rate[0] < 4
);
new Upg(
  0,
  [0, 0, 0, 0],
  5,
  "+5 notes",
  getNotes,
  [0, 5],
  () => player.notes[0] >= 20 && player.rate[0] < 10
);
new Upg(
  0,
  [100, 0, 0, 0],
  2,
  "+1 blue note",
  getNotes,
  [1, 1],
  () => player.notes[0] >= 50 && player.rate[1] < 2
);
new Upg(
  0,
  [250, 0, 0, 0],
  1,
  "+2 blue notes",
  getNotes,
  [1, 2],
  () => player.notes[1] >= 5 && player.rate[1] < 4
);
new Upg(
  0,
  [650, 0, 0, 0],
  0.5,
  "+5 blue notes",
  getNotes,
  [1, 5],
  () => player.notes[1] >= 20 && player.rate[1] < 10
);
new Upg(
  0,
  [1000, 100, 0, 0],
  2,
  "+1 green note",
  getNotes,
  [2, 1],
  () => player.notes[1] >= 50 && player.rate[2] < 2
);
new Upg(
  0,
  [2500, 250, 0, 0],
  1,
  "+2 green notes",
  getNotes,
  [2, 2],
  () => player.notes[2] >= 5 && player.rate[2] < 4
);
new Upg(
  0,
  [6500, 650, 0, 0],
  0.5,
  "+5 green notes",
  getNotes,
  [2, 5],
  () => player.notes[2] >= 20 && player.rate[2] < 10
);
new Upg(
  0,
  [0, 0, 0, 0],
  50,
  "Reset notes & note/s at the cost of all blue note/s",
  () => {
    player.notes[0] = 0;
    player.rate[0] = 0;
    player.rate[1] = 0;
  },
  [],
  () => player.rate[0] < 0 && player.notes[0] < -10
);
new Upg(
  0,
  [0, 0, 0, 0],
  0.01,
  "Gain notes equal to 1 minute of production",
  getNotes,
  [0, () => player.rate[0] * 60],
  () => player.rate[0] > 0
);
new Upg(
  0,
  [0, 0, 0, 0],
  0.01,
  "Gain blue notes equal to 1 minute of production",
  getNotes,
  [1, () => player.rate[1] * 60],
  () => player.rate[1] > 0
);
new Upg(
  0,
  [0, 0, 0, 0],
  0.1,
  "Does nothing",
  () => {},
  [],
  () => true
);

// blue
new Upg(
  1,
  [5, 0, 0, 0],
  10,
  "+0.1 notes/s",
  addRate,
  [0, 0.1],
  () => player.rate[0] < 1
);
new Upg(
  1,
  [15, 0, 0, 0],
  5,
  "+0.2 notes/s",
  addRate,
  [0, 0.2],
  () => player.rate[0] >= 0.5 && player.rate[0] < 2
);
new Upg(
  1,
  [50, 1, 0, 0],
  4,
  "+0.5 notes/s",
  addRate,
  [0, 0.5],
  () => player.rate[0] >= 2
);
new Upg(
  1,
  [20, 0, 0, 0],
  3,
  "+5% blue chance, -5% yellow chance",
  chanceExch,
  [0, 1, 0.05],
  () => player.notes[0] >= 20 && player.noteChance[0] > 0.01
);
new Upg(
  1,
  [20, 0, 0, 0],
  3,
  "+5% yellow chance, -5% blue chance",
  chanceExch,
  [1, 0, 0.05],
  () => player.notes[0] >= 20 && player.noteChance[1] > 0.01
);
new Upg(
  1,
  [50, 5, 0, 0],
  1,
  "+5% green chance, -5% blue chance",
  chanceExch,
  [1, 2, 0.05],
  () => player.notes[1] >= 5 && player.noteChance[1] > 0.01
);
new Upg(
  1,
  [50, 5, 0, 0],
  1,
  "+5% blue chance, -5% green chance",
  chanceExch,
  [2, 1, 0.05],
  () => player.notes[1] >= 5 && player.noteChance[2] > 0.01
);
new Upg(
  1,
  [200, 5, 0, 0],
  2,
  "+1 notes/s",
  addRate,
  [0, 1],
  () => player.rate[0] >= 5
);
new Upg(
  1,
  [1000, 25, 1, 0],
  2,
  "+5 notes/s",
  addRate,
  [0, 5],
  () => player.rate[0] >= 25
);
new Upg(
  1,
  [0, 0, 0, 0],
  0.1,
  "Does nothing",
  () => {},
  [],
  () => true
);
// green
new Upg(
  2,
  [0, 1, 0, 0],
  10,
  "Gain notes equal to current blue notes * 10",
  getNotes,
  [0, () => player.notes[1] * 10],
  () => true
);
new Upg(
  2,
  [500, 10, 0, 0],
  5,
  "+0.01 blue note/s",
  addRate,
  [1, 0.01],
  () => player.notes[1] >= 10 && player.rate[1] < 0.1
);
new Upg(
  2,
  [1000, 20, 0, 0],
  5,
  "+0.02 blue note/s",
  addRate,
  [1, 0.02],
  () => player.rate[1] >= 0.05 && player.rate[1] < 0.2
);
new Upg(
  2,
  [2500, 100, 1, 0],
  5,
  "+0.05 blue note/s",
  addRate,
  [1, 0.05],
  () => player.rate[1] >= 0.2 && player.rate[1] < 0.5
);
new Upg(
  2,
  [5000, 300, 1, 0],
  2,
  "Decrease post spawn interval by 100 ms",
  addPostDelay,
  [-100],
  () => player.postDelay > 500
);
new Upg(
  2,
  [5000, 300, 1, 0],
  2,
  "Increase post spawn interval by 100 ms",
  addPostDelay,
  [100],
  () => player.postDelay < 1000 * 60
);
new Upg(
  2,
  [1e4, 500, 3, 0],
  1,
  "+1 board space (up to 10)",
  expandBoard,
  [1, 10],
  () => player.boardSpace < 10
);
new Upg(
  2,
  [0, 0, 1, 0],
  3,
  "Double all production for 1 minute",
  setDoubleTime,
  [60000],
  () => player.notes[2] >= 1 && player.doubleTime <= 0
);
new Upg(
  2,
  [2000, 200, 1, 0],
  2.5,
  "+0.1 blue note/s but -2 note/s",
  () => {
    addRate(1, 0.1);
    addRate(0, -2);
  },
  [],
  () => player.rate[1] >= 0.1 && player.rate[0] >= 2 && player.rate[1] < 1
);
new Upg(
  2,
  [4000, 400, 2, 0],
  2.5,
  "+0.2 blue note/s but -5 note/s",
  () => {
    addRate(1, 0.2);
    addRate(0, -5);
  },
  [],
  () => player.rate[1] >= 0.2 && player.rate[0] >= 5 && player.rate[1] < 2
);
new Upg(
  2,
  [10000, 1000, 4, 0],
  2.5,
  "+0.5 blue note/s but -15 note/s",
  () => {
    addRate(1, 0.5);
    addRate(0, -15);
  },
  [],
  () => player.rate[1] >= 0.5 && player.rate[0] >= 15
);
new Upg(
  2,
  [0, 0, 0, 0],
  0.1,
  "Does nothing",
  () => {},
  [],
  () => true
);
// purple

function getTotalWeight(type) {
  let sum = 0;
  for (let i in noteData[type]) {
    if (noteData[type][i].condition()) sum += noteData[type][i].weight;
  }
  return sum;
}
