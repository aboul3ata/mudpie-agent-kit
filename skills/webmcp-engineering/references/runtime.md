# Runtime and lifecycle

Checked 2026-10-07. WebMCP is evolving: verify these decisions against the target runtime before writing code. Start with [Chrome's API documentation](https://developer.chrome.com/docs/ai/webmcp/imperative-api), its [declarative API](https://developer.chrome.com/docs/ai/webmcp/declarative-api), and [MCP-B's runtime chooser](https://docs.mcp-b.ai/how-to/choose-runtime).

## Select a layer

| Need | Candidate | Verify |
| --- | --- | --- |
| Browser already implements the required API | Native WebMCP | Exact client/version, supported methods, secure context |
| Types only | `webmcp-types` | Declarations match that browser; types add no runtime |
| Tool registration without native support | `@mcp-b/webmcp-polyfill` | What the actual agent can discover and execute |
| MCP-B transports, prompts, resources, or direct MCP access | `@mcp-b/global` | Required bridge, origins, and extension semantics |
| React registration | `usewebmcp` or `@mcp-b/react-webmcp` | Hooks' lifecycle and schema needs; runtime initialized first |

Do not install every layer. Preserve existing package choices unless a concrete incompatibility justifies changing them. A server MCP endpoint remains useful for server-to-server or background work; it does not automatically become a browser tool.

## Native snapshot

Current Chrome documentation uses `document.modelContext`, asynchronous `registerTool`, and an `AbortController` signal supplied in registration options for removal. Its execution callback receives a separate signal. Since Chrome 153, removing registration does not itself cancel a running call. Chrome 155 deprecates JSON-string input to `executeTool`; `debugging` is documented for Chrome 156. Older examples use different accessors and lifecycle methods.

Resolve this with a short compatibility receipt: browser build, package versions, native/adapter path, supported registration/removal contract, discovery path, execution argument format, cancellation behavior. Check actual behavior through the permitted client tools. Do not silently overwrite the browser's API with a mock or assume a source example proves support.

In React or another component framework, tie registration ownership to the route/account that owns it. Clean up on invalidation and handle async registration rejection. A render-driven effect must not leave duplicate or stale registrations. Fresh state in an executor is still necessary even if the discovery list updates correctly.

## Forms

Use declarative WebMCP when a real form already models the task. `toolname` and `tooldescription` expose it; controls and labels describe inputs. Without `toolautosubmit`, the documented flow leaves submission to the user. Enable automatic submission only where the intended product behavior allows it. An agent-invoked custom submit using `respondWith` first calls `preventDefault`.

Test conditional, disabled, required, and invalid fields against the browser-generated schema and the actual submit handler. Keep the ordinary form usable without WebMCP. Never build a hidden second form that skips the application's validation or review.

## Frames and bridges

Chrome's `tools` Permissions Policy and cross-origin tool exposure are separate controls. Grant only intended origins; test the embedding configuration explicitly. A same-origin demo is not evidence for an iframe integration. Keep the host's WebMCP bridge distinct from browser APIs and MCP-B transports; follow the host's supported discovery/execution tools rather than inventing a fallback around an access restriction.
