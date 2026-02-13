// Even Hub Starter Kit - no build step
// Guided "Next Test" flow + local journal + exportable repo run file.

const $ = (id) => document.getElementById(id);

const ui = {
  sdkStatus: $("sdkStatus"),
  fiawvStatus: $("fiawvStatus"),
  bridgeStatus: $("bridgeStatus"),
  startupStatus: $("startupStatus"),
  log: $("log"),
  matrix: $("matrix"),
  btnRunNextTest: $("btnRunNextTest"),
  runState: $("runState"),
  confirmationSection: $("confirmationSection"),
  notesInput: $("notesInput"),
  btnExportRun: $("btnExportRun"),
  lastSavedMessage: $("lastSavedMessage"),
  nextTestTitle: $("nextTestTitle"),
  nextTestGoal: $("nextTestGoal"),
  nextTestLookFor: $("nextTestLookFor"),
  advancedSearch: $("advancedSearch"),
  btnGetUser: $("btnGetUser"),
  btnGetDevice: $("btnGetDevice"),
  btnCreateStartup: $("btnCreateStartup"),
  btnTextUpgrade: $("btnTextUpgrade"),
  btnRebuild: $("btnRebuild"),
  btnShutdown: $("btnShutdown"),
  btnSetLS: $("btnSetLS"),
  btnGetLS: $("btnGetLS"),
  btnStartMic: $("btnStartMic"),
  btnStopMic: $("btnStopMic"),
};

const NEXT_TEST = {
  id: "hello-world-startup",
  title: "Hello World startup page appears on glasses",
  goal: "Verify startup page creation can be triggered from this page.",
  lookFor: [
    "A new startup message appears on the glasses display.",
    "No obvious crash/freeze while loading.",
    "Result appears within a few seconds of running test.",
  ],
};

const state = {
  SDK: null,
  bridge: null,
  matrix: {},
  runs: [],
  pendingRun: null,
};

const RUN_STORAGE_KEY = "starterKit.testingRuns.v1";

function isoNow() {
  return new Date().toISOString();
}

function nowForLog() {
  return isoNow().replace("T", " ").replace("Z", "");
}

function log(...args) {
  const line = args.map((a) => (typeof a === "string" ? a : JSON.stringify(a, null, 2))).join(" ");
  ui.log.textContent += `[${nowForLog()}] ${line}\n`;
  ui.log.scrollTop = ui.log.scrollHeight;
}

function setStatus(el, ok, text) {
  el.textContent = text;
  el.className = ok ? "ok" : "bad";
}

function matrixSet(key, value) {
  state.matrix[key] = value;
  ui.matrix.textContent = JSON.stringify(state.matrix, null, 2);
}

function saveRuns() {
  localStorage.setItem(RUN_STORAGE_KEY, JSON.stringify(state.runs));
}

function loadRuns() {
  try {
    const raw = localStorage.getItem(RUN_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    state.runs = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    state.runs = [];
    log("Run history load error:", String(e));
  }
}

function setRunState(text, className = "") {
  ui.runState.textContent = text;
  ui.runState.className = `status-chip ${className}`.trim();
}

function renderNextTest() {
  ui.nextTestTitle.textContent = NEXT_TEST.title;
  ui.nextTestGoal.textContent = NEXT_TEST.goal;
  ui.nextTestLookFor.innerHTML = "";
  for (const item of NEXT_TEST.lookFor) {
    const li = document.createElement("li");
    li.textContent = item;
    ui.nextTestLookFor.appendChild(li);
  }
}

function sanitizeFileText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function buildRunMarkdown(run) {
  return [
    `# Test Run: ${run.testTitle}`,
    "",
    `- test_id: ${run.testId}`,
    `- run_at: ${run.runAt}`,
    `- result: ${run.result}`,
    `- tested_url: ${run.testedUrl}`,
    `- bridge_ready: ${run.bridgeReady}`,
    `- startup_created: ${run.startupCreated}`,
    "",
    "## Goal",
    run.goal,
    "",
    "## Expected on glasses",
    ...run.lookFor.map((line) => `- ${line}`),
    "",
    "## Human confirmation",
    `Answer: ${run.answer}`,
    "",
    "## Notes",
    run.notes || "(none)",
    "",
  ].join("\n");
}

function createDownload(filename, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildGitHubPagesUrl() {
  const owner = "theJoshLucas";
  const repo = "evenhub-starter";
  return `https://${owner}.github.io/${repo}/index.html`;
}

function buildCacheBustedUrl() {
  const base = buildGitHubPagesUrl();
  const stamp = Date.now();
  const url = new URL(base);
  url.searchParams.set("cb", String(stamp));
  return { url: url.toString(), timestamp: new Date(stamp).toISOString() };
}

async function importSdk() {
  const candidates = [
    "https://esm.sh/@evenrealities/even_hub_sdk@0.0.7",
    "https://unpkg.com/@evenrealities/even_hub_sdk@0.0.7/dist/index.js",
  ];

  let lastErr = null;
  for (const url of candidates) {
    try {
      log(`Attempting SDK import: ${url}`);
      const mod = await import(url);
      if (mod?.EvenAppBridge) return mod;
      lastErr = new Error("Module loaded but missing EvenAppBridge export.");
    } catch (e) {
      lastErr = e;
      log(`SDK import failed: ${String(e)}`);
    }
  }
  throw lastErr ?? new Error("SDK import failed (unknown).");
}

async function boot() {
  setRunState("connecting", "running");
  try {
    setStatus(ui.sdkStatus, false, "loading…");
    setStatus(ui.fiawvStatus, false, "checking…");
    setStatus(ui.bridgeStatus, false, "connecting…");

    const hasFIAWV = !!(window.flutter_inappwebview && window.flutter_inappwebview.callHandler);
    setStatus(ui.fiawvStatus, hasFIAWV, hasFIAWV ? "present ✅" : "missing ❌");
    matrixSet("flutter_inappwebview.present", hasFIAWV);

    state.SDK = await importSdk();
    setStatus(ui.sdkStatus, true, "loaded ✅");
    matrixSet("sdk.loaded", true);

    const { waitForEvenAppBridge, EvenAppBridge } = state.SDK;
    try { EvenAppBridge.getInstance(); } catch (_) {}

    state.bridge = await waitForEvenAppBridge();
    setStatus(ui.bridgeStatus, true, "ready ✅");
    matrixSet("bridge.ready", true);

    return true;
  } catch (e) {
    log("Boot FAILED:", String(e));
    setStatus(ui.sdkStatus, false, "failed ❌");
    setStatus(ui.bridgeStatus, false, "failed ❌");
    matrixSet("boot.error", String(e));
    return false;
  }
}

async function ensureBridge() {
  if (!state.bridge) {
    const ok = await boot();
    if (!ok || !state.bridge) throw new Error("Bridge not available (boot failed).");
  }
  return state.bridge;
}

async function probeCreateStartup() {
  const bridge = await ensureBridge();
  try {
    const { CreateStartUpPageContainer } = state.SDK;
    const payload = new CreateStartUpPageContainer({
      containerTotalNum: 1,
      textObject: [{
        xPosition: 0,
        yPosition: 0,
        width: 480,
        height: 80,
        containerID: 1,
        containerName: "t1",
        content: `Hello world @ ${nowForLog()}`,
      }],
    });
    const result = await bridge.createStartUpPageContainer(payload);
    const ok = result === 0 || result === "0";
    setStatus(ui.startupStatus, ok, ok ? "created ✅" : `failed (${result}) ❌`);
    matrixSet("createStartUpPageContainer.ok", ok);
    matrixSet("createStartUpPageContainer.result", result);
    return ok;
  } catch (e) {
    setStatus(ui.startupStatus, false, "failed ❌");
    matrixSet("createStartUpPageContainer.ok", false);
    matrixSet("createStartUpPageContainer.error", String(e));
    return false;
  }
}

async function runNextTest() {
  ui.btnRunNextTest.disabled = true;
  ui.confirmationSection.hidden = true;
  ui.btnExportRun.disabled = true;
  state.pendingRun = null;

  try {
    setRunState("running", "running");
    const { url, timestamp } = buildCacheBustedUrl();
    matrixSet("qrTest.url", url);
    matrixSet("qrTest.timestamp", timestamp);

    await boot();
    const startupCreated = await probeCreateStartup();

    state.pendingRun = {
      testId: NEXT_TEST.id,
      testTitle: NEXT_TEST.title,
      goal: NEXT_TEST.goal,
      lookFor: NEXT_TEST.lookFor,
      runAt: isoNow(),
      testedUrl: url,
      bridgeReady: !!state.matrix["bridge.ready"],
      startupCreated,
    };

    ui.confirmationSection.hidden = false;
    setRunState("waiting for human confirmation", "running");
    log("Next test finished automation. Waiting for human confirmation.");
  } catch (e) {
    setRunState("failed", "failed");
    log("Run Next Test failed:", String(e));
  } finally {
    ui.btnRunNextTest.disabled = false;
  }
}

function saveRun(answer) {
  if (!state.pendingRun) return;

  const normalizedResult = answer === "yes" ? "pass" : answer === "no" ? "fail" : "not-sure";
  const run = {
    ...state.pendingRun,
    answer,
    result: normalizedResult,
    notes: (ui.notesInput.value || "").trim(),
    savedAt: isoNow(),
  };

  state.runs.push(run);
  saveRuns();

  const isoName = run.savedAt.replace(/[:.]/g, "-");
  const filename = `${isoName}__${sanitizeFileText(run.testId)}__${sanitizeFileText(run.result)}.md`;
  run.exportFile = filename;

  state.pendingRun = run;
  ui.btnExportRun.disabled = false;
  ui.lastSavedMessage.textContent = `Saved locally. Ready to export: testing/runs/${filename}`;
  setRunState(`saved: ${run.result}`, run.result === "pass" ? "success" : run.result === "fail" ? "failed" : "");
  log("Run saved locally:", run);
}

function exportRunFile() {
  if (!state.pendingRun?.exportFile) return;
  const content = buildRunMarkdown(state.pendingRun);
  createDownload(state.pendingRun.exportFile, content);
  log("Exported run file:", state.pendingRun.exportFile);
}

async function probeGetUserInfo() {
  const bridge = await ensureBridge();
  try {
    const user = await bridge.getUserInfo();
    matrixSet("getUserInfo.ok", true);
    matrixSet("getUserInfo.value", user);
  } catch (e) {
    matrixSet("getUserInfo.ok", false);
    matrixSet("getUserInfo.error", String(e));
  }
}

async function probeGetDeviceInfo() {
  const bridge = await ensureBridge();
  try {
    const dev = await bridge.getDeviceInfo();
    matrixSet("getDeviceInfo.ok", true);
    matrixSet("getDeviceInfo.value", dev);
  } catch (e) {
    matrixSet("getDeviceInfo.ok", false);
    matrixSet("getDeviceInfo.error", String(e));
  }
}

async function probeTextUpgrade() {
  const bridge = await ensureBridge();
  try {
    const { TextContainerUpgrade } = state.SDK;
    const text = `Upgraded @ ${nowForLog()}\nIf you see this on the glasses, textContainerUpgrade works.`;
    const payload = new TextContainerUpgrade({ containerID: 1, containerName: "t1", contentOffset: 0, contentLength: text.length, content: text });
    const ok = await bridge.textContainerUpgrade(payload);
    matrixSet("textContainerUpgrade.ok", !!ok);
  } catch (e) {
    matrixSet("textContainerUpgrade.ok", false);
    matrixSet("textContainerUpgrade.error", String(e));
  }
}

async function probeRebuild() {
  const bridge = await ensureBridge();
  try {
    const { RebuildPageContainer } = state.SDK;
    const payload = new RebuildPageContainer({
      containerTotalNum: 1,
      textObject: [{ xPosition: 0, yPosition: 0, width: 480, height: 80, containerID: 1, containerName: "t1", content: `Rebuild @ ${nowForLog()}` }],
    });
    const ok = await bridge.rebuildPageContainer(payload);
    matrixSet("rebuildPageContainer.ok", !!ok);
  } catch (e) {
    matrixSet("rebuildPageContainer.ok", false);
    matrixSet("rebuildPageContainer.error", String(e));
  }
}

async function probeShutdown() {
  const bridge = await ensureBridge();
  try {
    const ok = await bridge.shutDownPageContainer(1);
    matrixSet("shutDownPageContainer.ok", !!ok);
  } catch (e) {
    matrixSet("shutDownPageContainer.ok", false);
    matrixSet("shutDownPageContainer.error", String(e));
  }
}

async function probeSetLocalStorage() {
  const bridge = await ensureBridge();
  try {
    const key = "starterKit.lastSet";
    const val = nowForLog();
    const ok = await bridge.setLocalStorage(key, val);
    matrixSet("setLocalStorage.ok", !!ok);
    matrixSet("setLocalStorage.last", { key, val });
  } catch (e) {
    matrixSet("setLocalStorage.ok", false);
    matrixSet("setLocalStorage.error", String(e));
  }
}

async function probeGetLocalStorage() {
  const bridge = await ensureBridge();
  try {
    const key = "starterKit.lastSet";
    const val = await bridge.getLocalStorage(key);
    matrixSet("getLocalStorage.ok", true);
    matrixSet("getLocalStorage.last", { key, val });
  } catch (e) {
    matrixSet("getLocalStorage.ok", false);
    matrixSet("getLocalStorage.error", String(e));
  }
}

async function probeAudio(on) {
  const bridge = await ensureBridge();
  try {
    const ok = await bridge.audioControl(!!on);
    matrixSet(`audioControl.${on ? "on" : "off"}.ok`, !!ok);
  } catch (e) {
    matrixSet(`audioControl.${on ? "on" : "off"}.ok`, false);
    matrixSet(`audioControl.${on ? "on" : "off"}.error`, String(e));
  }
}

function filterAdvancedButtons() {
  const query = (ui.advancedSearch.value || "").toLowerCase().trim();
  const buttons = Array.from(document.querySelectorAll("button[data-probe]"));
  for (const btn of buttons) {
    const text = `${btn.textContent} ${btn.dataset.probe}`.toLowerCase();
    btn.style.display = !query || text.includes(query) ? "" : "none";
  }
}

ui.btnRunNextTest.addEventListener("click", runNextTest);
ui.btnExportRun.addEventListener("click", exportRunFile);
document.querySelectorAll(".result-btn").forEach((btn) => {
  btn.addEventListener("click", () => saveRun(btn.dataset.result));
});

ui.btnGetUser.addEventListener("click", probeGetUserInfo);
ui.btnGetDevice.addEventListener("click", probeGetDeviceInfo);
ui.btnCreateStartup.addEventListener("click", probeCreateStartup);
ui.btnTextUpgrade.addEventListener("click", probeTextUpgrade);
ui.btnRebuild.addEventListener("click", probeRebuild);
ui.btnShutdown.addEventListener("click", probeShutdown);
ui.btnSetLS.addEventListener("click", probeSetLocalStorage);
ui.btnGetLS.addEventListener("click", probeGetLocalStorage);
ui.btnStartMic.addEventListener("click", () => probeAudio(true));
ui.btnStopMic.addEventListener("click", () => probeAudio(false));
ui.advancedSearch.addEventListener("input", filterAdvancedButtons);

renderNextTest();
loadRuns();
setRunState("not started");
log("Ready. Click 'Run Next Test' to start guided flow.");
