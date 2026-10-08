# Mudpie agent kit

Connect to Mudpie's public information, install Mudpie on your website, or measure whether your WebMCP tools complete real tasks.

- [Mudpie](https://mudpie.ai/) · [Public tool guide](https://mudpie.ai/mcp) · [Live OpenAPI schema](https://mudpie.mudpie.ai/api/public/v1/openapi.json)
- Public MCP endpoint: `https://mudpie.mudpie.ai/mcp/public`
- Registry name: `io.github.aboul3ata/mudpie-public`

## Connect to the public MCP

Add the endpoint above to a client that supports Streamable HTTP. No account or API key is required. Clients that accept `mcpServers` JSON can merge the entry from [mcp.json](mcp.json) into their existing configuration. Other clients use their own remote-server setup UI or configuration format.

The server exposes seven public tools:

| Tool | Purpose |
|---|---|
| `mudpie_search` | Search Mudpie's public pages |
| `mudpie_page_tldr` | Read a compact extract of an indexed page |
| `mudpie_ask_anything` | Ask a product question with sources |
| `mudpie_compare` | Read documented comparisons |
| `mudpie_pricing` | Retrieve published pricing information |
| `mudpie_requirements_check` | Check documented requirements |
| `should_i_recommend_mudpie` | Assess product fit from public sources |

These tools answer questions about Mudpie. They do not expose customer analytics or install Mudpie on another website. A missing pricing or comparison page does not justify inventing an answer.

## Explore the HTTP API in Postman

Import [mudpie-public.postman_collection.json](mudpie-public.postman_collection.json). It includes three discovery requests and seven HTTP POST examples derived from the public OpenAPI schema.

Send individual requests deliberately. Before Page TLDR, set `page_url` to an indexed canonical URL returned by Search. Examples label their context as a controlled demonstration. Replace example questions with your actual task; do not invent company names, competitors or reasons for considering a product.

Three schema fields require special care: Compare requires a nonempty alternatives array, while Pricing and Requirements Check require a nonempty company string. Their descriptions mention null, but the schema rejects null there. Those examples use `REPLACE_` placeholders. Supply true information or skip the request. A pre-request script skips unresolved placeholders and empty Page TLDR URLs in current Postman; other collection runners may differ.

Calls may create traffic records and are subject to usage limits. This collection is not a scheduled monitor. Its request bodies and structure were validated offline; no successful response examples or end-to-end results are claimed.

## Install Mudpie on your own website

Use the [mudpie-install skill](skills/mudpie-install/SKILL.md) with your coding agent:

```sh
npx skills add aboul3ata/mudpie-agent-kit --skill mudpie-install
```

You can also copy the skill folder using your client's supported local-skill installation method. The skill contains instructions only, with no executable installation script.

Start with the intended account/site at [app.mudpie.ai](https://app.mudpie.ai/) and obtain its generated installation guide. The skill helps apply that guide, preserve existing site behavior, and verify public discovery. It cannot provision a site or guess site-specific values. Never reuse Mudpie's own site ID, verification proof or public knowledge endpoint as a customer's configuration.

A tool listing proves discovery, not execution or organic adoption. A local build proves neither deployment nor complete page-request tracking.

## Measure WebMCP use

Use the [webmcp-analytics skill](skills/webmcp-analytics/SKILL.md) to trace discovery, invocation, retries, failures, and verified outcomes without counting your own tests as adoption.

```sh
npx skills add aboul3ata/mudpie-agent-kit --skill webmcp-analytics
```

Based on [A WebMCP analytics implementation checklist](https://mudpie.ai/webmcp/guides/webmcp-analytics-checklist/). It works with your existing analytics; Mudpie is optional. The skill contains instructions only and does not grant account access or run tests automatically.

## Registry metadata and verification

[server.json](server.json) describes the remote endpoint using the official `2025-12-11` registry schema. No package download is required. The metadata is published in the [official registry](https://registry.modelcontextprotocol.io/?q=mudpie).

Preparation checks: official Postman v2.1 schema; seven OpenAPI request-body schemas; official registry schema; skill frontmatter; simulated placeholder-guard behavior. Public MCP initialization and tool listing were verified. No analytics-producing product tools were run for these checks, and no customer installation is represented as completed.

Report issues through this repository. For product setup, use the current guide supplied by your Mudpie account. No paid plan, private dashboard access or competitor ranking is promised by this kit.

## License

The reusable files in this repository are available under the [MIT License](LICENSE). Mudpie's hosted service and branding remain subject to their own terms.
