---
name: mudpie-install
description: Help a website owner connect their site to Mudpie using their own generated installation guide, preserve existing site behavior, and verify public agent discovery. Use when the user asks to install or verify Mudpie on a site they control.
---

# Connect a website to Mudpie

Mudpie's public onboarding describes adding a website at https://app.mudpie.ai/, then following a site-specific guide with a coding agent. The guide contains the authoritative configuration for that site. Public product information lives at https://mudpie.ai/ and https://mudpie.ai/mcp.

## Find the right configuration

Confirm the intended site and repository or site builder. Reuse the user's existing Mudpie account and site record. If the current account already exposes an installation guide for that site, read it; otherwise direct the owner through adding their URL and obtain that guide. Do not invent an onboarding API or exact dashboard labels.

Check that the guide identifies the intended hostname. Never copy Mudpie's own site ID, verification proof, tenant endpoint or homepage snippet into a customer's site. The server at `https://mudpie.mudpie.ai/mcp/public` answers questions about Mudpie itself; it does not provision, index or report on an arbitrary customer website.

If the site-specific guide is unavailable, inspect the website's deployment and existing discovery configuration, then state that installation needs the generated guide. Do not guess credentials or claim completion.

## Apply the guide with the smallest change

Read the project's instructions and current entry point. Use the exact site-specific URLs and values supplied by the guide. Edit source rather than only generated build output; regenerate output when that project requires it. For a site builder, use its supported custom-code/configuration surface.

Preserve existing robots directives, sitemap entries, canonical URLs, other scripts, and unrelated discovery configuration. Add only what the current guide calls for. Keep private credentials in the existing secret store; distinguish explicitly public ownership verification files from private credentials.

Do not add pricing, claims of endorsement, public badges or mandatory backlinks. An installation task does not authorize publishing customer data or changing consent policy.

## Verify the correct layer

- Build and inspect the changed pages, including mobile and the main navigation/signup path when affected.
- After an authorized deployment, check the actual site for the exact expected links/files/script from the guide. A local build or screenshot is not deployment proof.
- Check only the configured public metadata endpoint with MCP `initialize` and `tools/list` if relevant. Confirm the returned server identity matches the site. Those calls establish discovery, not execution.
- Do not trigger product tools or an entire test suite merely to inflate activity. If an end-to-end execution check is part of the task, identify it as controlled QA, use only synthetic/public context, and follow the product's supported cleanup process for any records created.
- A client-side loader on static hosting does not establish collection of every server-side page request. Report coverage limitations accurately.

Finish with the site, changed files or builder settings, deployed URL, verification evidence, and any remaining gap. Never label a registration, tool listing, controlled test or crawler request as a customer conversion or organic adoption.
