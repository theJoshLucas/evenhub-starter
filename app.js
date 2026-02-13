const $ = (id) => document.getElementById(id);

const ui = {
  page1: $("page1"),
  page2: $("page2"),
  page3: $("page3"),
  testTitle: $("testTitle"),
  testGoal: $("testGoal"),
  lookForViewer: $("lookForViewer"),
  btnRunTest: $("btnRunTest"),
  runStatus: $("runStatus"),
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

const TESTS = [
  {
    id: "hello-world-startup",
    title: "Hello World startup page appears on glasses",
    goal: "Verify startup page creation can be triggered from this page.",
    buildExpectedText: () => `Hello world @ ${isoNow()}`,
  },
];

const state = {
  SDK: null,
  bridge: null,
  currentTestNumber: getCurrentCounter(),
  currentTest: null,
  activeRun: null,
  expectedText: "",
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

function buildRunMarkdown(run) {
  return [
    `# Test Run: ${run.testTitle}`,
    "",
    `- test_id: ${run.testId}`,
    `- run_at: ${run.runAt}`,
    `- result: ${run.result}`,
    `- answer: ${run.answer}`,
    `- startup_created: ${run.startupCreated}`,
    "",
    "## Goal",
    run.goal,
    "",
    "## Expected on glasses",
    ...run.lookFor.map((line) => `- ${line}`),
    "",
    "## Notes",
    run.notes || "(none)",
    "",
  ].join("\n");
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
  const bridge = await ensureBridge();
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
      content: expectedText,
    }],
  });
  const result = await bridge.createStartUpPageContainer(payload);
  return result === 0 || result === "0";
}

async function runTestFlow() {
  const test = state.currentTest;
  ui.runStatus.textContent = "Running test…";
  ui.runStatus.className = "status";
  ui.btnRunTest.disabled = true;

  let startupCreated = false;
  try {
    startupCreated = await probeCreateStartup(state.expectedText);
    ui.runStatus.textContent = startupCreated
      ? "Automation finished. Now confirm what you saw on the glasses."
      : "Automation ran, but startup creation returned an error. Please continue with your observation.";
  } catch (error) {
    ui.runStatus.textContent = `Automation warning: ${String(error)}`;
    ui.runStatus.className = "status err";
  } finally {
    ui.btnRunTest.disabled = false;
  }

  state.activeRun = {
    testId: test.id,
    testTitle: test.title,
    goal: test.goal,
    lookFor: [state.expectedText],
    runAt: isoNow(),
    startupCreated,
    answer: "",
    notes: "",
    result: "",
    savedFile: "",
  };

  ui.submitStatus.textContent = "";
  ui.detailsWrap.hidden = true;
  ui.notesInput.value = "";
  setPage(2);
}

async function saveResult(answer) {
  if (!state.activeRun) return;
  const notes = (ui.notesInput.value || "").trim();
  const needsNotes = answer === "no" || answer === "not-sure";

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
    const content = buildRunMarkdown(state.activeRun);
    await commitRunToGitHub(filename, content);
    ui.confirmationTitle.textContent = `Saved successfully to testing/runs/${filename}`;
    ui.submitStatus.textContent = "";
    setPage(3);
  } catch (e) {
    ui.submitStatus.textContent = `Save failed: ${String(e)}`;
    ui.submitStatus.className = "status err";
  }
}

function buildDebugPrompt() {
  const run = state.activeRun;
  const summary = run
    ? `- Test: ${run.testTitle}\n- Result selected by human: ${run.answer}\n- Notes: ${run.notes || "(none)"}\n- Startup call success: ${run.startupCreated}`
    : "- No run data found.";

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
    "## What I need from you",
    "1. Explain the likely root cause in plain English.",
    "2. Suggest the smallest safe code change to improve reliability.",
    "3. Generate one follow-up manual test with exact expected glasses output.",
    "4. Tell me exactly which files to inspect next.",
    "",
  ].join("\n");
}

function resetPage1(advanceCounter) {
  if (advanceCounter) bumpCounter();
  state.currentTest = getActiveTest();

  state.expectedText = state.currentTest.buildExpectedText();

  ui.testTitle.textContent = `Test #${state.currentTestNumber}: ${state.currentTest.title}`;
  ui.testGoal.textContent = state.currentTest.goal;
  ui.lookForViewer.textContent = `\n\n${state.expectedText}\n\n`;

  ui.runStatus.textContent = "";
  ui.runStatus.className = "status";
  ui.submitStatus.textContent = "";
  ui.detailsWrap.hidden = true;
  ui.notesInput.value = "";
  ui.debugWrap.hidden = true;
  ui.debugPrompt.textContent = "";
  setPage(1);
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

resetPage1(false);
