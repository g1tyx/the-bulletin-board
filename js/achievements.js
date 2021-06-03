var achList = [];

class Achievement {
  constructor(achId, name, desc) {
    achList[achId] = this;
    this.name = name;
    this.desc = desc;
    let disp = document.createElement("div");
    disp.id = achId + "Ach";
    disp.innerHTML = `<span>???<br><span class="subtext">???</span></span>`;
    disp.classList.add("post", "gray");
    disp.style.position = "relative";
    id("achievementDisp").appendChild(disp);
  }
}

function giveAch(id) {
  if (!player.achievements.includes(id)) {
    player.achievements.push(id);
    updateAch();
    notify("Achievement Got!", achList[id].name);
  }
}

new Achievement("start", "Great Start!", "Start the game.");
// yellow note collection
new Achievement("yNote10", "Sticky Fingers", "Gain a total of 10 notes.");
new Achievement("yNote100", "Enough for a Pack", "Gain a total of 100 notes.");
new Achievement("yNote1000", "Tiny Factory", "Gain a total of 1000 notes.");
new Achievement(
  "yNote1e4",
  "It's Not Raining Water",
  "Gain a total of 1e4 notes."
);
new Achievement("yNote1e5", "Pastel El Dorado", "Gain a total of 1e5 notes.");
// blue note collection
new Achievement("bNote1", "Ocean Blue", "Gain a total of 1 blue note.");
new Achievement(
  "bNote10",
  "Just a Bit of Variety",
  "Gain a total of 10 blue note."
);
new Achievement(
  "bNote100",
  "Yellow Is Boring",
  "Gain a total of 100 blue notes."
);
new Achievement("bNote1000", "Ya Blue It", "Gain a total of 1000 blue notes.");
new Achievement("bNote1e4", "Pacific Paper", "Gain a total of 1e4 blue notes.");
// green note collection
new Achievement(
  "gNote1",
  "Green Like the Trees",
  "Gain a total of 1 green note."
);
new Achievement("gNote10", "10 Leaf Clover", "Gain a total of 10 green notes.");
new Achievement(
  "gNote100",
  "Wished It Was $100",
  "Gain a total of 100 green notes."
);
new Achievement(
  "gNote1000",
  "Processed Forest",
  "Gain a total of 1000 green notes."
);
// yellow note rate
new Achievement("yRate0.1", "Automation!", "Produce 0.1 notes/s.");
new Achievement("yRate1", "It's Whole Now", "Produce 1 note/s.");
new Achievement("yRate10", "Factory in the Making", "Produce 10 notes/s.");
new Achievement("yRate100", "AI Revolution? Nah", "Produce 100 notes/s.");
new Achievement("yRate1000", "Think of the Trees!", "Produce 1000 notes/s.");
// blue note rate
new Achievement("bRate0.01", "It Flows", "Produce 0.01 blue notes/s.");
new Achievement("bRate0.1", "Catching Up", "Produce 0.1 blue notes/s.");
new Achievement("bRate1", "Drop in the Pond", "Produce 1 blue note/s.");
new Achievement("bRate10", "Steady Hydration", "Produce 10 blue notes/s.");
new Achievement("bRate100", "Dihydrogen Monoxide", "Produce 100 blue notes/s.");
// post used
new Achievement("use10", "Ooh Paper", "Use a total of 10 posts.");
new Achievement("use100", "Post-it, Collect It", "Use a total of 100 posts.");
new Achievement(
  "use1000",
  "Post-It Note Enthusiast",
  "Use a total of 1000 posts."
);
new Achievement(
  "use1e4",
  "Ok Now You're Just Obsessed",
  "Use a total of 1e4 posts."
);
// post discarded
new Achievement("discard10", "Picky", "Discard a total of 10 posts.");
new Achievement("discard100", "Me No Likey", "Discard a total of 100 posts.");
new Achievement(
  "discard1000",
  "Trash Can Free Throw",
  "Discard a total of 1000 posts."
);
new Achievement(
  "discard1e4",
  "I Hope You're Recycling",
  "Discard a total of 1e4 posts."
);
// board space
new Achievement("board6", "Expansion Pack", "Have a board size of 6.");
new Achievement("board10", "I Felt Cramped", "Have a board size of 10.");
// special
new Achievement("openSettings", "Decisions", "Visit the settings.");
new Achievement("openStats", "Numbers n Stuff", "Visit the statistics.");
new Achievement("openAch", "Hello There", "Visit the achievements.");
new Achievement("1%", "Nuh Uh", "Try to go below 1% chance.");
new Achievement(
  "negative",
  "Dipping Into The Unknown",
  "Have negative of any notes."
);
