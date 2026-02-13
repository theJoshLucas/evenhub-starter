// Even Hub Starter Kit - no build step
// Human-assisted real-device testing helper (not automatic validation).

const $ = (id) => document.getElementById(id);

const ui = {
  sdkStatus: $("sdkStatus"),
  fiawvStatus: $("fiawvStatus"),
  bridgeStatus: $("bridgeStatus"),
  startupStatus: $("startupStatus"),
  log: $("log"),
  matrix: $("matrix"),
  btnBoot: $("btnBoot"),
  btnHelloWorld: $("btnHelloWorld"),
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
  btnGenerateQr: $("btnGenerateQr"),
  qrUrl: $("qrUrl"),
  qrTimestamp: $("qrTimestamp"),
  qrCode: $("qrCode"),
  stepStatusQr: $("stepStatusQr"),
  stepStatusBoot: $("stepStatusBoot"),
  stepStatusHello: $("stepStatusHello"),
  stepStatusJournal: $("stepStatusJournal"),
  journalOutcome: $("journalOutcome"),
  journalNotes: $("journalNotes"),
  btnJournalConfirm: $("btnJournalConfirm"),
  btnJournalReset: $("btnJournalReset"),
  btnCopySummary: $("btnCopySummary"),
  btnCopyFullReport: $("btnCopyFullReport"),
  btnDownloadReport: $("btnDownloadReport"),
  journalList: $("journalList"),
  journalEmpty: $("journalEmpty"),
  journalSummary: $("journalSummary"),
  advancedSearch: $("advancedSearch"),
};

const state = {
  SDK: null,
  bridge: null,
  container: { containerTotalNum: 1, containerID: 1, containerName: "t1" },
  matrix: {},
  journal: [],
};

const JOURNAL_STORAGE_KEY = "starterKit.developerJournal.v2";

function now() {
  return new Date().toISOString().replace("T", " ").replace("Z", "");
}

function log(...args) {
  const line = args.map((a) => (typeof a === "string" ? a : JSON.stringify(a, null, 2))).join(" ");
  ui.log.textContent += `[${now()}] ${line}\n`;
  ui.log.scrollTop = ui.log.scrollHeight;
  console.log(...args);
}

function setStatus(el, ok, text) {
  el.textContent = text;
  el.className = ok ? "ok" : "bad";
}

function matrixSet(key, value) {
  state.matrix[key] = value;
  ui.matrix.textContent = JSON.stringify(state.matrix, null, 2);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setStepStatus(el, status) {
  const map = {
    not_run: { text: "not run", className: "step-status not-run" },
    running: { text: "running", className: "step-status running" },
    success: { text: "success", className: "step-status success" },
    failed: { text: "failed", className: "step-status failed" },
  };
  const s = map[status] ?? map.not_run;
  el.textContent = s.text;
  el.className = s.className;
}

function resetTestingSteps() {
  setStepStatus(ui.stepStatusQr, "not_run");
  setStepStatus(ui.stepStatusBoot, "not_run");
  setStepStatus(ui.stepStatusHello, "not_run");
  setStepStatus(ui.stepStatusJournal, "not_run");
}

function saveJournal() {
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(state.journal));
}

function getCurrentOutcomeSummary() {
  const boot = state.matrix["bridge.ready"] ? "bridge ready" : "bridge not ready";
  const hello = state.matrix["helloWorldDemo.ok"] ? "hello world success" : "hello world not confirmed";
  return `${boot}, ${hello}`;
}

function renderJournalSummary() {
  const wins = state.journal.filter((entry) => entry.outcomeType === "success").length;
  const failures = state.journal.filter((entry) => entry.outcomeType === "failure").length;
  const lastEntry = state.journal.at(-1);
  const lastRun = lastEntry?.timestamp ?? "(none yet)";
  const lastUrl = state.matrix["qrTest.url"] ?? "(generate QR to capture)";

  ui.journalSummary.innerHTML = [
    `<div><strong>Wins:</strong> ${wins}</div>`,
    `<div><strong>Failures:</strong> ${failures}</div>`,
    `<div><strong>Last run:</strong> ${lastRun}</div>`,
    `<div><strong>Last URL:</strong> ${lastUrl}</div>`,
  ].join("");
}

function renderJournal() {
  ui.journalList.innerHTML = "";
  if (!state.journal.length) {
    ui.journalEmpty.style.display = "block";
    renderJournalSummary();
    return;
  }

  ui.journalEmpty.style.display = "none";
  for (const item of [...state.journal].reverse()) {
    const li = document.createElement("li");
    li.className = "journal-item";
    li.innerHTML = `
      <div class="journal-meta">${item.timestamp} · ${item.outcomeType} · ${item.outcome}</div>
      <div>${item.notes}</div>
      <div class="tiny muted">URL: ${item.url || "(unknown)"}</div>
    `;
    ui.journalList.appendChild(li);
  }

  renderJournalSummary();
}

function loadJournal() {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    state.journal = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    log("Journal load ERROR:", String(e));
    state.journal = [];
  }

  renderJournal();
}

function recordJournalEntry() {
  setStepStatus(ui.stepStatusJournal, "running");

  const notes = ui.journalNotes.value.trim() || "No extra notes.";
  const outcomeType = ui.journalOutcome.value === "failure" ? "failure" : "success";

  const entry = {
    timestamp: now(),
    outcomeType,
    outcome: getCurrentOutcomeSummary(),
    notes,
    url: state.matrix["qrTest.url"] || buildGitHubPagesUrl(),
  };

  state.journal.push(entry);
  saveJournal();
  renderJournal();
  ui.journalNotes.value = "";
  setStepStatus(ui.stepStatusJournal, "success");
  log("Developer Journal entry added:", entry);
}

function resetJournal() {
  state.journal = [];
  saveJournal();
  renderJournal();
  setStepStatus(ui.stepStatusJournal, "not_run");
  log("Developer Journal reset.");
}

function getStepStatusLabel(el) {
  return (el?.textContent || "not run").trim().toLowerCase();
}

function getRecentLogs(limit = 40) {
  return (ui.log.textContent || "")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .slice(-limit);
}

function buildReportData() {
  return {
    generatedAt: new Date().toISOString(),
    testedUrl: state.matrix["qrTest.url"] || buildGitHubPagesUrl(),
    testedAt: state.matrix["qrTest.timestamp"] || "(not generated yet)",
    status: {
      generatedQr: getStepStatusLabel(ui.stepStatusQr),
      bridgeConnection: getStepStatusLabel(ui.stepStatusBoot),
      helloWorldDemo: getStepStatusLabel(ui.stepStatusHello),
      recordConfirmation: getStepStatusLabel(ui.stepStatusJournal),
      bridgeReady: !!state.matrix["bridge.ready"],
      startupPageCreated: !!state.matrix["createStartUpPageContainer.ok"],
      helloWorldConfirmed: !!state.matrix["helloWorldDemo.ok"],
      latestOutcomeSummary: getCurrentOutcomeSummary(),
    },
    matrixSnapshot: state.matrix,
    recentLogs: getRecentLogs(),
    journalSnapshot: state.journal,
  };
}

function buildMarkdownSummary() {
  const data = buildReportData();
  return [
    "# Even Hub Test Summary",
    `- Timestamp: ${data.generatedAt}`,
    `- Tested URL: ${data.testedUrl}`,
    `- Current status: ${data.status.latestOutcomeSummary}`,
    `- Steps: QR=${data.status.generatedQr}, Boot=${data.status.bridgeConnection}, Hello=${data.status.helloWorldDemo}, Journal=${data.status.recordConfirmation}`,
    `- Journal entries: ${data.journalSnapshot.length}`,
    "",
  ].join("\n");
}

function buildMarkdownFullReport() {
  const data = buildReportData();
  return [
    "# Even Hub Test Report",
    "",
    "## Context",
    `- Timestamp: ${data.generatedAt}`,
    `- Tested URL: ${data.testedUrl}`,
    `- URL timestamp: ${data.testedAt}`,
    "",
    "## Current Status Matrix",
    "```json",
    JSON.stringify(data.status, null, 2),
    "```",
    "",
    "## Capabilities Matrix Snapshot",
    "```json",
    JSON.stringify(data.matrixSnapshot, null, 2),
    "```",
    "",
    "## Recent Logs",
    "```text",
    data.recentLogs.length ? data.recentLogs.join("\n") : "(no logs yet)",
    "```",
    "",
    "## Journal Snapshot",
    "```json",
    JSON.stringify(data.journalSnapshot, null, 2),
    "```",
    "",
  ].join("\n");
}

async function copyToClipboard(name, content) {
  try {
    await navigator.clipboard.writeText(content);
    log(`${name}: copied to clipboard ✅`);
  } catch (e) {
    log(`${name}: clipboard write failed, opening fallback prompt:`, String(e));
    window.prompt("Copy the text below:", content);
  }
}

function downloadReportMarkdown() {
  const content = buildMarkdownFullReport();
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const a = document.createElement("a");
  a.href = url;
  a.download = `evenhub-report-${stamp}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  log("Download Report: markdown file created.");
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

function generateQrForGlassesTest() {
  setStepStatus(ui.stepStatusQr, "running");
  try {
    const qrLib = window.QRCode;
    if (!qrLib) throw new Error("QRCode library is not loaded.");

    const { url, timestamp } = buildCacheBustedUrl();
    ui.qrUrl.textContent = url;
    ui.qrTimestamp.textContent = timestamp;

    ui.qrCode.innerHTML = "";
    new qrLib(ui.qrCode, { text: url, width: 220, height: 220, correctLevel: qrLib.CorrectLevel.M });

    matrixSet("qrTest.url", url);
    matrixSet("qrTest.timestamp", timestamp);
    setStepStatus(ui.stepStatusQr, "success");
    renderJournalSummary();
    log("Generated glasses test QR:", { url, timestamp });
  } catch (e) {
    log("Generate QR ERROR:", String(e));
    setStepStatus(ui.stepStatusQr, "failed");
    matrixSet("qrTest.error", String(e));
  }
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
  ui.btnBoot.disabled = true;
  setStepStatus(ui.stepStatusBoot, "running");
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

    try {
      state.bridge.onDeviceStatusChanged((status) => {
        log("deviceStatusChanged:", status);
        matrixSet("events.deviceStatusChanged.last", status);
      });
      matrixSet("events.deviceStatusChanged.subscribed", true);
    } catch (e) {
      matrixSet("events.deviceStatusChanged.subscribed", false);
      matrixSet("events.deviceStatusChanged.error", String(e));
    }

    try {
      state.bridge.onEvenHubEvent((event) => {
        log("evenHubEvent:", event);
        matrixSet("events.evenHubEvent.last", event);
      });
      matrixSet("events.evenHubEvent.subscribed", true);
    } catch (e) {
      matrixSet("events.evenHubEvent.subscribed", false);
      matrixSet("events.evenHubEvent.error", String(e));
    }

    setStepStatus(ui.stepStatusBoot, "success");
    log("Boot complete.");
  } catch (e) {
    log("Boot FAILED:", String(e));
    setStatus(ui.sdkStatus, false, "failed ❌");
    setStatus(ui.bridgeStatus, false, "failed ❌");
    setStepStatus(ui.stepStatusBoot, "failed");
    matrixSet("boot.error", String(e));
  } finally {
    ui.btnBoot.disabled = false;
  }
}

async function ensureBridge() {
  if (!state.bridge) await boot();
  if (!state.bridge) throw new Error("Bridge not available (boot failed).");
  return state.bridge;
}

async function probeGetUserInfo() {
  const bridge = await ensureBridge();
  try {
    const user = await bridge.getUserInfo();
    log("UserInfo:", user);
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
    log("DeviceInfo:", dev);
    matrixSet("getDeviceInfo.ok", true);
    matrixSet("getDeviceInfo.value", dev);
  } catch (e) {
    matrixSet("getDeviceInfo.ok", false);
    matrixSet("getDeviceInfo.error", String(e));
  }
}

async function probeCreateStartup() {
  const bridge = await ensureBridge();
  try {
    const { CreateStartUpPageContainer } = state.SDK;
    const payload = new CreateStartUpPageContainer({
      containerTotalNum: 1,
      textObject: [{ xPosition: 0, yPosition: 0, width: 480, height: 80, containerID: 1, containerName: "t1", content: "Hello from EvenHub Starter Kit!" }],
    });
    const result = await bridge.createStartUpPageContainer(payload);
    const ok = result === 0 || result === "success" || result?.toString?.() === "0";
    setStatus(ui.startupStatus, ok, ok ? "created ✅" : `failed (${result}) ❌`);
    matrixSet("createStartUpPageContainer.ok", ok);
    matrixSet("createStartUpPageContainer.result", result);
  } catch (e) {
    setStatus(ui.startupStatus, false, "failed ❌");
    matrixSet("createStartUpPageContainer.ok", false);
    matrixSet("createStartUpPageContainer.error", String(e));
  }
}

async function runHelloWorldDemo() {
  ui.btnHelloWorld.disabled = true;
  setStepStatus(ui.stepStatusHello, "running");
  try {
    matrixSet("helloWorldDemo.startedAt", now());
    await boot();

    const attempts = 3;
    let lastResult = null;
    let success = false;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      log(`Hello world attempt ${attempt}/${attempts}`);
      await probeCreateStartup();
      const createOk = state.matrix["createStartUpPageContainer.ok"];
      lastResult = state.matrix["createStartUpPageContainer.result"];
      if (createOk) {
        success = true;
        break;
      }
      if (attempt < attempts) await sleep(1200);
    }

    matrixSet("helloWorldDemo.attempts", attempts);
    matrixSet("helloWorldDemo.ok", success);
    matrixSet("helloWorldDemo.lastResult", lastResult);
    setStepStatus(ui.stepStatusHello, success ? "success" : "failed");
  } catch (e) {
    setStepStatus(ui.stepStatusHello, "failed");
    matrixSet("helloWorldDemo.ok", false);
    matrixSet("helloWorldDemo.error", String(e));
  } finally {
    ui.btnHelloWorld.disabled = false;
  }
}

async function probeTextUpgrade() {
  const bridge = await ensureBridge();
  try {
    const { TextContainerUpgrade } = state.SDK;
    const text = `Upgraded @ ${now()}\nIf you see this on the glasses, textContainerUpgrade works.`;
    const payload = new TextContainerUpgrade({ containerID: 1, containerName: "t1", contentOffset: 0, contentLength: text.length, content: text });
    const ok = await bridge.textContainerUpgrade(payload);
    matrixSet("textContainerUpgrade.ok", !!ok);
    matrixSet("textContainerUpgrade.lastLen", text.length);
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
      textObject: [{ xPosition: 0, yPosition: 0, width: 480, height: 80, containerID: 1, containerName: "t1", content: `Rebuild @ ${now()}` }],
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
    const val = now();
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

ui.btnBoot.addEventListener("click", boot);
ui.btnHelloWorld.addEventListener("click", runHelloWorldDemo);
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
ui.btnGenerateQr.addEventListener("click", generateQrForGlassesTest);
ui.btnJournalConfirm.addEventListener("click", recordJournalEntry);
ui.btnJournalReset.addEventListener("click", resetJournal);
ui.btnCopySummary.addEventListener("click", () => copyToClipboard("Copy Summary", buildMarkdownSummary()));
ui.btnCopyFullReport.addEventListener("click", () => copyToClipboard("Copy Full Report", buildMarkdownFullReport()));
ui.btnDownloadReport.addEventListener("click", downloadReportMarkdown);
ui.advancedSearch.addEventListener("input", filterAdvancedButtons);

resetTestingSteps();
loadJournal();
generateQrForGlassesTest();
boot();
