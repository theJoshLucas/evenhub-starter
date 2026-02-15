const $ = (id) => document.getElementById(id);

const ui = {
  page1: $("page1"),
  page2: $("page2"),
  page3: $("page3"),
  testTitle: $("testTitle"),
  testGoal: $("testGoal"),
  testApiName: $("testApiName"),
  testApiMeaning: $("testApiMeaning"),
  testUnlocks: $("testUnlocks"),
  testDiffFromPrev: $("testDiffFromPrev"),
  lookForViewer: $("lookForViewer"),
  lookForViewerPage2: $("lookForViewerPage2"),
  expectedLayoutPage1: $("expectedLayoutPage1"),
  expectedLayoutPage2: $("expectedLayoutPage2"),
  btnPrevTest: $("btnPrevTest"),
  btnRunTest: $("btnRunTest"),
  runStatus: $("runStatus"),
  buildStatus: $("buildStatus"),
  btnYes: $("btnYes"),
  btnNo: $("btnNo"),
  btnNotSure: $("btnNotSure"),
  detailsWrap: $("detailsWrap"),
  notesInput: $("notesInput"),
  btnSubmit: $("btnSubmit"),
  submitStatus: $("submitStatus"),
  confirmationTitle: $("confirmationTitle"),
  btnNext: $("btnNext"),
  btnDebug: $("btnDebug"),
  btnRetry: $("btnRetry"),
  debugWrap: $("debugWrap"),
  debugPrompt: $("debugPrompt"),
  btnCopyPrompt: $("btnCopyPrompt"),
};

const GITHUB_EXPORT_SETTINGS_KEY = "starterKit.githubExportSettings.v1";
const TEST_COUNTER_KEY = "starterKit.testCounter.v1";
const BUILD_META_URL = "./build-meta.json";

const TESTS = [
  {
    id: "bridge-availability-check",
    title: "Bridge availability check",
    goal: "Confirm the app can connect to the Even bridge and stays responsive.",
    sdkTarget: "waitForEvenAppBridge()",
    plainMeaning: "This waits until the app is actually connected to the glasses bridge instead of guessing.",
    unlocks: "Reliable communication with the glasses before we try any startup-page commands.",
    differsFromPrevious: "This is the baseline test, so there is no earlier test to compare against.",
    buildExpectedText: () => `Bridge check @ ${isoNow()}`,
  },
  {
    id: "hello-world-startup",
    title: "Startup text render",
    goal: "Confirm a basic startup message appears on the glasses.",
    sdkTarget: "bridge.createStartUpPageContainer(new CreateStartUpPageContainer(...))",
    plainMeaning: "We send one simple text block to the glasses startup page.",
    unlocks: "Proof that we can show custom startup content at all.",
    differsFromPrevious: "Now we move from just connecting to actually sending visible content.",
    buildExpectedText: () => `Hello world @ ${isoNow()}`,
  },
  {
    id: "startup-offset-size",
    title: "Startup render with changed position/size",
    goal: "Confirm text still renders when moved and resized.",
    sdkTarget: "CreateStartUpPageContainer textObject layout fields (xPosition, yPosition, width, height)",
    plainMeaning: "We keep one text block, but change where it appears and how big its box is.",
    unlocks: "Control over layout so you can design readable startup screens, not just default placement.",
    differsFromPrevious: "Previous test proved basic rendering; this one proves layout customization.",
    buildExpectedText: () => `Offset text @ ${isoNow()}`,
  },
  {
    id: "startup-multi-container",
    title: "Multi-container startup page",
    goal: "Confirm two separate text blocks appear together on startup.",
    sdkTarget: "CreateStartUpPageContainer.containerTotalNum + multiple textObject entries",
    plainMeaning: "We send two independent text containers in one startup payload.",
    unlocks: "Ability to build multi-line or multi-section startup UIs (for example title + status line).",
    differsFromPrevious: "Previous test used one container; this one verifies multiple containers together.",
    buildExpectedText: () => `Block A @ ${isoNow()}`,
  },
  {
    id: "rerun-update-stability",
    title: "Re-run update stability",
    goal: "Confirm running startup updates twice in a row does not freeze.",
    sdkTarget: "Repeated calls to bridge.textContainerUpgrade() for existing containers",
    plainMeaning: "We update the same existing startup containers twice quickly to make sure updates stay stable.",
    unlocks: "Confidence that your app can refresh startup content without hanging.",
    differsFromPrevious: "Previous test checked one multi-container send; this checks back-to-back updates.",
    buildExpectedText: () => `Stability run @ ${isoNow()}`,
  },
  {
    id: "intentional-bad-payload",
    title: "Error-handling test",
    goal: "Confirm an intentional bad request shows a graceful warning (not a crash).",
    sdkTarget: "Validation/error path from createStartUpPageContainer payload mismatch",
    plainMeaning: "We intentionally send malformed startup data to verify failure is handled safely.",
    unlocks: "Safer app behavior when something goes wrong, with useful warnings instead of a crash.",
    differsFromPrevious: "Previous test validates success stability; this one validates failure safety.",
    buildExpectedText: () => `Bad payload check @ ${isoNow()}`,
  },
  {
    id: "persistence-loop-sanity",
    title: "Persistence/loop sanity",
    goal: "Confirm the next-test counter advances through the sequence predictably.",
    sdkTarget: "Local test progression state via localStorage key starterKit.testCounter.v1",
    plainMeaning: "We verify the app remembers which test is next and loops through tests in order.",
    unlocks: "Predictable test navigation so you can resume and revisit tests without confusion.",
    differsFromPrevious: "Previous test focused on API errors; this one checks workflow/navigation reliability.",
    buildExpectedText: () => `Sequence check #${getCurrentCounter()} @ ${isoNow()}`,
  },
];

const state = {
  SDK: null,
  bridge: null,
  currentTestNumber: getCurrentCounter(),
  currentTest: null,
  activeRun: null,
  expectedText: "",
  diagnostics: [],
  lastRunStatusMessage: "",
  lastAutomationError: "",
  githubRecentRuns: [],
  buildCheck: {
    buildId: "unknown",
    gitSha: "unknown",
    builtAt: "unknown",
    loadedUrl: "unknown",
    freshnessCheckResult: "not_checked",
    appVersionTag: "unknown",
    isFresh: false,
    reason: "Not checked yet",
    checkedAt: "",
  },
  rerunStability: {
    consecutivePasses: 0,
  },
  startupGate: {
    idsMatch: false,
    localBuildId: "unknown",
    latestBuildId: "unknown",
    reason: "Not checked yet",
    checkedAt: "",
  },
};

function isoNow() {
  return new Date().toISOString();
}

function getCurrentCounter() {
  const raw = Number(localStorage.getItem(TEST_COUNTER_KEY) || "1");
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
}

function bumpCounter() {
  state.currentTestNumber += 1;
  localStorage.setItem(TEST_COUNTER_KEY, String(state.currentTestNumber));
}

function setCounter(value) {
  state.currentTestNumber = value;
  localStorage.setItem(TEST_COUNTER_KEY, String(state.currentTestNumber));
}

function setPage(pageNumber) {
  ui.page1.hidden = pageNumber !== 1;
  ui.page2.hidden = pageNumber !== 2;
  ui.page3.hidden = pageNumber !== 3;
}

function getActiveTest() {
  const idx = (state.currentTestNumber - 1) % TESTS.length;
  return TESTS[idx];
}

function loadGitHubExportSettings() {
  try {
    const raw = localStorage.getItem(GITHUB_EXPORT_SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed) return null;

    const repo = typeof parsed.repo === "string" ? parsed.repo.trim() : "";
    const branch = typeof parsed.branch === "string" ? parsed.branch.trim() : "main";
    const token = typeof parsed.token === "string" ? parsed.token.trim() : "";

    if (!repo || !token) return null;
    return { repo, branch: branch || "main", token };
  } catch {
    return null;
  }
}

function parseOwnerRepo(repoValue) {
  const [owner, repo] = repoValue.split("/");
  if (!owner || !repo) return null;
  return { owner, repo };
}

async function getFileSha(owner, repo, branch, path, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (resp.status === 404) return null;
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Failed checking existing file (${resp.status}): ${text}`);
  }

  const data = await resp.json();
  return data.sha || null;
}

async function fetchRecentGitHubRunFiles(limit = 5) {
  const settings = loadGitHubExportSettings();
  if (!settings) return { ok: false, reason: "GitHub settings/token not found in local storage.", files: [] };

  const ownerRepo = parseOwnerRepo(settings.repo);
  if (!ownerRepo) return { ok: false, reason: "GitHub repo format must be owner/repo.", files: [] };

  const url = `https://api.github.com/repos/${ownerRepo.owner}/${ownerRepo.repo}/contents/testing/runs?ref=${encodeURIComponent(settings.branch)}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${settings.token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!resp.ok) {
    const text = await resp.text();
    return { ok: false, reason: `Failed listing runs (${resp.status}): ${text}`, files: [] };
  }

  const data = await resp.json();
  const files = Array.isArray(data)
    ? data
      .filter((entry) => entry?.type === "file" && typeof entry?.name === "string")
      .map((entry) => entry.name)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, limit)
    : [];

  return { ok: true, reason: "", files };
}

async function commitRunToGitHub(filename, content) {
  const settings = loadGitHubExportSettings();
  if (!settings) throw new Error("GitHub settings/token not found in local storage.");

  const ownerRepo = parseOwnerRepo(settings.repo);
  if (!ownerRepo) throw new Error("GitHub repo format must be owner/repo.");

  const path = `testing/runs/${filename}`;
  const sha = await getFileSha(ownerRepo.owner, ownerRepo.repo, settings.branch, path, settings.token);

  const url = `https://api.github.com/repos/${ownerRepo.owner}/${ownerRepo.repo}/contents/${path}`;
  const payload = {
    message: `Add test run ${filename}`,
    content: btoa(unescape(encodeURIComponent(content))),
    branch: settings.branch,
  };
  if (sha) payload.sha = sha;

  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub commit failed (${resp.status}): ${text}`);
  }

  return true;
}

function sanitizeFileText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function resetDiagnostics() {
  state.diagnostics = [];
  state.lastRunStatusMessage = "";
  state.lastAutomationError = "";
  state.githubRecentRuns = [];
}

function addDiagnostic(step, details) {
  state.diagnostics.push({ at: isoNow(), step, details });
}

function summarizePayload(payloadConfig) {
  const textObject = Array.isArray(payloadConfig?.textObject) ? payloadConfig.textObject : [];
  return {
    containerTotalNum: payloadConfig?.containerTotalNum,
    textObject: textObject.map((item) => ({
      containerID: item.containerID,
      containerName: item.containerName,
      xPosition: item.xPosition,
      yPosition: item.yPosition,
      width: item.width,
      height: item.height,
      contentPreview: String(item.content ?? "").slice(0, 48),
      contentLength: String(item.content ?? "").length,
    })),
  };
}

function setBuildStatusUI() {
  if (!state.startupGate.idsMatch) {
    ui.buildStatus.hidden = false;
    ui.buildStatus.textContent = "Stale build loaded; auto-refreshing,";
    ui.buildStatus.className = "status err";
    ui.btnRefreshBuild.hidden = true;
    ui.btnRunTest.disabled = true;
    return;
  }

  const check = state.buildCheck;
  ui.buildStatus.hidden = false;

  if (check.isFresh) {
    ui.buildStatus.textContent = `Build metadata loaded. Build ID: ${check.buildId} (git ${check.gitSha}).`;
    ui.buildStatus.className = "status ok";
    ui.btnRunTest.disabled = false;
    return;
  }

  ui.buildStatus.textContent = `Build metadata missing or invalid: ${check.reason}. Tests are blocked until build-meta.json is available.`;
  ui.buildStatus.className = "status err";
  ui.btnRunTest.disabled = true;
}

async function readBuildMeta(url, fetchOptions) {
  const resp = await fetch(url, fetchOptions);
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}`);
  }

  const meta = await resp.json();
  const buildId = typeof meta?.build_id === "string" ? meta.build_id.trim() : "";
  if (!buildId) {
    throw new Error("build-meta.json is missing build_id.");
  }

  return meta;
}

function triggerAutoRefresh() {
  ui.btnRunTest.disabled = true;
  ui.btnRefreshBuild.hidden = true;
  ui.buildStatus.hidden = false;
  ui.buildStatus.textContent = "Stale build loaded; auto-refreshing,";
  ui.buildStatus.className = "status err";
  ui.runStatus.textContent = "Build is stale. Refreshing now...";
  ui.runStatus.className = "status err";

  window.setTimeout(() => {
    window.location.replace(buildRefreshUrl());
  }, 200);
}

async function enforceStartupGate() {
  const cacheBust = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const latestUrl = `${BUILD_META_URL}?fresh=${encodeURIComponent(cacheBust)}`;

  try {
    const localMeta = await readBuildMeta(BUILD_META_URL, { cache: "default" });
    const latestMeta = await readBuildMeta(latestUrl, { cache: "no-store" });
    const localBuildId = String(localMeta.build_id).trim();
    const latestBuildId = String(latestMeta.build_id).trim();
    const idsMatch = localBuildId === latestBuildId;

    state.startupGate = {
      idsMatch,
      localBuildId,
      latestBuildId,
      reason: idsMatch
        ? "Loaded build matches latest build."
        : `Loaded build_id ${localBuildId} does not match latest build_id ${latestBuildId}.`,
      checkedAt: isoNow(),
    };

    addDiagnostic("build.startup_gate", state.startupGate);

    if (!idsMatch) {
      triggerAutoRefresh();
      return false;
    }

    return true;
  } catch (error) {
    state.startupGate = {
      idsMatch: false,
      localBuildId: "unknown",
      latestBuildId: "unknown",
      reason: String(error),
      checkedAt: isoNow(),
    };
    addDiagnostic("build.startup_gate", state.startupGate);
    triggerAutoRefresh();
    return false;
  }
}

async function checkBuildFreshness() {
  const cacheBust = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const url = `${BUILD_META_URL}?fresh=${encodeURIComponent(cacheBust)}`;

  try {
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const meta = await resp.json();
    const buildId = typeof meta?.build_id === "string" ? meta.build_id.trim() : "";
    const gitSha = typeof meta?.git_sha === "string" ? meta.git_sha.trim() : "";
    const builtAt = typeof meta?.built_at === "string" ? meta.built_at.trim() : "";
    const appVersionTag = typeof meta?.app_version_tag === "string" ? meta.app_version_tag.trim() : "";

    if (!buildId || !gitSha || !builtAt || !appVersionTag) {
      throw new Error("build-meta.json is missing one or more required fields.");
    }

    state.buildCheck = {
      buildId,
      gitSha,
      builtAt,
      loadedUrl: window.location.href,
      freshnessCheckResult: "fresh",
      appVersionTag,
      isFresh: true,
      reason: "build-meta.json loaded successfully.",
      checkedAt: isoNow(),
    };
    addDiagnostic("build.check", state.buildCheck);
  } catch (error) {
    state.buildCheck = {
      buildId: "missing",
      gitSha: "missing",
      builtAt: "missing",
      loadedUrl: window.location.href,
      freshnessCheckResult: "stale",
      appVersionTag: "missing",
      isFresh: false,
      reason: String(error),
      checkedAt: isoNow(),
    };
    addDiagnostic("build.check", state.buildCheck);
  }

  setBuildStatusUI();
  return state.buildCheck;
}

function randomNonce() {
  try {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

function buildComputedRuntimeUrl(buildId, baseHref = window.location.href) {
  const next = new URL(baseHref);
  next.searchParams.set("build_id", buildId);

  if (!next.searchParams.get("nonce")) {
    next.searchParams.set("nonce", randomNonce());
  }

  if (!next.searchParams.get("ts")) {
    next.searchParams.set("ts", Date.now().toString());
  }

  return next;
}

function renderQrForCurrentUrl() {
  const qrHost = document.getElementById("qrCode");
  const qrValue = document.getElementById("qrValue");
  const currentUrl = window.location.href;

  if (qrValue) {
    qrValue.textContent = currentUrl;
  }

  if (!qrHost || typeof QRCode !== "function") {
    return;
  }

  qrHost.innerHTML = "";
  new QRCode(qrHost, {
    text: currentUrl,
    width: 200,
    height: 200,
  });
}

function syncRuntimeUrl(buildId) {
  const current = new URL(window.location.href);
  const next = buildComputedRuntimeUrl(buildId, current.toString());
  const currentBuildId = current.searchParams.get("build_id");
  const nextHref = next.toString();

  if (currentBuildId !== buildId) {
    window.location.replace(nextHref);
    return false;
  }

  if (nextHref !== current.toString()) {
    window.history.replaceState({}, "", nextHref);
  }

  renderQrForCurrentUrl();
  return true;
}

function buildFingerprintLines(run) {
  const check = run?.buildCheck || state.buildCheck;
  return [
    `- build_id: ${run?.buildId || check.buildId || "unknown"}`,
    `- git_sha: ${check.gitSha || "unknown"}`,
    `- built_at: ${check.builtAt || "unknown"}`,
    `- loaded_url: ${check.loadedUrl || window.location.href || "unknown"}`,
    `- freshness_check_result: ${check.freshnessCheckResult || (check.isFresh ? "fresh" : "stale")}`,
    `- app_version_tag: ${check.appVersionTag || "unknown"}`,
    `- build_is_fresh: ${check.isFresh}`,
    `- build_check_reason: ${check.reason || "(none)"}`,
    "- rerun_strategy: two-container non-empty update payload",
  ];
}

function buildRunMarkdown(run) {
  return [
    `# Test Run: ${run.testTitle}`,
    "",
    `- test_id: ${run.testId}`,
    `- run_at: ${run.runAt}`,
    `- result: ${run.result}`,
    `- answer: ${run.answer}`,
    `- startup_created: ${run.startupCreated}`,
    `- build_id: ${run.buildId || run.buildCheck?.buildId || "unknown"}`,
    `- git_sha: ${run.buildCheck?.gitSha || "unknown"}`,
    `- built_at: ${run.buildCheck?.builtAt || "unknown"}`,
    `- loaded_url: ${run.buildCheck?.loadedUrl || window.location.href || "unknown"}`,
    `- freshness_check_result: ${run.buildCheck?.freshnessCheckResult || ((run.buildCheck?.isFresh ?? true) ? "fresh" : "stale")}`,
    `- app_version_tag: ${run.buildCheck?.appVersionTag || "unknown"}`,
    `- build_is_fresh: ${run.buildCheck?.isFresh ?? true}`,
    `- run_status_message: ${run.statusMessage || "(none)"}`,
    ...(run.automationError ? [`- automation_error: ${run.automationError}`] : []),
    "",
    "## Goal",
    run.goal,
    "",
    "## Expected on glasses",
    ...run.lookFor.map((line) => `- ${line}`),
    ...(run.layoutHint ? ["", "## Expected layout", run.layoutHint] : []),
    "",
    "## GitHub recent run files (before save)",
    ...(Array.isArray(run.githubRecentRuns) && run.githubRecentRuns.length
      ? run.githubRecentRuns.map((line) => `- ${line}`)
      : ["- (not available)"]),
    "",
    "## Diagnostics",
    ...(Array.isArray(run.diagnostics) && run.diagnostics.length
      ? run.diagnostics.map((entry) => `- [${entry.at}] ${entry.step}: ${typeof entry.details === "string" ? entry.details : JSON.stringify(entry.details)}`)
      : ["- (none)"]),
    "",
    "## Notes",
    run.notes || "(none)",
    "",
  ].join("\n");
}

function getPreviousTestId(currentTestId) {
  const currentIndex = TESTS.findIndex((entry) => entry.id === currentTestId);
  if (currentIndex < 0) return "";
  const previousIndex = (currentIndex - 1 + TESTS.length) % TESTS.length;
  return TESTS[previousIndex]?.id || "";
}

async function importSdk() {
  const candidates = [
    "https://esm.sh/@evenrealities/even_hub_sdk@0.0.7",
    "https://unpkg.com/@evenrealities/even_hub_sdk@0.0.7/dist/index.js",
  ];

  let lastErr = null;
  for (const url of candidates) {
    try {
      const mod = await import(url);
      if (mod?.EvenAppBridge) return mod;
      lastErr = new Error("Module loaded but missing EvenAppBridge export.");
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("SDK import failed (unknown).");
}

async function ensureBridge() {
  if (state.bridge) return state.bridge;
  state.SDK = state.SDK || await importSdk();
  const { waitForEvenAppBridge, EvenAppBridge } = state.SDK;
  try { EvenAppBridge.getInstance(); } catch {}
  state.bridge = await waitForEvenAppBridge();
  return state.bridge;
}

async function probeCreateStartup(expectedText) {
  const payload = {
    containerTotalNum: 1,
    textObject: [{
      xPosition: 0,
      yPosition: 0,
      width: 480,
      height: 80,
      containerID: 1,
      containerName: "t1",
      content: expectedText,
    }],
  };
  return probeCreateStartupWithPayload(payload);
}

function guardStartupPayload(payloadConfig) {
  const normalized = {
    ...payloadConfig,
    textObject: Array.isArray(payloadConfig?.textObject) ? payloadConfig.textObject : [],
  };

  const expectedCount = normalized.textObject.length;
  if (normalized.containerTotalNum !== expectedCount) {
    addDiagnostic("createStartUpPageContainer.guard", {
      reason: "containerTotalNum did not match textObject length",
      originalContainerTotalNum: normalized.containerTotalNum,
      expectedTextObjectLength: expectedCount,
      action: "corrected_before_send",
    });
    normalized.containerTotalNum = expectedCount;
  }

  return normalized;
}

async function probeCreateStartupWithPayload(payloadConfig, metadata = {}) {
  const normalizedPayloadConfig = guardStartupPayload(payloadConfig);
  const payloadSummary = summarizePayload(normalizedPayloadConfig);
  addDiagnostic("createStartUpPageContainer.request", payloadSummary);
  const bridge = await ensureBridge();
  const { CreateStartUpPageContainer } = state.SDK;
  const payload = new CreateStartUpPageContainer(normalizedPayloadConfig);
  const result = await bridge.createStartUpPageContainer(payload);
  const success = result === 0 || result === "0";
  addDiagnostic("createStartUpPageContainer.response", { success, rawResult: result });

  if (!success) {
    addDiagnostic("rerun.lifecycle.error_context", {
      operationType: metadata.operationType || "create",
      attemptNumber: metadata.attemptNumber || 1,
      rawResult: result,
      payloadSummary: {
        containerTotalNum: payloadSummary.containerTotalNum,
        containers: payloadSummary.textObject.map((container) => ({
          id: container.containerID,
          name: container.containerName,
        })),
      },
    });
  }

  return success;
}

async function probeTextContainerUpgradeWithPayload(payloadConfig) {
  const normalizedPayloadConfig = guardStartupPayload(payloadConfig);
  const payloadSummary = summarizePayload(normalizedPayloadConfig);
  addDiagnostic("textContainerUpgrade.request", payloadSummary);
  const bridge = await ensureBridge();
  const { TextContainerUpgrade } = state.SDK;
  const payload = new TextContainerUpgrade(normalizedPayloadConfig);
  const result = await bridge.textContainerUpgrade(payload);
  const success = result === 0 || result === "0";
  addDiagnostic("textContainerUpgrade.response", { success, rawResult: result });
  return success;
}

async function probeRebuildPageContainerWithPayload(payloadConfig) {
  const normalizedPayloadConfig = guardStartupPayload(payloadConfig);
  const payloadSummary = summarizePayload(normalizedPayloadConfig);
  addDiagnostic("rebuildPageContainer.request", payloadSummary);
  const bridge = await ensureBridge();
  const { RebuildPageContainer } = state.SDK;
  const payload = new RebuildPageContainer(normalizedPayloadConfig);
  const result = await bridge.rebuildPageContainer(payload);
  const success = result === 0 || result === "0";
  addDiagnostic("rebuildPageContainer.response", { success, rawResult: result });
  return success;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function probeCreateStartupWithRetry(payloadConfig, retries = 1, delayMs = 250, metadata = {}) {
  let lastResult = false;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    addDiagnostic("createStartUpPageContainer.attempt", { attempt: attempt + 1, totalAttempts: retries + 1 });
    lastResult = await probeCreateStartupWithPayload(payloadConfig, {
      operationType: metadata.operationType || "create",
      attemptNumber: attempt + 1,
    });
    if (lastResult) return true;
    if (attempt < retries) {
      addDiagnostic(`${label}.retry_wait`, { delayMs });
      await sleep(delayMs);
    }
  }
  return lastResult;
}

async function probeCreateStartupWithRetry(payloadConfig, retries = 1, delayMs = 250) {
  return probeWithRetry("createStartUpPageContainer", () => probeCreateStartupWithPayload(payloadConfig), retries, delayMs);
}

async function probeTextContainerUpgradeWithRetry(payloadConfig, retries = 1, delayMs = 250) {
  return probeWithRetry("textContainerUpgrade", () => probeTextContainerUpgradeWithPayload(payloadConfig), retries, delayMs);
}


function renderExpectedLines(lines) {
  return Array.isArray(lines) ? lines.join("\n") : String(lines || "");
}

function getPreviewForTest(test, expectedText) {
  if (test.id === "startup-multi-container") {
    return {
      lines: [expectedText, `Block B @ ${isoNow()}`],
      layoutHint: "Expected layout: Block A then Block B, with no intentionally blank spacer lines between them.",
    };
  }

  if (test.id === "rerun-update-stability") {
    return {
      lines: [`${expectedText} (2/2)`, "Update marker"],
      layoutHint: "Expected layout: this test may show two lines while replacing previous Block A/Block B content.",
    };
  }

  return {
    lines: [expectedText],
    layoutHint: "",
  };
}

async function runTestById(test, expectedText) {
  switch (test.id) {
    case "bridge-availability-check": {
      await ensureBridge();
      return {
        startupCreated: true,
        lookFor: ["Status says bridge connection succeeded and no freeze occurs."],
        statusMessage: "Bridge connected successfully. App stayed responsive.",
      };
    }
    case "hello-world-startup": {
      const startupCreated = await probeCreateStartup(expectedText);
      return {
        startupCreated,
        lookFor: [expectedText],
        statusMessage: startupCreated
          ? "Startup text sent successfully. Confirm it appears on the glasses."
          : "Startup call returned an error code. Continue with your observation.",
      };
    }
    case "startup-offset-size": {
      const startupCreated = await probeCreateStartupWithPayload({
        containerTotalNum: 1,
        textObject: [{
          xPosition: 40,
          yPosition: 120,
          width: 360,
          height: 120,
          containerID: 1,
          containerName: "offset-box",
          content: expectedText,
        }],
      });
      return {
        startupCreated,
        lookFor: [expectedText],
        statusMessage: startupCreated
          ? "Offset/size startup text sent. Confirm its position looks different."
          : "Offset/size test returned an error code. Continue with your observation.",
      };
    }
    case "startup-multi-container": {
      const secondLine = `Block B @ ${isoNow()}`;
      const startupPayload = {
        containerTotalNum: 2,
        textObject: [
          {
            xPosition: 0,
            yPosition: 0,
            width: 480,
            height: 80,
            containerID: 1,
            containerName: "multi-a",
            content: expectedText,
          },
          {
            xPosition: 0,
            yPosition: 90,
            width: 480,
            height: 80,
            containerID: 2,
            containerName: "multi-b",
            content: secondLine,
          },
        ],
      };
      const startupCreated = await probeCreateStartupWithRetry(startupPayload, 1, 300);
      return {
        startupCreated,
        lookFor: [
          expectedText,
          secondLine,
        ],
        layoutHint: "Expected layout: Block A then Block B, with no intentionally blank spacer lines between them.",
        statusMessage: startupCreated
          ? "Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font)."
          : "Multi-container test returned an error code. Continue with your observation.",
      };
    }
    case "rerun-update-stability": {
      const firstPass = `${expectedText} (1/2)`;
      const secondPass = `${expectedText} (2/2)`;
      const previousTestId = getPreviousTestId(test.id);
      const firstUpdatePayload = {
        containerTotalNum: 2,
        textObject: [
          {
            xPosition: 0,
            yPosition: 0,
            width: 480,
            height: 80,
            containerID: 1,
            containerName: "multi-a",
            content: firstPass,
          },
          {
            xPosition: 0,
            yPosition: 90,
            width: 480,
            height: 80,
            containerID: 2,
            containerName: "multi-b",
            content: "Update marker",
          },
        ],
      };
      const secondUpdatePayload = {
        containerTotalNum: 2,
        textObject: [
          {
            xPosition: 0,
            yPosition: 0,
            width: 480,
            height: 80,
            containerID: 1,
            containerName: "multi-a",
            content: secondPass,
          },
          {
            xPosition: 0,
            yPosition: 90,
            width: 480,
            height: 80,
            containerID: 2,
            containerName: "multi-b",
            content: "Update marker",
          },
        ],
      };

      addDiagnostic("rerun.lifecycle.precheck", {
        currentTestId: test.id,
        previousTestWasStartupMultiContainer: previousTestId === "startup-multi-container",
        build: {
          tag: state.buildCheck.buildId || "unknown",
          freshness: state.buildCheck.isFresh,
        },
      });

      addDiagnostic("rerun.stability.strategy", "Using two non-empty containers to avoid payload validation failures from blank container updates.");

      const runOne = await probeCreateStartupWithRetry(firstUpdatePayload, 3, 600, { operationType: "upgrade" });

      addDiagnostic("rerun.stability.pause_before_second_pass", { delayMs: 250 });
      await sleep(250);

      const runTwo = await probeCreateStartupWithRetry(secondUpdatePayload, 3, 600, { operationType: "rebuild" });

      let startupCreated = runOne && runTwo;
      if (!startupCreated) {
        addDiagnostic("rerun.lifecycle.recovery_shutdown", {
          reason: "At least one update call failed; attempting recovery flow.",
          runOne,
          runTwo,
        });
        await sleep(400);
        addDiagnostic("rerun.lifecycle.recovery_recreate", {
          operationType: "create",
          payload: summarizePayload(secondUpdatePayload),
        });
        const recoveryResult = await probeCreateStartupWithRetry(secondUpdatePayload, 1, 600, { operationType: "create" });
        startupCreated = recoveryResult;
      }
      return {
        startupCreated,
        lookFor: [secondPass, "Update marker"],
        layoutHint: "Expected layout: this test may show two lines while replacing previous Block A/Block B content.",
        statusMessage: startupCreated
          ? "Sent two updates in sequence. Confirm both old Block A/Block B lines were replaced."
          : `At least one update returned an error code (pass1=${runOne}, pass2=${runTwo}). Continue with your observation.`,
      };
    }
    case "intentional-bad-payload": {
      try {
        const startupCreated = await probeCreateStartupWithPayload({
          containerTotalNum: 2,
          textObject: [{
            xPosition: 0,
            yPosition: 0,
            width: 480,
            height: 80,
            containerID: 1,
            containerName: "bad-case",
            content: expectedText,
          }],
        });

        if (startupCreated) {
          return {
            startupCreated: false,
            lookFor: ["App stays responsive even if this test behaves unexpectedly."],
            statusMessage: "Bad payload unexpectedly succeeded. App still stayed responsive.",
          };
        }

        return {
          startupCreated: false,
          lookFor: ["A warning is shown in app, and there is no crash/freeze."],
          statusMessage: "Bad payload returned an error code as expected. App handled it gracefully.",
        };
      } catch (error) {
        return {
          startupCreated: false,
          lookFor: ["A warning is shown in app, and there is no crash/freeze."],
          statusMessage: `Expected error handled gracefully: ${String(error)}`,
        };
      }
    }
    case "persistence-loop-sanity": {
      const sequencePosition = ((state.currentTestNumber - 1) % TESTS.length) + 1;
      const sequenceText = `${expectedText} (step ${sequencePosition}/${TESTS.length})`;
      const startupCreated = await probeCreateStartup(sequenceText);
      return {
        startupCreated,
        lookFor: [sequenceText],
        statusMessage: startupCreated
          ? `Sequence check sent for step ${sequencePosition}/${TESTS.length}.`
          : "Sequence check returned an error code. Continue with your observation.",
      };
    }
    default:
      throw new Error(`Unknown test id: ${test.id}`);
  }
}

async function runTestFlow() {
  if (!state.startupGate.idsMatch) {
    triggerAutoRefresh();
    return;
  }

  resetDiagnostics();
  await checkBuildFreshness();
  if (!state.buildCheck.isFresh) {
    ui.runStatus.textContent = `Blocked: cannot run tests until build metadata is loaded (${state.buildCheck.reason}).`;
    ui.runStatus.className = "status err";
    return;
  }

  const test = state.currentTest;
  addDiagnostic("test.start", { testId: test.id, testTitle: test.title });
  const preview = getPreviewForTest(test, state.expectedText);
  ui.lookForViewerPage2.textContent = renderExpectedLines(preview.lines);
  ui.expectedLayoutPage2.textContent = preview.layoutHint;
  ui.expectedLayoutPage2.hidden = !preview.layoutHint;
  ui.runStatus.textContent = "Running test…";
  ui.runStatus.className = "status";
  ui.btnRunTest.disabled = true;

  let startupCreated = false;
  let lookFor = preview.lines;
  let layoutHint = preview.layoutHint;
  try {
    const result = await runTestById(test, state.expectedText);

    if (test.id === "rerun-update-stability") {
      state.rerunStability.consecutivePasses = result.startupCreated
        ? state.rerunStability.consecutivePasses + 1
        : 0;

      addDiagnostic("rerun.stability.pass_streak", {
        consecutivePasses: state.rerunStability.consecutivePasses,
        requiredPasses: 2,
      });
    }

    startupCreated = result.startupCreated;
    lookFor = result.lookFor;
    layoutHint = result.layoutHint || "";
    ui.lookForViewerPage2.textContent = renderExpectedLines(lookFor);
    ui.expectedLayoutPage2.textContent = layoutHint;
    ui.expectedLayoutPage2.hidden = !layoutHint;
    const rerunSuffix = test.id === "rerun-update-stability"
      ? ` (Stability pass streak: ${state.rerunStability.consecutivePasses}/2)`
      : "";

    ui.runStatus.textContent = `${result.statusMessage}${rerunSuffix}`;
    state.lastRunStatusMessage = `${result.statusMessage}${rerunSuffix}`;
    addDiagnostic("test.status", `${result.statusMessage}${rerunSuffix}`);
  } catch (error) {
    const warning = `Automation warning: ${String(error)}`;
    ui.runStatus.textContent = warning;
    ui.runStatus.className = "status err";
    state.lastAutomationError = String(error);
    state.lastRunStatusMessage = warning;
    addDiagnostic("test.error", String(error));
  } finally {
    ui.btnRunTest.disabled = false;
  }

  state.activeRun = {
    testId: test.id,
    testTitle: test.title,
    goal: test.goal,
    lookFor,
    layoutHint,
    runAt: isoNow(),
    startupCreated,
    buildId: state.buildCheck.buildId || "unknown",
    buildCheck: { ...state.buildCheck },
    statusMessage: state.lastRunStatusMessage,
    automationError: state.lastAutomationError,
    diagnostics: [...state.diagnostics],
    githubRecentRuns: [],
    answer: "",
    notes: "",
    result: "",
    savedFile: "",
  };

  addDiagnostic("run.audit", {
    build_id: state.activeRun.buildCheck?.buildId || "unknown",
    git_sha: state.activeRun.buildCheck?.gitSha || "unknown",
    built_at: state.activeRun.buildCheck?.builtAt || "unknown",
    loaded_url: state.activeRun.buildCheck?.loadedUrl || window.location.href || "unknown",
    freshness_check_result: state.activeRun.buildCheck?.freshnessCheckResult || (state.activeRun.buildCheck?.isFresh ? "fresh" : "stale"),
  });
  state.activeRun.diagnostics = [...state.diagnostics];

  ui.submitStatus.textContent = "";
  ui.detailsWrap.hidden = true;
  ui.notesInput.value = "";
  setPage(2);
}

async function saveResult(answer) {
  if (!state.activeRun) return;
  const notes = (ui.notesInput.value || "").trim();
  const needsNotes = answer === "no" || answer === "not-sure";

  if (
    state.activeRun?.testId === "rerun-update-stability"
    && answer === "yes"
    && state.rerunStability.consecutivePasses < 2
  ) {
    ui.submitStatus.textContent = "Run this test until you get two consecutive PASS runs before saving PASS.";
    ui.submitStatus.className = "status err";
    addDiagnostic("rerun.stability.block_save", {
      reason: "pass_requires_two_consecutive_successful_runs",
      consecutivePasses: state.rerunStability.consecutivePasses,
      requiredPasses: 2,
    });
    return;
  }

  if (needsNotes && !notes) {
    ui.submitStatus.textContent = "Please add details before submitting to GitHub.";
    ui.submitStatus.className = "status err";
    return;
  }

  ui.submitStatus.textContent = "Saving Results to GitHub…";
  ui.submitStatus.className = "status";

  const normalizedResult = answer === "yes" ? "pass" : answer === "no" ? "fail" : "not-sure";
  state.activeRun.answer = answer;
  state.activeRun.notes = notes;
  state.activeRun.result = normalizedResult;

  const stamp = isoNow().replace(/[:.]/g, "-");
  const filename = `${stamp}__${sanitizeFileText(state.activeRun.testId)}__${sanitizeFileText(normalizedResult)}.md`;
  state.activeRun.savedFile = filename;

  try {
    const recentRuns = await fetchRecentGitHubRunFiles(5);
    state.activeRun.githubRecentRuns = recentRuns.ok
      ? recentRuns.files
      : [`lookup_failed: ${recentRuns.reason}`];
    addDiagnostic("github.recent_runs", state.activeRun.githubRecentRuns);
    state.activeRun.diagnostics = [...state.diagnostics];

    const content = buildRunMarkdown(state.activeRun);
    await commitRunToGitHub(filename, content);
    addDiagnostic("github.save", { success: true, filename });
    state.activeRun.diagnostics = [...state.diagnostics];
    ui.confirmationTitle.textContent = `Saved successfully to testing/runs/${filename}`;
    ui.submitStatus.textContent = "";
    setPage(3);
  } catch (e) {
    addDiagnostic("github.save", { success: false, error: String(e) });
    state.activeRun.diagnostics = [...state.diagnostics];
    ui.submitStatus.textContent = `Save failed: ${String(e)}`;
    ui.submitStatus.className = "status err";
  }
}

function buildDebugPrompt() {
  const run = state.activeRun;
  const summary = run
    ? `- Test: ${run.testTitle}
- Result selected by human: ${run.answer}
- Notes: ${run.notes || "(none)"}
- Startup call success: ${run.startupCreated}
- Run status message: ${run.statusMessage || "(none)"}${run.automationError ? `\n- Automation error: ${run.automationError}` : ""}`
    : "- No run data found.";

  const diagLines = run?.diagnostics?.length
    ? run.diagnostics.map((entry) => `- [${entry.at}] ${entry.step}: ${typeof entry.details === "string" ? entry.details : JSON.stringify(entry.details)}`)
    : ["- (none)"];

  const runtimeLines = buildFingerprintLines(run);

  const recentRunLines = run?.githubRecentRuns?.length
    ? run.githubRecentRuns.map((line) => `- ${line}`)
    : ["- (not available)"];

  return [
    "# Debug Request for Follow-up Test",
    "",
    "I just ran a glasses test in this repository and need help debugging.",
    "",
    "## Repo Context",
    "Please use the CURRENT repo as the source of truth.",
    "",
    "## What happened",
    summary,
    "",
    "## Recent GitHub test files",
    ...recentRunLines,
    "",
    "## Runtime fingerprint",
    ...runtimeLines,
    "",
    "## Detailed diagnostics",
    ...diagLines,
    "",
    "## What I need from you",
    "1. Explain the likely root cause in plain English.",
    "2. Either implement a fix if you're confident you can solve the problem, or suggest the next course of action.",
    "",
  ].join("\n");
}


function resetPage1(advanceCounter) {
  if (advanceCounter) bumpCounter();
  state.currentTest = getActiveTest();

  state.expectedText = state.currentTest.buildExpectedText();

  ui.testTitle.textContent = `Test #${state.currentTestNumber}: ${state.currentTest.title}`;
  ui.testGoal.textContent = state.currentTest.goal;
  ui.testApiName.textContent = state.currentTest.sdkTarget;
  ui.testApiMeaning.textContent = state.currentTest.plainMeaning;
  ui.testUnlocks.textContent = state.currentTest.unlocks;
  ui.testDiffFromPrev.textContent = state.currentTest.differsFromPrevious;
  const preview = getPreviewForTest(state.currentTest, state.expectedText);
  ui.lookForViewer.textContent = renderExpectedLines(preview.lines);
  ui.expectedLayoutPage1.textContent = preview.layoutHint;
  ui.expectedLayoutPage1.hidden = !preview.layoutHint;

  ui.lookForViewerPage2.textContent = renderExpectedLines(preview.lines);
  ui.expectedLayoutPage2.textContent = preview.layoutHint;
  ui.expectedLayoutPage2.hidden = !preview.layoutHint;

  ui.runStatus.textContent = "";
  ui.runStatus.className = "status";
  ui.submitStatus.textContent = "";
  ui.detailsWrap.hidden = true;
  ui.notesInput.value = "";
  ui.debugWrap.hidden = true;
  ui.debugPrompt.textContent = "";
  setPage(1);
  setBuildStatusUI();
}

ui.btnRunTest.addEventListener("click", runTestFlow);
ui.btnYes.addEventListener("click", () => saveResult("yes"));
ui.btnNo.addEventListener("click", () => {
  ui.detailsWrap.hidden = false;
  ui.submitStatus.textContent = "Please add details, then click Submit Results to GitHub.";
  ui.submitStatus.className = "status";
  ui.btnSubmit.onclick = () => saveResult("no");
});
ui.btnNotSure.addEventListener("click", () => {
  ui.detailsWrap.hidden = false;
  ui.submitStatus.textContent = "Please add details, then click Submit Results to GitHub.";
  ui.submitStatus.className = "status";
  ui.btnSubmit.onclick = () => saveResult("not-sure");
});

ui.btnNext.addEventListener("click", () => resetPage1(true));
ui.btnRetry.addEventListener("click", () => resetPage1(false));
ui.btnPrevTest.addEventListener("click", () => {
  if (state.currentTestNumber <= 1) {
    ui.runStatus.textContent = "You are already on Test #1.";
    ui.runStatus.className = "status";
    return;
  }

  setCounter(state.currentTestNumber - 1);
  resetPage1(false);
  ui.runStatus.textContent = `Moved back to Test #${state.currentTestNumber}.`;
  ui.runStatus.className = "status ok";
});
ui.btnDebug.addEventListener("click", () => {
  ui.debugWrap.hidden = false;
  ui.debugPrompt.textContent = buildDebugPrompt();
});
ui.btnCopyPrompt.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(ui.debugPrompt.textContent);
    ui.confirmationTitle.textContent = "Saved successfully. Debug prompt copied.";
  } catch {
    ui.confirmationTitle.textContent = "Saved successfully. Copy failed—please copy manually.";
  }
});

async function initializeApp() {
  resetPage1(false);
  const check = await checkBuildFreshness();
  if (!check.isFresh) return;
  syncRuntimeUrl(check.buildId);
}

initializeApp();
