import {createApp} from './app.mjs';
import {installDraftTools} from './webmcp.mjs';
const app=createApp();
const $=id=>document.getElementById(id);
const render=()=>{const ctx=app.context();$('editor').hidden=ctx.route!=='drafts';$('status').textContent=ctx.account+' / '+ctx.route;$('items').replaceChildren();if(ctx.route==='drafts')for(const d of app.listDrafts()){const li=document.createElement('li');li.textContent=d.id+': '+d.title+' — '+d.body;$('items').append(li)}};
app.subscribe(render);render();
$('account').onchange=()=>app.switchAccount($('account').value);
$('home').onclick=()=>app.navigate('home');$('drafts').onclick=()=>app.navigate('drafts');
$('editor').onsubmit=async e=>{e.preventDefault();try{await app.saveDraft({title:$('title').value,body:$('body').value},app.context());}catch(e){$('status').textContent=e.message}};

let draftTools = installDraftTools(app, document.modelContext);
window.addEventListener('pagehide', () => draftTools.dispose());
window.addEventListener('pageshow', event => { if (event.persisted) draftTools = installDraftTools(app, document.modelContext); });
