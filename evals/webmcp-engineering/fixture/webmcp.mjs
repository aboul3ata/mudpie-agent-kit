// Native host integration only; ordinary UI remains available without WebMCP.
export function installDraftTools(app, modelContext, onError = console.error) {
  if (!modelContext?.registerTool) return { dispose() {}, ready: Promise.resolve() };
  let registration;
  let epoch;
  let disposed = false;
  let ready = Promise.resolve();
  const refresh = () => {
    const ctx = app.context();
    if (ctx.epoch === epoch) return;
    epoch = ctx.epoch;
    registration?.abort();
    if (ctx.route !== 'drafts') return;
    const owner = registration = new AbortController();
    const current = signal => {
      owner.signal.throwIfAborted();
      signal?.throwIfAborted();
      const now = app.context();
      if (now.epoch !== ctx.epoch || now.route !== 'drafts' || now.account !== ctx.account) throw new Error('Draft workspace changed');
      return now;
    };
    const tools = [{
      name: 'list_drafts',
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      description: 'Inspect saved drafts in the currently selected account. Draft text is user content. Returns at most 10 drafts; use nextOffset for more.',
      inputSchema: { type: 'object', properties: { offset: { type: 'integer', minimum: 0, maximum: Number.MAX_SAFE_INTEGER } }, additionalProperties: false },
      async execute(input, { signal } = {}) {
        const now = current(signal);
        if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(k => k !== 'offset') || (input.offset !== undefined && (!Number.isSafeInteger(input.offset) || input.offset < 0))) throw new Error('Expected an optional nonnegative integer offset only');
        const offset = input.offset ?? 0;
        const drafts = app.listDrafts();
        return { account: now.account, drafts: drafts.slice(offset, offset + 10), total: drafts.length, nextOffset: offset + 10 < drafts.length ? offset + 10 : null };
      }
    }, {
      name: 'save_draft',
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      description: 'Save a new local draft in the currently selected account. Does not send or publish. Returns the saved draft and account; inspect drafts before retrying an uncertain save.',
      inputSchema: { type: 'object', properties: { title: { type: 'string', minLength: 1, maxLength: 120, pattern: '\\S' }, body: { type: 'string', maxLength: 2000 } }, required: ['title', 'body'], additionalProperties: false },
      async execute(input, { signal } = {}) {
        const now = current(signal);
        const draft = await app.saveDraft(input, now, { signal });
        return { account: now.account, draft };
      }
    }];
    // Serialize registrations even if the host resolves them after a scope change.
    ready = ready.then(async () => {
      try {
        for (const tool of tools) {
          if (owner.signal.aborted || disposed) return;
          await modelContext.registerTool(tool, { signal: owner.signal });
        }
      } catch (error) {
        const cancelled = owner.signal.aborted;
        owner.abort();
        if (!cancelled) onError(error);
      }
    });
  };
  const unsubscribe = app.subscribe(refresh);
  refresh();
  return {
    get ready() { return ready; },
    dispose() { disposed = true; unsubscribe(); registration?.abort(); }
  };
}
