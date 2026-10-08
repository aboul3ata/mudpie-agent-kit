# Bounded skill evaluation — 2026-10-07

The skill produced a working two-tool integration in a synthetic draft workspace. This is one local fixture plus six decision scenarios, not a comparative performance benchmark or production-readiness claim.

## Method

An independent agent received the skill and a small existing app with account switching, route state, domain validation, asynchronous saves, and no publishing operation. Its task was to add draft inspection and saving without changing those domain rules. It had no network, package installation, production data, or browser access.

A separate reviewer read the skill and applied it to six unfamiliar scenarios: a static search form, a stale checkout confirmation, pending registration during remount, hostile user text, an older polyfill, and a misleading attempt/adoption report. The reviewer found no actionable decision defect in that set. This was a document assessment, not runtime proof.

The coordinating agent inspected the generated implementation and tested it through the Codex in-app browser's exposed WebMCP bridge. No tool implementation was injected by the test harness.

## Failure that changed the skill

The first implementation omitted read-only and untrusted-content annotations. We added an explicit behavior-to-annotation table to the general tool-design guidance. The implementation agent then fixed both descriptors and added descriptor-versus-effect coverage. That repair is development feedback, not a fresh blind acceptance score.

## Observed results

- Six Node adapter/domain tests passed on Node v22.18.0: validation, pagination, account isolation, stale descriptors, account switch-away-and-back, pending writes during navigation, cancellation, registration delay/failure, remount, and hints versus effects. Tests use a fake registry and do not establish native browser compatibility.
- Codex desktop 26.930.51102 exposed both tools from the served fixture. The final descriptors included readOnlyHint and untrustedContentHint values matching their behavior.
- A normal form submission created a local draft that the inspection tool returned. A tool save normalized surrounding title whitespace through the existing domain function, and the visible UI showed the same result.
- Switching from account alpha to beta produced an empty beta draft list. Navigating to Home removed both tools from the exposed registry.
- All data was synthetic and process/tab-local. No external messages, customer records, purchases, or production analytics were created.

No token savings, latency improvement, agent-choice success rate, Chrome-version compatibility matrix, production persistence, or organic adoption is established by these checks. The browser engine version was not recorded separately from the Codex host version. Other public skills were inspected as a design baseline, not executed in a head-to-head benchmark.

## Reproduce the local checks

```sh
node --test evals/webmcp-engineering/fixture/webmcp.test.mjs
python3 -m http.server 8830 --bind 127.0.0.1 --directory evals/webmcp-engineering/fixture
```

Open localhost in a WebMCP-capable client. Inspect the actual registered descriptors, save a synthetic draft through the normal form and the tool, compare results, switch accounts, and navigate to Home. The fixture intentionally uses memory: reload clears all drafts. It has no authentication server and must not be used as a production permission implementation.
