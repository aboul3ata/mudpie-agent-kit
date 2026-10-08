# Evaluate task completion

Separate four questions: does the implementation obey its contract, does the browser expose it, can an agent choose and use it, and does production use improve an outcome?

## First prove the contract

Use the app's normal tests to check validation, authorization, current-state access, concurrency, and final state. Exercise the relevant route/account lifecycle and distinguish registration cancellation from execution cancellation. Test telemetry failure without breaking the product operation.

Then load the built app in the target client. Discover tools without injecting an alternative implementation. Invoke a safe case and independently inspect its effect. A fake registry proves only an adapter contract; a discovered schema proves only discovery. Neither substitutes for a real call and state check.

For irreversible operations, use an explicitly authorized sandbox or verify the preparation/confirmation boundary without committing. Do not use real purchases, external messages, or production deletions as routine probes.

## Make the comparison fair

Write a task matrix before changing the tool design:

| Case | Initial state | User request | Expected final state | Forbidden effect | Oracle |
| --- | --- | --- | --- | --- | --- |
| A real task or documented failure | Resettable fixture | Natural wording | Checkable result | Scope leak, duplicate, unintended action | Independent state/UI/service receipt |

Include normal paths and realistic failures. Keep unseen requests or states out of the tuning loop. A task that requires a human decision should pass when it requests that decision correctly, not when it bypasses the handoff.

Run the existing UI or tool baseline and the candidate with the same model/client, permissions, task data, and reset conditions. Keep relevant latency/token budgets comparable. Report task-level success, forbidden effects, tool calls, elapsed time, and token usage only when measured. Count failed attempts in cost/latency totals rather than hiding them. Use enough repetitions to expose variability; give the actual count instead of implying statistical confidence from a small run.

[Sierra's tau-bench](https://sierra.ai/blog/benchmarking-ai-agents) motivates checking the goal state and consistency across varied interactions. Repeated success is different from succeeding once among several tries. Do not label a homemade score tau-bench or claim its benchmark performance.

[Decagon's simulations](https://decagon.ai/blog/decagon-simulations) motivate cases grounded in previous failures, varied wording/personas, and trace inspection. Borrow the evaluation method; do not claim these companies endorsed this skill or use this exact WebMCP implementation.

## Judge without teaching to the answer

For subjective quality or competing designs, blind evaluators to which version is yours. Provide the user task and resulting trace/artifact, not the desired conclusion or previous feedback. Check concrete state independently; an LLM judge cannot overrule a failed authorization, missing record, or wrong result.

If a failure exposes a shared mechanism, fix that mechanism. Re-run the failing case and untouched cases in different contexts. Keep an acceptance set separate from development feedback. Publish the evaluation's limits, including what the fixture cannot represent.

## Release and learn

[Decagon's evaluation approach](https://decagon.ai/blog/evaluation-engine-ai-agents) separates offline checks from controlled online evidence. Apply that distinction: local success supports shipping readiness, not a conversion claim. Production rollout, experiments, and monitoring require the user's applicable authorization and real instrumentation.

After a verified release, compare fixed windows and comparable populations using [measurement](measurement.md). Inspect failures as well as successes. Classify the objective as met, not met, inconclusive, or uncheckable. Low volume, missing joins, provider outages, and changes in traffic mix may prevent a conclusion.
