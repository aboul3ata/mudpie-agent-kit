# Sources and baseline

Reviewed 2026-10-07. This is an original workflow informed by the sources below, not an official skill from any cited organization. Recheck runtime-specific facts before implementation. Documentation and packages can disagree because they describe different revisions or layers.

## Primary guidance

| Source | What informs this skill | Limit |
| --- | --- | --- |
| [Chrome WebMCP overview](https://developer.chrome.com/docs/ai/webmcp), updated Oct 7, 2026 | Progressive enhancement and current support | Proposed standard; not universal availability |
| [Chrome best practices](https://developer.chrome.com/docs/ai/webmcp/best-practices) | Simple tool strategy, names, validation, visible state | Static registration is a useful default; dynamic exposure is conditional |
| [Imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api), updated Sep 21, 2026 | Registration, cancellation, discovery, invocation | Verify the target browser's version-specific contract |
| [Declarative API](https://developer.chrome.com/docs/ai/webmcp/declarative-api), updated Sep 25, 2026 | Real forms and submit behavior | Check generated schemas and human submission in the actual client |
| [Tool security](https://developer.chrome.com/docs/ai/webmcp/secure-tools), updated Sep 1, 2026 | Risk hints, origin boundaries, output restraint | Hints are not authorization or consent enforcement |
| [Stripe: designing Checkout for agents](https://stripe.dev/blog/how-stripe-is-designing-checkout-for-ai-agents), Sep 22, 2026 | Expose valid actions and share human-facing logic | Checkout experience, not a universal recipe or our performance result |
| [Steve Kaliski's launch thread](https://x.com/stevekaliski/status/2102441513187709078) and [methodology note](https://x.com/stevekaliski/status/2102441514261508489), Sep 22, 2026 | Confirms the launch and state-dependent exposure rationale | Reported benchmark improvements cannot be assumed for another app |
| [Alex Nahas: building with WebMCP](https://mcp-b.ai/blog/webmcp-challenge/), Aug 25, 2026 | Small useful workflow and visible human handoff | Challenge context; its submission window is historical |
| [MCP-B runtime chooser](https://docs.mcp-b.ai/how-to/choose-runtime) and [existing-app integration](https://docs.mcp-b.ai/how-to/add-tools-to-an-existing-app) | Select only needed packages; reuse app operations and lifecycle | MCP-B extensions differ from native APIs |
| [Sierra: tau-bench](https://sierra.ai/blog/benchmarking-ai-agents), Jun 20, 2024 | Goal-state checks and repeated task reliability | General agent evaluation, not WebMCP-specific evidence |
| [Decagon: simulations](https://decagon.ai/blog/decagon-simulations), Sep 23, 2025 | Failure-grounded scenarios and traceable tests | General agent evaluation, not a WebMCP implementation |
| [Decagon: evaluation engine](https://decagon.ai/blog/evaluation-engine-ai-agents), Jul 6, 2025 | Offline validation followed by controlled live measurement | Their reported outcomes are not this skill's outcomes |
| [Mudpie checklist](https://mudpie.ai/webmcp/guides/webmcp-analytics-checklist/), Oct 7, 2026 | Separate availability, execution, collection, and outcome | Proposed event semantics, not a custom telemetry API contract |

## Existing skills inspected

We searched the Skills directory and read the source, rather than treating install counts as quality evidence.

| Skill | Useful baseline | Difference in scope |
| --- | --- | --- |
| [Browserbase add-webmcp](https://github.com/browserbase/skills/tree/main/skills/add-webmcp) | Source inventory, shared application boundaries, Stagehand validation, adversarial checks | A strong integration baseline; its harness is a specific choice, not a requirement here |
| [Browserbase webmcp-gen](https://github.com/browserbase/skills/tree/main/skills/webmcp-gen) | URL exploration and generated tool manifests | Injection/prototyping differs from maintained first-party integration |
| [webmaxru webmcp](https://github.com/webmaxru/web-ai-agent-skills/tree/main/skills/webmcp) | Detailed native compatibility and lifecycle references | Useful API depth; runtime claims still need version checks |
| [Pillar webmcp](https://github.com/pillarhq/pillar-skills/tree/main/webmcp) | Focused tool-design rules | Its navigator/provideContext/requestUserInteraction examples require migration or adapter verification before native use |
| [Builder.io webmcp](https://github.com/builderio/skills/tree/main/skills/webmcp) | Operating a site's exposed tools through an agent host | A consumer workflow, not a publisher implementation skill |

Our intended contribution is to connect implementation choices to a fair baseline, independent final-state checks, unfamiliar task variants, and post-release measurement. That is a design goal; evidence from this repository's bounded evaluations must not be presented as universal superiority over these skills.

When sources conflict, record the conflict and resolve it against the target runtime. For example, lifecycle advice about replacing a tool by name does not remove the need to retire account- or route-specific tools. Likewise, a historic `navigator.modelContext` example does not establish the current native API. Do not average incompatible examples into a new invented contract.
