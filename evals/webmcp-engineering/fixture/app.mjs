export function createApp() {
  let state = { account: 'alpha', route: 'drafts', epoch: 0 };
  let id = 0;
  const drafts = new Map([['alpha', []], ['beta', []]]);
  const listeners = new Set();
  const notify = () => listeners.forEach(fn => fn());
  const context = () => ({ ...state });
  const assertContext = ctx => {
    if (state.route !== 'drafts' || ctx.account !== state.account || ctx.epoch !== state.epoch) throw new Error('Draft workspace changed');
  };
  const parseDraft = input => {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(k => !['title','body'].includes(k))) throw new Error('Expected title and body only');
    if (typeof input.title !== 'string' || !input.title.trim() || input.title.length > 120 || typeof input.body !== 'string' || input.body.length > 2000) throw new Error('Invalid draft');
    return { title: input.title.trim(), body: input.body };
  };
  return {
    context, parseDraft,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    navigate(route) { if (!['home','drafts'].includes(route)) throw new Error('Invalid route'); state={...state,route,epoch:state.epoch+1}; notify(); },
    switchAccount(account) { if (!drafts.has(account)) throw new Error('Invalid account'); state={...state,account,epoch:state.epoch+1}; notify(); },
    listDrafts() { assertContext(context()); return structuredClone(drafts.get(state.account)); },
    async saveDraft(input, ctx, { signal } = {}) {
      const parsed = parseDraft(input); assertContext(ctx); signal?.throwIfAborted();
      await new Promise(resolve=>setTimeout(resolve,30));
      signal?.throwIfAborted(); assertContext(ctx);
      const draft={id:'draft-'+(++id),...parsed}; drafts.get(ctx.account).push(draft); notify();
      return structuredClone(draft);
    }
  };
}
