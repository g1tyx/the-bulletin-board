function save(auto = true) {
  player.date = Date.now();
  let data = JSON.stringify(player);
  localStorage.setItem("tbbsave", data);
  if (!auto) dropPost("saveBtn", false);
}
function load(auto = true) {
  let data = JSON.parse(localStorage.getItem("tbbsave"));
  if (data) {
    let dt = player.date - data.date;
    simulateTime(dt);
    data.date = player.date;
    player.board = [...data.board];
    if (data.achievements) player.achievements = [...data.achievements];
    merge(player, data);
    if (!auto) dropPost("loadBtn", false);
  }
  updateDisp();
  updateBoard();
  updateChance();
  updateBarLabel();
  updateSettings();
  updateStats();
  updateAch();
}
function exportSave() {
  let data = JSON.stringify(player);
  data = btoa(data);
  id("exportArea").classList.remove("hidden");
  id("exportArea").innerHTML = data;
  id("exportArea").select();
  document.execCommand("copy");
  id("exportArea").classList.add("hidden");
  dropPost("exportBtn", false);
}
function importSave() {
  let data = prompt("Please enter exported save:");
  if (data) {
    try {
      data = atob(data);
      JSON.parse(data);
      localStorage.setItem("tbbsave", data);
      load();
      dropPost("importBtn", false);
    } catch (err) {
      alert("Invalid save");
    }
  }
}
function toggleAutoSave() {
  player.autoSave = !player.autoSave;
  dropPost("autoSaveBtn", false);
  setTimeout(() => {
    updateSettings();
  }, 500);
}
function editSaveInterval() {
  let newInterval = prompt(
    "Please enter the new auto save interval in miliseconds (500 to 86400000 inclusive):"
  );
  if (newInterval) {
    if (newInterval >= 500 && newInterval <= 86400000) {
      player.autoSaveInterval = newInterval;
      setTimeout(() => {
        updateSettings();
      }, 500);
      dropPost("saveIntervalBtn", false);
    } else alert("Out of range!");
  }
}
function wipeSave() {
  player = newGame();
  save();
  load();
  nextPost = 0;
  dropPost("wipeSaveBtn", false);
}
function wipeSaveConfirm() {
  if (confirm("Are you sure you want to wipe all save data?")) wipeSave();
}
function merge(base, source) {
  for (let i in base) {
    if (source[i] !== undefined) {
      if (typeof base[i] === "object" && typeof source[i] === "object") {
        merge(base[i], source[i]);
      } else {
        base[i] = source[i];
      }
    }
  }
}
