# Tool design and state

## Reuse the product's decisions

[Stripe's checkout account](https://stripe.dev/blog/how-stripe-is-designing-checkout-for-ai-agents) describes state-dependent tool exposure and a shared foundation for human and agent behavior. Apply the principle where the app already has meaningful state transitions: a selected method changes the valid fields; a valid form enables the next action. Do not force every app into a multistep workflow.

[Chrome recommends](https://developer.chrome.com/docs/ai/webmcp/best-practices) simple static registration when sufficient. Select dynamic registration only when it removes genuinely invalid actions or irrelevant parameters. Keep stable lookup tools available; retire a route-specific or account-specific tool when its context ends.

These are design choices, not security controls. Every executor must enforce its current preconditions even if a stale client still holds its descriptor.

## A contract worth implementing

For each tool, settle:

- **Effect:** what happens now, rather than what a later step might accomplish.
- **Inputs:** user-meaningful values, required versus optional fields, bounded collections, and defaults inherited from the product. Avoid making the model calculate derived values the application already knows.
- **Scope:** identity and tenant come from the authoritative session, not an arbitrary input. Resource IDs still need ownership checks.
- **Result:** observed state, stable identifiers, and a concise status. For asynchronous work, return the actual pending status and a supported way to inspect it.
- **Failure:** distinguish invalid input, unavailable state, denial, rate limit, cancellation, timeout, and backend failure where the runtime permits. Give a useful correction without leaking private data.

Use the existing parser. Keep the published schema and runtime acceptance aligned: if unknown properties are disallowed, reject them in code too. Test omissions, extra fields, type mismatches, out-of-range values, and partial writes. A successful promise carrying a fabricated success-shaped object is not acceptable error handling.

## Races at the consequence boundary

Discovery and execution can see different state. A human may edit a draft, change accounts, remove an item, or navigate while a call is pending. Capture the relevant operation context, then validate that it is still authorized and current before applying the effect. Use the application's existing revision or concurrency mechanism where needed; do not invent blanket locking for read-only operations.

For a prepared action followed by confirmation, bind confirmation to the exact action, identity, resource, and relevant revision. If those change, the previous confirmation is stale. Preserve the real UI/service confirmation mechanism; `confirmed: true` from a caller is not evidence of a human decision.

An aborted request may already have committed. Inspect the authoritative result before retrying. Use the backend's idempotency mechanism for replay safety, and preserve one operation identifier across attempts when supported. Without idempotency, an uncertain mutation stays uncertain until a status check establishes that it did not and cannot commit. An empty list alone may reflect delayed visibility.

## Trust and output

[Chrome's security guidance](https://developer.chrome.com/docs/ai/webmcp/secure-tools) provides read-only, consequential, and untrusted-content hints. Use the hints supported by the target; they describe behavior and do not enforce it. A read-only tool can still disclose sensitive data.

Check the actual registered descriptor, not just the handler code:

| Behavior | Supported annotation to set | Independent check |
| --- | --- | --- |
| Reads without changing application state | `readOnlyHint: true` | No domain write occurred |
| Changes a draft, cart, preference, or other state | `readOnlyHint: false` | Observed effect matches the description |
| Significant real-world or irreversible effect | `consequentialHint: true` | Existing confirmation still gates the effect |
| Returns user-authored or external text, including saved text | `untrustedContentHint: true` | Payload stays data, with no privilege or instruction authority |

If a target lacks a hint, document that compatibility gap and retain the underlying controls. Do not silently omit a supported hint because registration succeeds without it.

Return only the fields the task needs. Keep untrusted content distinguishable from trusted status/metadata and do not turn returned text into instructions or executable markup. Exclude credentials and private request context. Use output budgets appropriate to the client, with pagination or focused lookup for larger data; current documentation's character recommendations are guidance, not timeless protocol limits.
