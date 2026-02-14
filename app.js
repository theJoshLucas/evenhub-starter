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
  btnPrevTest: $("btnPrevTest"),
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
    sdkTarget: "Repeated calls to bridge.createStartUpPageContainer()",
    plainMeaning: "We call the same startup API twice quickly to make sure updates stay stable.",
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

async function probeCreateStartupWithPayload(payloadConfig) {
  const bridge = await ensureBridge();
  const { CreateStartUpPageContainer } = state.SDK;
  const payload = new CreateStartUpPageContainer(payloadConfig);
  const result = await bridge.createStartUpPageContainer(payload);
  return result === 0 || result === "0";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function probeCreateStartupWithRetry(payloadConfig, retries = 1, delayMs = 250) {
  let lastResult = false;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    lastResult = await probeCreateStartupWithPayload(payloadConfig);
    if (lastResult) return true;
    if (attempt < retries) await sleep(delayMs);
  }
  return lastResult;
}


function renderExpectedLines(lines) {
  return Array.isArray(lines) ? lines.join("\n") : String(lines || "");
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
          "Expected layout: Block A then Block B, with no intentionally blank spacer lines between them.",
        ],
        statusMessage: startupCreated
          ? "Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font)."
          : "Multi-container test returned an error code. Continue with your observation.",
      };
    }
    case "rerun-update-stability": {
      const firstPass = `${expectedText} (1/2)`;
      const secondPass = `${expectedText} (2/2)`;

      const runOne = await probeCreateStartupWithRetry({
        containerTotalNum: 2,
        textObject: [
          {
            xPosition: 0,
            yPosition: 0,
            width: 480,
            height: 80,
            containerID: 1,
            containerName: "stability-a",
            content: firstPass,
          },
          {
            xPosition: 0,
            yPosition: 90,
            width: 480,
            height: 80,
            containerID: 2,
            containerName: "stability-b",
            content: "",
          },
        ],
      }, 1, 300);

      const runTwo = await probeCreateStartupWithRetry({
        containerTotalNum: 2,
        textObject: [
          {
            xPosition: 0,
            yPosition: 0,
            width: 480,
            height: 80,
            containerID: 1,
            containerName: "stability-a",
            content: secondPass,
          },
          {
            xPosition: 0,
            yPosition: 90,
            width: 480,
            height: 80,
            containerID: 2,
            containerName: "stability-b",
            content: "",
          },
        ],
      }, 1, 300);

      const startupCreated = runOne && runTwo;
      return {
        startupCreated,
        lookFor: [
          secondPass,
          "Expected layout: only one visible line from this test. Previous Block A/Block B text should be replaced.",
        ],
        statusMessage: startupCreated
          ? "Sent two updates in sequence. Confirm the latest text replaced older multi-container text."
          : "At least one update returned an error code. Continue with your observation.",
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
  const test = state.currentTest;
  ui.lookForViewerPage2.textContent = renderExpectedLines([state.expectedText]);
  ui.runStatus.textContent = "Running test…";
  ui.runStatus.className = "status";
  ui.btnRunTest.disabled = true;

  let startupCreated = false;
  let lookFor = [state.expectedText];
  try {
    const result = await runTestById(test, state.expectedText);
    startupCreated = result.startupCreated;
    lookFor = result.lookFor;
    ui.lookForViewerPage2.textContent = renderExpectedLines(lookFor);
    ui.runStatus.textContent = result.statusMessage;
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
    lookFor,
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
  ui.lookForViewer.textContent = renderExpectedLines([state.expectedText]);
  ui.lookForViewerPage2.textContent = renderExpectedLines([state.expectedText]);

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

resetPage1(false);
