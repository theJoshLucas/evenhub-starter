// Even Hub Starter Kit - no build step
// Goal: load @evenrealities/even_hub_sdk, connect to EvenAppBridge, and run small probes.
// This is intentionally verbose + defensive, because constrained WebViews are… spicy.

const $ = (id) => document.getElementById(id);

const ui = {
  sdkStatus: $("sdkStatus"),
  fiawvStatus: $("fiawvStatus"),
  bridgeStatus: $("bridgeStatus"),
  startupStatus: $("startupStatus"),
  log: $("log"),
  matrix: $("matrix"),
  btnBoot: $("btnBoot"),
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

const state = {
  SDK: null,
  bridge: null,
  // Keep track of container details so rebuild/text upgrade have something to target
  container: {
    containerTotalNum: 1,
    containerID: 101,
    containerName: "starter_text_101",
  },
  // Capabilities matrix you’re building (in-memory)
  matrix: {},
};

function now() {
  return new Date().toISOString().replace("T", " ").replace("Z", "");
}
function log(...args) {
  const line = args.map(a => (typeof a === "string" ? a : JSON.stringify(a, null, 2))).join(" ");
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

// ---- SDK loading (try a couple CDNs) ----
async function importSdk() {
  // Strategy:
  // 1) esm.sh (fast + clean ESM)
  // 2) unpkg ?module fallback
  // If you prefer a single source, delete one.
  const candidates = [
    "https://esm.sh/@evenrealities/even_hub_sdk@0.0.7",
    "https://unpkg.com/@evenrealities/even_hub_sdk@0.0.7/dist/index.js",
  ];

  let lastErr = null;
  for (const url of candidates) {
    try {
      log(`Attempting SDK import: ${url}`);
      const mod = await import(url);
      if (mod?.EvenAppBridge) {
        log("SDK import success.");
        return mod;
      }
      lastErr = new Error("Module loaded but missing EvenAppBridge export.");
      log(String(lastErr));
    } catch (e) {
      lastErr = e;
      log(`SDK import failed: ${String(e)}`);
    }
  }
  throw lastErr ?? new Error("SDK import failed (unknown).");
}

// ---- Bridge boot ----
async function boot() {
  ui.btnBoot.disabled = true;
  try {
    setStatus(ui.sdkStatus, false, "loading…");
    setStatus(ui.fiawvStatus, false, "checking…");
    setStatus(ui.bridgeStatus, false, "connecting…");

    // detect flutter_inappwebview presence
    const hasFIAWV = !!(window.flutter_inappwebview && window.flutter_inappwebview.callHandler);
    setStatus(ui.fiawvStatus, hasFIAWV, hasFIAWV ? "present ✅" : "missing ❌");
    matrixSet("flutter_inappwebview.present", hasFIAWV);

    state.SDK = await importSdk();
    setStatus(ui.sdkStatus, true, "loaded ✅");
    matrixSet("sdk.loaded", true);

    const { waitForEvenAppBridge, EvenAppBridge, BridgeEvent } = state.SDK;

    // Some environments don’t auto-init; getInstance() is a safe nudge.
    try { EvenAppBridge.getInstance(); } catch (_) {}

    state.bridge = await waitForEvenAppBridge();
    setStatus(ui.bridgeStatus, true, "ready ✅");
    matrixSet("bridge.ready", true);

    // Subscribe to device status changes
    try {
      state.bridge.onDeviceStatusChanged((status) => {
        log("deviceStatusChanged:", status);
        matrixSet("events.deviceStatusChanged.last", status);
      });
      matrixSet("events.deviceStatusChanged.subscribed", true);
    } catch (e) {
      log("Failed subscribing deviceStatusChanged:", String(e));
      matrixSet("events.deviceStatusChanged.subscribed", false);
      matrixSet("events.deviceStatusChanged.error", String(e));
    }

    // Subscribe to EvenHub events
    try {
      state.bridge.onEvenHubEvent((event) => {
        log("evenHubEvent:", event);
        matrixSet("events.evenHubEvent.last", event);
      });
      matrixSet("events.evenHubEvent.subscribed", true);
    } catch (e) {
      log("Failed subscribing evenHubEvent:", String(e));
      matrixSet("events.evenHubEvent.subscribed", false);
      matrixSet("events.evenHubEvent.error", String(e));
    }

    log("Boot complete.");
  } catch (e) {
    log("Boot FAILED:", String(e));
    setStatus(ui.sdkStatus, false, "failed ❌");
    setStatus(ui.bridgeStatus, false, "failed ❌");
    matrixSet("boot.error", String(e));
  } finally {
    ui.btnBoot.disabled = false;
  }
}

// ---- Probes ----
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
    log("getUserInfo ERROR:", String(e));
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
    log("getDeviceInfo ERROR:", String(e));
    matrixSet("getDeviceInfo.ok", false);
    matrixSet("getDeviceInfo.error", String(e));
  }
}

async function probeCreateStartup() {
  const bridge = await ensureBridge();
  try {
    const { CreateStartUpPageContainer } = state.SDK;

    // Minimal container: one text box.
    const payload = new CreateStartUpPageContainer({
      containerTotalNum: 1,
      textObject: [
        {
      xPosition: 0,
      yPosition: 0,
      width: 480,
      height: 80,
      containerID: 1,
      containerName: "t1",
      content: "Hello from EvenHub Starter Kit!"
        },
      ],
    });

    log("Calling createStartUpPageContainer…", payload.toJson?.() ?? payload);
    const result = await bridge.createStartUpPageContainer(payload);
    log("createStartUpPageContainer result:", result);

    // SDK docs say: 0 success, 1 invalid, 2 oversize, 3 outOfMemory
    const ok = (result === 0 || result === "success" || result?.toString?.() === "0");
    setStatus(ui.startupStatus, ok, ok ? "created ✅" : `failed (${result}) ❌`);

    matrixSet("createStartUpPageContainer.ok", ok);
    matrixSet("createStartUpPageContainer.result", result);
  } catch (e) {
    log("createStartUpPageContainer ERROR:", String(e));
    setStatus(ui.startupStatus, false, "failed ❌");
    matrixSet("createStartUpPageContainer.ok", false);
    matrixSet("createStartUpPageContainer.error", String(e));
  }
}

async function probeTextUpgrade() {
  const bridge = await ensureBridge();
  try {
    const { TextContainerUpgrade } = state.SDK;

    const text = `Upgraded @ ${now()}\nIf you see this on the glasses, textContainerUpgrade works.`;
    const payload = new TextContainerUpgrade({
      containerID: state.container.containerID,
      containerName: state.container.containerName,
      contentOffset: 0,
      contentLength: text.length,
      content: text,
    });

    log("Calling textContainerUpgrade…", payload.toJson?.() ?? payload);
    const ok = await bridge.textContainerUpgrade(payload);
    log("textContainerUpgrade result:", ok);

    matrixSet("textContainerUpgrade.ok", !!ok);
    matrixSet("textContainerUpgrade.lastLen", text.length);
  } catch (e) {
    log("textContainerUpgrade ERROR:", String(e));
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
      textObject: [
        {
          xPosition: 0,
          yPosition: 0,
          width: 480,
          height: 120,
          borderWidth: 1,
          borderColor: 0xffffff,
          borderRdaius: 8,
          paddingLength: 8,
          containerID: state.container.containerID,
          containerName: state.container.containerName,
          isEventCapture: 1,
          content: `Rebuild @ ${now()}`,
        },
      ],
    });

    log("Calling rebuildPageContainer…", payload.toJson?.() ?? payload);
    const ok = await bridge.rebuildPageContainer(payload);
    log("rebuildPageContainer result:", ok);

    matrixSet("rebuildPageContainer.ok", !!ok);
  } catch (e) {
    log("rebuildPageContainer ERROR:", String(e));
    matrixSet("rebuildPageContainer.ok", false);
    matrixSet("rebuildPageContainer.error", String(e));
  }
}

async function probeShutdown() {
  const bridge = await ensureBridge();
  try {
    log("Calling shutDownPageContainer(exitMode=1)…");
    const ok = await bridge.shutDownPageContainer(1);
    log("shutDownPageContainer result:", ok);
    matrixSet("shutDownPageContainer.ok", !!ok);
  } catch (e) {
    log("shutDownPageContainer ERROR:", String(e));
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
    log("setLocalStorage:", { key, val, ok });
    matrixSet("setLocalStorage.ok", !!ok);
    matrixSet("setLocalStorage.last", { key, val });
  } catch (e) {
    log("setLocalStorage ERROR:", String(e));
    matrixSet("setLocalStorage.ok", false);
    matrixSet("setLocalStorage.error", String(e));
  }
}

async function probeGetLocalStorage() {
  const bridge = await ensureBridge();
  try {
    const key = "starterKit.lastSet";
    const val = await bridge.getLocalStorage(key);
    log("getLocalStorage:", { key, val });
    matrixSet("getLocalStorage.ok", true);
    matrixSet("getLocalStorage.last", { key, val });
  } catch (e) {
    log("getLocalStorage ERROR:", String(e));
    matrixSet("getLocalStorage.ok", false);
    matrixSet("getLocalStorage.error", String(e));
  }
}

async function probeAudio(on) {
  const bridge = await ensureBridge();
  try {
    const ok = await bridge.audioControl(!!on);
    log(`audioControl(${!!on}) result:`, ok);
    matrixSet(`audioControl.${on ? "on" : "off"}.ok`, !!ok);
  } catch (e) {
    log("audioControl ERROR:", String(e));
    matrixSet(`audioControl.${on ? "on" : "off"}.ok`, false);
    matrixSet(`audioControl.${on ? "on" : "off"}.error`, String(e));
  }
}

// ---- Wire up UI ----
ui.btnBoot.addEventListener("click", boot);
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

// Auto-boot on load (nice for QR workflow)
boot();
