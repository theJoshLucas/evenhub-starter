# Product Definition (repo-derived)

## Primary goal and tracks
**Primary goal:** learn the Even SDK enough to build a **Conversate replacement plugin**.

The probe harness in this repo is a **temporary learning tool**, not the end product.

Two development tracks:
1. **SDK validation track (current harness):** validate runtime bridge and SDK methods on real hardware.
2. **Conversate+ build track:** deliver mic input → transcript → card output.

## Vision
Even Hub Starter Kit is a zero-build probe harness for validating Even Hub SDK behavior on real hardware before building a full product plugin.

## Primary user story
As an Even Hub developer, I need a single QR-loadable page where I can boot the bridge, run probe actions, and capture what APIs actually work in my runtime so I can de-risk later feature development.

## MVP scope
- Bridge boot and status visualization.
- Manual probes for core SDK methods.
- Structured log output.
- In-memory capabilities matrix.

## Non-goals (current repo)
- Polished end-user product UX.
- Backend services or persistent storage.
- Automated CI test coverage of device-only APIs.
