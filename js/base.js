var player = newGame();
const maxBoardSpace = 25;
function newGame() {
  return {
    board: [
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty"
    ],
    notes: [0, 0, 0, 0],
    notesTotal: [0, 0, 0, 0],
    rate: [0, 0, 0, 0],
    postInterval: 1000 * 5,
    boardSpace: 5,
    noteChance: [0.8, 0.2, 0, 0],
    date: Date.now(),
    autoSave: true,
    autoSaveInterval: 10000
  };
}
function getNotes(type, amount) {
  player.notes[type] += amount;
  player.notesTotal[type] += amount;
  updateDisp();
}

function addRate(type, amount) {
  player.rate[type] += amount;
  updateDisp();
}

function chanceExch(fromType, toType, amount) {
  amount = Math.min(
    player.noteChance[fromType] - 0.01,
    amount
  );
  if (amount < 0) amount = 0;
  player.noteChance[fromType] -= amount;
  player.noteChance[toType] += amount;
  updateChance();
}

function addPostDelay(amount) {
  player.postInterval += amount;
  player.postInterval = Math.max(player.postInterval, 500);
  player.postInterval = Math.min(player.postInterval, 1000 * 60);
}

function addPost() {
  let pos = Math.floor(Math.random() * player.boardSpace);
  while (player.board[pos] !== "empty") {
    pos = Math.floor(Math.random() * player.boardSpace);
  }
  let type = Math.random();
  for (let i in player.noteChance) {
    if (type < player.noteChance[i]) {
      type = i;
      break;
    }
    type -= player.noteChance[i];
  }
  let post = Math.random() * getTotalWeight(type);
  for (let i in noteData[type]) {
    if (noteData[type][i].condition()) {
      if (post < noteData[type][i].weight) {
        post = [type, i];
        break;
      }
      post -= noteData[type][i].weight;
    }
  }
  player.board[pos] = post;
  updateBoard();
  updateBarLabel();
}

function usePost(pos) {
  let postId = player.board[pos];
  let post = noteData[postId[0]][postId[1]];
  let cost = post.cost;
  for (let i in cost) {
    if (player.notes[i] < cost[i]) break;
    if (i == 3) {
      for (let j in cost) player.notes[j] -= cost[j];
      let arg = deepCopy(post.arg);
      for (let i in arg) {
        if (typeof arg[i] === "function") arg[i] = arg[i]();
      }
      post.effect(...arg);
      removePost(pos);
    }
  }
}

function removePost(pos) {
  player.board[pos] = "empty";
  dropPost("slot" + pos);
  setTimeout(function () {
    updateBoard();
  }, 500);
  updateBarLabel();
  return false;
}

function dropPost(eid, hide = true) {
  id(eid).classList.add("used");
  if (!hide) {
    setTimeout(() => {
      id(eid).classList.remove("used");
    }, 500);
  }
}

function getFilled() {
  return player.board.filter((x) => x !== "empty").length;
}

function toggleSettings() {
  if (id("screenContainer").style.transform === "") {
    id("screenContainer").style.transform = "translate(-100vw,0)";
  } else id("screenContainer").style.transform = "";
}

var prevts = 0;
var nextPost = 0;
var nextSave = 0;
function nextFrame(ts) {
  if (prevts === 0) prevts = ts;
  let dt = ts - prevts;
  prevts = ts;
  simulateTime(dt);
  requestAnimationFrame(nextFrame);
}

function simulateTime(ms) {
  let t = ms / 1000;
  for (let i in player.notes) {
    player.notes[i] += player.rate[i] * t;
    player.notesTotal[i] += player.rate[i] * t;
  }
  nextPost += ms;
  if (nextPost > player.postInterval) {
    nextPost %= player.postInterval;
    if (getFilled() === player.boardSpace) {
      removePost(Math.floor(Math.random() * player.boardSpace));
    } else addPost();
  }
  if (player.autoSave) {
    nextSave += ms;
    if (nextSave > player.autoSaveInterval) {
      nextSave %= player.autoSaveInterval;
      save();
    }
  }
  updateDisp();
  updateBar();
}

const id = (x) => document.getElementById(x);

for (let i = 0; i < maxBoardSpace; i++) {
  let ele = document.createElement("div");
  ele.id = "slot" + i;
  ele.classList.add("post", "hidden");
  ele.addEventListener("click", function (event) {
    if (event.shiftKey) {
      removePost(i);
    } else usePost(i);
  });
  let text = document.createElement("span");
  text.id = "text" + i;
  ele.appendChild(text);
  id("board").appendChild(ele);
}

document.querySelectorAll(".post").forEach(function (ele) {
  ele.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
});

function deepCopy(inObject) {
  let outObject, value, key;
  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    outObject[key] = deepCopy(value);
  }
  return outObject;
}

function format(n) {
  if (n < 1e3) {
    return n.toFixed(1);
  } else {
    return n.toExponential(1).replace("+", "");
  }
}

function formatTime(ms) {
  let s = ms / 1000;
  let ds = s % 60;
  let m = Math.floor(s / 60);
  let dm = m % 60;
  let h = Math.floor(m / 60);
  let dh = h % 24;
  let d = Math.floor(h / 24);
  let dd = d % 30.43685;
  let mo = Math.floor(d / 30.43685);
  let dmo = mo % 12;
  let dy = Math.floor(mo / 365.2422);
  let time =
    s < 60 ? ds.toFixed(2) + "s" : (ds < 10 ? "0" : "") + ds.toFixed(0);
  if (dm >= 1) time = (dm < 10 ? "0" : "") + dm + ":" + time;
  if (dh >= 1) time = (dh < 10 ? "0" : "") + dh + ":" + time;
  if (dd >= 1) time = dd + ":" + time;
  if (dmo >= 1) time = dmo + ":" + time;
  if (dy >= 1) time = dy + ":" + time;
  return time;
}

function init() {
  dropPost("startBtn");
  setTimeout(() => {
    id("startBtnCont").classList.add("hidden");
  }, 500);
  id("topLeft").classList.remove("hidden");
  id("topRight").classList.remove("hidden");
  id("board").classList.remove("hidden");
  id("bottomLeft").classList.remove("hidden");
  id("sideBar").classList.remove("hidden");
  getNotes(0, 1);
  load();
  requestAnimationFrame(nextFrame);
}
