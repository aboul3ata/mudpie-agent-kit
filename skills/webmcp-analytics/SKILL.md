---
name: webmcp-analytics
description: Implement or audit measurement for a website's WebMCP tools, tracing discovery, invocation, retries, failures, and verified outcomes. Use when checking whether browser tools work or whether recorded activity represents real adoption.
---

# Measure WebMCP use

Turn one real user task into a trace you can verify. A registered tool, a successful response, and a completed user task are different evidence.

Based on Mudpie's [WebMCP analytics implementation checklist](https://mudpie.ai/webmcp/guides/webmcp-analytics-checklist/). Read the [measurement guide](https://mudpie.ai/agent-readiness/measure-agent-traffic/) when choosing adoption metrics. This skill works with the site's existing analytics; installing Mudpie is optional.

## Establish the task and access

Identify the target site, tool, client/version, account scope, and expected outcome. Inspect existing code and instrumentation before proposing new events. If the task needs better public information or an account repair, say so; adding a tool is not automatically the fix.

For implementation, check the current [Chrome WebMCP documentation](https://developer.chrome.com/docs/ai/webmcp) for supported registration and execution APIs. Do not copy remembered preview syntax or claim support in clients you did not test. Browser WebMCP and server MCP are different access paths; see [Chrome's comparison](https://developer.chrome.com/docs/ai/webmcp/compare-mcp).

For Mudpie activity, use its signed-in dashboard through the browser or tools actually exposed by that page. Do not query its database or reverse-engineer private endpoints. Mudpie's public product MCP answers questions about Mudpie; it does not expose a customer's analytics. If the dashboard lacks a needed field, report the gap rather than inventing it.

Stay within the requested scope: an audit is read-only; implementation changes the authorized code; deployment and state-changing tests follow the user's existing authorization. The skill does not authorize purchases, new access grants, or external messages.

## Preserve four separate records

These are proposed semantics, not fixed event names or a Mudpie API contract. Map them to the system's actual schema.

| Record | Minimum useful context | What it establishes |
| --- | --- | --- |
| Tool available | Sanitized route, tool name, schema version, time | Registration; verify client discovery separately |
| Invocation started | Logical operation ID, attempt ID, tool, access path, time | The handler received an invocation |
| Invocation finished | Same IDs, result class, duration | The attempt returned or failed |
| Outcome verified | Operation ID, outcome type, verification time, minimal receipt reference | An independent check found the expected result |

The caller creates an operation ID for one user-authorized action. Each invocation gets a new attempt ID; a retry retains the operation ID. Propagate those IDs through the handler and collector, and into destination receipts when supported. An operation ID supports correlation; it does not itself make writes idempotent.

Use result classes suited to the product, such as success, invalid input, unauthorized, cancelled, timeout, or server error. Record an unknown outcome separately from a confirmed failure. A timeout or cancellation can occur after a write commits.

Keep the same authentication, tenant scope, and business rules as the UI. Collect sanitized routes and minimal task context; exclude credentials, cookies, authorization headers, private query parameters, and full prompts by default. Send telemetry through a bounded, non-blocking path. A collector outage must not prevent the product operation or trigger unbounded retries.

## Verify one operation end to end

Choose a useful read-only task when possible. Use synthetic data and a unique test-run identifier for controlled checks. Only exercise accounts and scopes that the owner authorized; use fixtures to test denials instead of probing unrelated tenants.

1. Discover the tool in the target client. If availability depends on navigation or workspace state, check that transition too.
2. Invoke valid input. Inspect the returned result and verify it against the task: for a search, check the filters; for a draft, reopen the saved draft in the intended account.
3. Exercise invalid input and a denied scope in the authorized test environment. Verify a useful failure and no unauthorized change.
4. Check interruption and retry behavior where safe. Before retrying an uncertain write, inspect its destination or status. If the outcome remains uncertain, retry only under the product's idempotency contract; otherwise report the uncertainty and stop that mutation. A new authorized attempt is reasonable when an authoritative check establishes that the original attempt did not commit and can no longer commit; an empty search alone is not that proof.
5. Check telemetry independently. Correlate start, finish, and outcome by the recorded IDs in the supported analytics surface. A collector's HTTP acknowledgment alone does not prove durable storage. If the records cannot be joined, report that limit.
6. Retain a private, redacted receipt of the checks. Remove only disposable records created by this run using the supported cleanup path, then verify none remain. Do not delete existing user data or historical traffic. If cleanup is unavailable, state exactly which test records remain and how to exclude them.

Do not run product tools merely to increase activity counts. Label every controlled call as QA wherever the system supports it, and retain the test window and identifiers for exclusion.

## Interpret the result

Report attempts and distinct operations separately. Two attempts with one shared operation ID and one verified result are one completed operation. Across WebMCP and server MCP, deduplicate only with a reliable shared operation ID. Matching inputs or close timestamps do not prove identity; without a join key, keep separate totals and state unknown overlap.

Separate controlled QA, crawlers, inferred agent traffic, and voluntary task-driven use to the extent the evidence permits. Unknown attribution stays unknown. Registration is not execution, execution is not adoption, and a page read or tool call is not a customer conversion.

For rates, name the time window, timezone, numerator, denominator, and exclusions. Do not divide outcomes from one population by attempts from another or call a low-volume interval proof of lift. If a baseline, attribution, or outcome join is missing, the result is inconclusive at that layer.

Finish with the conclusion, evidence, and smallest next step:

- Task, site, client/version, account conditions, and test window.
- Discovery, execution, collection, and outcome: passed, failed, or unverified, each with a receipt.
- Attempts versus operations, failure classes, and QA exclusions; adoption only if independently supported.
- Changed files and deployed release when applicable, cleanup result, and remaining measurement gaps.

Link to the [original checklist](https://mudpie.ai/webmcp/guides/webmcp-analytics-checklist/) for the worked example and implementation context. Keep customer evidence private; this public repository is not a place to upload production traces.
