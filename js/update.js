function updateDisp() {
  let types = ["y", "b", "g", "p"];
  for (let i in types) {
    i = parseInt(i);
    id(types[i] + "Amt").innerHTML = format(player.notes[i]);
    id(types[i] + "Rate").innerHTML = format(getRate(i)) + "/s";
    if (player.notesTotal[i] > 0)
      id(types[i] + "Disp").classList.remove("hidden");
    if (player.doubleTime > 0) {
      id(types[i] + "Rate").classList.add("greenText");
      id(types[i] + "Rate").classList.remove("subtext");
    } else {
      id(types[i] + "Rate").classList.remove("greenText");
      id(types[i] + "Rate").classList.add("subtext");
    }

    if (player.notes[i] >= 1 && [1, 2].includes(i)) giveAch(types[i] + "Note1");
    if (player.notes[i] >= 10 && [0, 1, 2].includes(i))
      giveAch(types[i] + "Note10");
    if (player.notes[i] >= 100 && [0, 1, 2].includes(i))
      giveAch(types[i] + "Note100");
    if (player.notes[i] >= 1000 && [0, 1, 2].includes(i))
      giveAch(types[i] + "Note1000");
    if (player.notes[i] >= 1e4 && [0, 1].includes(i))
      giveAch(types[i] + "Note1e4");
    if (player.notes[i] >= 1e5 && [0].includes(i))
      giveAch(types[i] + "Note1e5");

    if (player.rate[i] >= 0.01 && [1].includes(i))
      giveAch(types[i] + "Rate0.01");
    if (player.rate[i] >= 0.1 && [0, 1].includes(i))
      giveAch(types[i] + "Rate0.1");
    if (player.rate[i] >= 1 && [0, 1].includes(i)) giveAch(types[i] + "Rate1");
    if (player.rate[i] >= 10 && [0, 1].includes(i))
      giveAch(types[i] + "Rate10");
    if (player.rate[i] >= 100 && [0, 1].includes(i))
      giveAch(types[i] + "Rate100");
    if (player.rate[i] >= 1000 && [0].includes(i))
      giveAch(types[i] + "Rate1000");

    if (player.notes[i] < 0) giveAch("negative");
  }
  if (player.doubleTime > 0) {
    id("doubleDisp").classList.remove("hidden");
    id("doubleTimer").innerHTML = formatTime(player.doubleTime);
  } else id("doubleDisp").classList.add("hidden");
}

function updateChance() {
  let text = "Chances:";
  if (player.noteChance[0] !== 0)
    text += `<br><span class='yellowText'>${format(
      player.noteChance[0] * 100
    )}%</span>`;
  if (player.noteChance[1] !== 0)
    text += `<br><span class='blueText'>${format(
      player.noteChance[1] * 100
    )}%</span>`;
  if (player.noteChance[2] !== 0)
    text += `<br><span class='greenText'>${format(
      player.noteChance[2] * 100
    )}%</span>`;
  if (player.noteChance[3] !== 0)
    text += `<br><span class='purpleText'>${format(
      player.noteChance[3] * 100
    )}%</span>`;
  id("chanceDisp").innerHTML = text;
}

function updateBoard() {
  let types = ["yellow", "blue", "green", "purple"];
  for (let i in player.board) {
    let postId = player.board[i];
    if (postId === "empty") {
      id("slot" + i).classList.add("hidden");
      continue;
    }
    let post = noteData[postId[0]][postId[1]];
    let text = post.desc
      .replaceAll("<y>", "<span class='yellowText'>")
      .replaceAll("<b>", "<span class='blueText'>")
      .replaceAll("<g>", "<span class='greenText'>")
      .replaceAll("<p>", "<span class='purpleText'>")
      .replaceAll("</>", "</span>");
    if (post.cost.some((x) => x !== 0)) {
      text += "<br>Cost: ";
      if (post.cost[0] !== 0)
        text += `<span class='yellowText'>${format(post.cost[0])}</span> `;
      if (post.cost[1] !== 0)
        text += `<span class='blueText'>${format(post.cost[1])}</span> `;
      if (post.cost[2] !== 0)
        text += `<span class='greenText'>${format(post.cost[2])}</span> `;
      if (post.cost[3] !== 0)
        text += `<span class='purpleText'>${format(post.cost[3])}</span>`;
    }
    id("slot" + i).classList.remove(
      "hidden",
      "used",
      "blue",
      "green",
      "purple"
    );
    id("slot" + i).classList.add(types[post.type]);
    id("text" + i).innerHTML = text;
  }
}

function updateBar() {
  id("barFill").style.height = `${(nextPost / player.postInterval) * 100}%`;
}

function updateBarLabel() {
  id("barDisp").innerHTML = `${getFilled()}/${player.boardSpace}`;
  if (getFilled() === player.boardSpace) {
    id("barDisp").style.color = "red";
  } else id("barDisp").style.color = "";
}

function updateSettings() {
  id("autoSaveDisp").innerHTML = player.autoSave ? "ON" : "OFF";
  id("saveIntervalDisp").innerHTML = formatTime(player.autoSaveInterval);
}

function updateStats() {
  id("timePlayed").innerHTML = formatTime(player.timePlayed);
  id("postsUsed").innerHTML = player.postsUsed;
  id("postsDiscarded").innerHTML = player.postsDiscarded;
  let types = ["Y", "B", "G", "P"];
  for (let i in types) {
    id("totalNotes" + types[i]).innerHTML = format(player.notesTotal[i]);
    if (player.notesTotal[i] > 0)
      id("totalNotes" + types[i] + "Container").classList.remove("hidden");
  }
}

function updateAch() {
  for (let i in player.achievements) {
    let achId = player.achievements[i];
    let ach = achList[achId];
    id(achId + "Ach").classList.remove("gray");
    id(
      achId + "Ach"
    ).innerHTML = `<span>${ach.name}<br><span class="subtext">${ach.desc}</span></span>`;
  }
}

var notifyQueue = [];
function notify(title, text) {
  notifyQueue.push([title, text]);
  updateNotification();
}

function updateNotification() {
  let data = notifyQueue[0];
  if (data) {
    let text = `<span>${data[0]}<br><span class="subtext">${data[1]}</span></span>`;
    id("notifications").innerHTML = text ?? "";
  }
  id("notifications").classList[notifyQueue.length === 0 ? "add" : "remove"](
    "hidden"
  );
}

function removeNotification() {
  notifyQueue.shift();
  updateNotification();
}
