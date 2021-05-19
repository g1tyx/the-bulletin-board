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
  () => player.notes[0] <= 50
);
new Upg(
  0,
  [0, 0, 0, 0],
  10,
  "+2 notes",
  getNotes,
  [0, 2],
  () => player.notes[0] >= 5 && player.notes[0] <= 100
);
new Upg(
  0,
  [0, 0, 0, 0],
  5,
  "+5 notes",
  getNotes,
  [0, 5],
  () => player.notes[0] >= 20 && player.notes[0] <= 1000
);
new Upg(
  0,
  [100, 0, 0, 0],
  2,
  "+1 blue note",
  getNotes,
  [1, 1],
  () => player.notes[0] >= 50
);
new Upg(
  0,
  [250, 0, 0, 0],
  1,
  "+2 blue notes",
  getNotes,
  [1, 2],
  () => player.notes[1] >= 5
);
new Upg(
  0,
  [650, 0, 0, 0],
  0.5,
  "+5 blue notes",
  getNotes,
  [1, 5],
  () => player.notes[1] >= 20
);
// blue
new Upg(1, [5, 0, 0, 0], 10, "+0.1 notes/s", addRate, [0, 0.1], () => true);
new Upg(
  1,
  [10, 0, 0, 0],
  5,
  "+0.2 notes/s",
  addRate,
  [0, 0.2],
  () => player.rate[0] >= 0.5
);
new Upg(
  1,
  [20, 0, 0, 0],
  3,
  "+5% blue chance, -5% yellow chance",
  chanceExch,
  [0, 1, 0.05],
  () =>
    player.notes[0] >= 20 &&
    player.noteChance[0] > 0 &&
    player.noteChance[1] < 1
);
new Upg(
  1,
  [20, 0, 0, 0],
  3,
  "+5% yellow chance, -5% blue chance",
  chanceExch,
  [1, 0, 0.05],
  () =>
    player.notes[0] >= 20 &&
    player.noteChance[1] > 0 &&
    player.noteChance[0] < 1
);
new Upg(
  1,
  [50, 5, 0, 0],
  1,
  "+5% green chance, -5% blue chance",
  chanceExch,
  [1, 2, 0.05],
  () =>
    player.notes[1] >= 5 && player.noteChance[1] > 0 && player.noteChance[2] < 1
);
new Upg(
  1,
  [50, 5, 0, 0],
  1,
  "+5% blue chance, -5% green chance",
  chanceExch,
  [2, 1, 0.05],
  () =>
    player.notes[1] >= 5 && player.noteChance[2] > 0 && player.noteChance[1] < 1
);
// green
new Upg(
  2,
  [0, 10, 0, 0],
  10,
  "Gain notes equal to current blue notes * 10",
  getNotes,
  [0, () => player.notes[1] * 10],
  () => true
);
new Upg(
  2,
  [100, 0, 0, 0],
  1,
  "+0.01 blue note/s",
  addRate,
  [1, 0.01],
  () => player.notes[1] >= 50
);
new Upg(
  2,
  [200, 0, 0, 0],
  1,
  "+0.02 blue note/s",
  addRate,
  [1, 0.02],
  () => player.rate[1] >= 0.1
);
new Upg(
  2,
  [500, 0, 0, 0],
  1,
  "+0.05 blue note/s",
  addRate,
  [1, 0.05],
  () => player.rate[1] >= 0.5
);
// purple

function getTotalWeight(type) {
  let sum = 0;
  for (let i in noteData[type]) {
    if (noteData[type][i].condition()) sum += noteData[type][i].weight;
  }
  return sum;
}
