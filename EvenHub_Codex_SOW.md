# Statement of Work (SOW) — Even Hub Project Handoff for Codex

**Owner:** Josh Lucas  
**Primary implementer:** Codex (repo-aware coding agent)  
**Document purpose:** Give Codex enough context to (1) understand what Even Hub is, (2) understand where the project sits today, and (3) confidently continue implementation in this repo with minimal back-and-forth.

---

## 0) Executive summary

This repo contains Josh’s in-progress project for **Even Hub**, the developer platform from **Even Realities** for building applications that run on (or integrate with) the **Even G2** smart-glasses ecosystem.

Josh is switching from “chat-only guidance” to **Codex**, because Codex can **directly read the repository**, inspect the current code, and propose concrete fixes/next steps that match the actual project state.

This SOW is intentionally verbose. Codex should treat it as:

1) **Context + constraints** (what Even Hub is, how access works, where the official community lives)  
2) **A discovery plan** (how to inventory this repo quickly and establish the baseline)  
3) **An implementation plan** (phases, deliverables, acceptance criteria)

---

## 1) Background: what Even Hub is (and how access works)

Even Realities is operating Even Hub as a **pilot program** for developers building on the Even G2 platform. The official support-center article (“Even Hub Pilot Program”) describes Even Hub as an SDK-based development experience for building “real-world applications” for Even G2, and it directs developers to an official Discord channel for collaboration and support.

**Key publicly described points (from official Even Realities sources):**
- Even Hub is positioned as a developer program to build apps for the Even G2 platform.
- Participation currently involves an **application / review** workflow (pilot program).
- The official developer community is on **Discord**.
- The Even Hub site describes a **developer portal** and highlights a streamlined SDK intended for “seamless glasses interaction.”

> Official references (URLs are included in code blocks for easy copy/paste):
```text
Even Hub Pilot Program (Even Realities support center):
https://support.evenrealities.com/hc/en-us/articles/34380533765145-Even-Hub-Pilot-Program

Even Hub developer portal:
https://evenhub.evenrealities.com/
```

---

## 2) High-level summary of the official Discord server

The Even Hub materials repeatedly point developers to an **official Discord** as the living center of gravity for:
- announcements (SDK changes, beta releases, platform capabilities),
- Q&A and implementation support,
- sharing prototypes and feedback,
- posting bugs and limitations.

Codex should assume that **the most current/accurate details** (package names, versions, API capabilities, device requirements, simulator availability, etc.) may be communicated primarily in Discord.

> Official “join Discord” entry points:
```text
Even Hub Pilot Program article includes a Discord link:
https://support.evenrealities.com/hc/en-us/articles/34380533765145-Even-Hub-Pilot-Program

Even Hub site also includes “Join Discord”:
https://evenhub.evenrealities.com/
```

### What Codex should do with Discord context
Codex does not need to “crawl” Discord. Instead, Codex should:
- Treat the Discord as the **canonical place** for “What’s the current SDK version / known issues / official examples?”
- Ensure this repo’s README points to the Discord as the “current upstream truth.”
- Where unknowns exist (e.g., exact SDK/NPM package name), identify them and leave TODO markers referencing “Discord pinned messages / announcements.”

---

## 3) The Even Hub “development platforms”: current state summary

Even Hub appears to be in an **early access / pilot** posture rather than a fully public, stable platform.

From what is publicly visible, the platform “surface area” consists of:

1) **Even Hub Developer Portal (web)**  
   - Marketing + entry point to apply and join Discord  
   - Describes a streamlined SDK for glasses interaction  
   - Likely contains or links to documentation, sample projects, and onboarding steps (some may require access)

2) **Pilot program gating (application)**  
   - The support-center article describes an application process and review timeline  
   - Implies platform access may require approval and/or device availability

3) **SDK distribution (likely via npm)**  
   - Even Hub is described as “SDK” based; in practice, this almost certainly means a JavaScript/TypeScript package.
   - However, **the exact npm package name is not publicly discoverable from the pages above**.
   - Therefore: the authoritative package identifier should be derived from **this repo** (package.json / lockfile) or from Discord.

### Required action: identify the official npm package
Codex must locate the Even Realities-provided SDK dependency by checking:
- `package.json`
- `pnpm-lock.yaml` / `package-lock.json` / `yarn.lock`
- any `README.md` or `docs/` that reference installation instructions
- imports in code (e.g., `import ... from "<sdk-package-name>"`)

**Deliverable:** add a “Dependencies” section to README that includes:
- exact package name
- version
- install command
- minimal usage snippet (from the repo)

---

## 4) Project goals (what Josh is trying to achieve)

Because Codex can read the repo, Codex should treat “goals” as a two-layer thing:

### Layer A — “Always true” meta-goals (safe, repo-independent)
1) Establish a **repeatable local dev workflow** for Even Hub apps in this repo:
   - install → run → develop → deploy/test on target device (or simulator)  
2) Produce a functioning **MVP app** that demonstrates:
   - the SDK integration is correct  
   - a reliable round-trip from “code change” → “observable behavior”  
3) Produce clean repo-level documentation so future development is easier:
   - README quickstart
   - environment variables documented
   - troubleshooting notes and known limitations

### Layer B — Product-specific goals (must be read from this repo)
Josh has a specific product idea for this Even Hub project, but Codex should **derive the exact feature targets** from:
- existing code and UI
- TODO comments
- open issues
- commit history
- docs/notes inside the repo

**Deliverable:** within the first pass, Codex must produce a short written summary:
- “What this app does now”
- “What it is clearly intended to do next”
- “What is missing / broken”

> If the repo does *not* currently contain explicit product intent, Codex should create `docs/PRODUCT.md` with:
- product vision (1–2 paragraphs)
- primary user story
- MVP scope
- non-goals

---

## 5) What we’ve done so far (handoff reality)

Josh has been iterating in a chat-driven way and is now transitioning to Codex because:

- High-level advice without repo context creates confusion and mismatched assumptions.
- Codex can inspect the actual state: tech stack, dependencies, build pipeline, and existing features.

**Known completed work (outside the repo):**
- We identified the official Even Hub pilot program + Even Hub portal as primary sources of truth.
- We identified that the developer community and updates live on Discord.
- We concluded that the npm package name likely needs to be pulled from the repo/Discord, not from public marketing pages.

**Unknowns (must be resolved by repo inspection):**
- Current tech stack and scaffolding status
- Whether the SDK is already integrated
- Whether a “hello world” app already runs
- How deployment/testing is done (device vs simulator)
- What specific features Josh’s app is meant to implement

This is intentional: Codex’s first job is to eliminate these unknowns quickly and concretely.

---

## 6) Scope of work (what Codex should do)

### Phase 0 — Repo inventory & baseline (mandatory)
**Goal:** In ≤1 working session, establish “what is this repo, and how do I run it?”

Tasks:
1) Identify the stack:
   - Node version requirements (`.nvmrc`, `package.json engines`, docs)
   - package manager (npm/pnpm/yarn)
   - framework (React/Vite/Next/etc.)
   - TypeScript usage and tsconfig
2) Identify entry points:
   - main app directory
   - any “example” or “sandbox” app
3) Confirm commands:
   - `install` command
   - `dev` command
   - `build` command
   - `lint` / `test` commands
4) Verify the app runs locally:
   - no missing env vars
   - no hardcoded secrets
5) Produce a **baseline report** in `docs/BASELINE.md` including:
   - how to run
   - what works
   - what fails (with error messages)
   - top 5 immediate fixes

Acceptance criteria:
- A fresh clone can reach a running dev server (or equivalent) using only documented steps.

---

### Phase 1 — SDK confirmation & minimal working example (MVP “Hello Even”)
**Goal:** prove the Even Hub SDK works end-to-end in *this* repo.

Tasks:
1) Locate the SDK npm package name + version (see Section 3).
2) Create/confirm a minimal usage path (a “hello world” feature):
   - one action → one visible effect
   - as close to the simplest official sample as possible
3) Document setup and add `docs/SDK_NOTES.md`:
   - key imports and API surfaces discovered
   - any device/simulator prerequisites
   - known constraints

Acceptance criteria:
- The app demonstrates an SDK interaction reliably (repeatable).

---

### Phase 2 — Implement the app’s intended features (repo-defined)
**Goal:** deliver the actual “useful product” Josh is building.

Codex must first extract the intended scope from the repo. Then implement in small, verifiable increments.

Required method:
1) Produce `docs/FEATURE_PLAN.md` containing:
   - feature list
   - MVP vs “nice-to-have”
   - dependencies (SDK APIs needed)
   - risks/unknowns
2) Implement features one by one with:
   - minimal UI/UX polish at first
   - strong internal logging and error handling
   - feature flags if needed

Acceptance criteria:
- The MVP features run end-to-end with predictable behavior.

---

### Phase 3 — Device testing, UX hardening, and stability
**Goal:** make it usable, not just “it runs.”

Tasks (depending on platform constraints):
- add robust error states (offline, permissions, API failures)
- improve performance (avoid expensive re-renders, large bundles)
- ensure graceful fallback when SDK features are unavailable
- write troubleshooting notes and “known limitations”

Acceptance criteria:
- No crash loops
- Clear error messaging
- “Happy path” works consistently

---

### Phase 4 — Documentation, packaging, and handoff quality
**Goal:** make the repo a clean, maintainable project.

Deliverables:
- README Quickstart:
  - prerequisites
  - install/run/build
  - how to connect/test on device (or simulator)
  - where secrets/env vars live
- `docs/` folder with:
  - BASELINE.md
  - PRODUCT.md (if missing)
  - FEATURE_PLAN.md
  - SDK_NOTES.md
  - TROUBLESHOOTING.md
- Optional: `scripts/` helpers for repetitive steps.

Acceptance criteria:
- Another developer (or future Josh) can onboard without tribal knowledge.

---

## 7) Deliverables checklist (Codex outputs)

Minimum:
- ✅ Repo runs locally from a fresh clone with documented steps
- ✅ Even Hub SDK package identified and documented
- ✅ Minimal working example using the SDK
- ✅ Feature plan written from repo-derived intent
- ✅ MVP features implemented and tested
- ✅ README + docs complete

Nice-to-have:
- Unit/integration tests (where meaningful)
- CI workflow (lint/build/test)
- Release notes / changelog

---

## 8) Definition of done (DoD)

This project is “done” when:
1) The core intended features (MVP) work end-to-end.
2) Setup is documented and repeatable.
3) The codebase is readable and maintainable.
4) Any remaining platform limitations are clearly documented with workarounds.

---

## 9) Operating instructions for Codex (how to work in this repo)

- Prefer small, atomic commits (if applicable).
- Avoid inventing APIs: only use SDK surfaces you can confirm from installed types/docs.
- Write down unknowns immediately in `docs/TODO_UNKNOWNs.md` and burn them down early.
- When a requirement is unclear, infer from repo evidence (existing components, naming, TODOs) rather than guessing.
- Keep user-facing output minimal and stable; log richly internally.

---

## 10) Risks / unknowns (to actively manage)

- SDK changes or breaking changes during pilot program
- Lack of public docs; Discord may be primary source
- Device availability and testing friction
- Permissions/OS constraints on the glasses/companion app
- Packaging differences (web vs native vs hybrid)

Mitigation:
- Lock SDK versions in lockfile
- Document exact versions and environment requirements
- Create a small “smoke test” path that always works

---

## 11) Quick reference links

```text
Even Hub Pilot Program:
https://support.evenrealities.com/hc/en-us/articles/34380533765145-Even-Hub-Pilot-Program

Even Hub developer portal:
https://evenhub.evenrealities.com/
```

---

## 12) Next action: what Codex should do first

1) Run Phase 0 and generate `docs/BASELINE.md`.  
2) Locate the SDK npm package and document it in README.  
3) Confirm a minimal SDK interaction works (Phase 1).

Once those three are done, everything else becomes dramatically less mysterious.
