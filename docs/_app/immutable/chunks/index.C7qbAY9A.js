var j=Object.defineProperty;var z=(t,e,n)=>e in t?j(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var d=(t,e,n)=>z(t,typeof e!="symbol"?e+"":e,n);import{r as y,n as w,f as N,g as I,i as C,h as W,j as A,k as G,l as O,m as S,p as R,q,u as F}from"./scheduler.CQ8LfOo8.js";let g=!1;function J(){g=!0}function K(){g=!1}function U(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function V(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&l.push(f)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let l=0;l<e.length;l++){const o=e[l].claim_order,f=(s>0&&e[n[s]].claim_order<=o?s+1:U(1,s,m=>e[n[m]].claim_order,o))-1;i[l]=n[f]+1;const u=f+1;n[u]=l,s=Math.max(u,s)}const a=[],r=[];let c=e.length-1;for(let l=n[s]+1;l!=0;l=i[l-1]){for(a.push(e[l-1]);c>=l;c--)r.push(e[c]);c--}for(;c>=0;c--)r.push(e[c]);a.reverse(),r.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<r.length;l++){for(;o<a.length&&r[l].claim_order>=a[o].claim_order;)o++;const f=o<a.length?a[o]:null;t.insertBefore(r[l],f)}}function Q(t,e){t.appendChild(e)}function X(t,e){if(g){for(V(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Y(t,e,n){t.insertBefore(e,n||null)}function Z(t,e,n){g&&!n?X(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function h(t){t.parentNode&&t.parentNode.removeChild(t)}function ut(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function b(t){return document.createElement(t)}function M(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function ft(){return v(" ")}function dt(){return v("")}function H(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function _t(t){return function(e){return e.preventDefault(),t.call(this,e)}}function ht(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function mt(t){return t.dataset.svelteH}function pt(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function $t(t){return t===""?null:+t}function k(t){return Array.from(t.childNodes)}function D(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function B(t,e,n,i,s=!1){D(t);const a=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const c=t[r];if(e(c)){const l=n(c);return l===void 0?t.splice(r,1):t[r]=l,s||(t.claim_info.last_index=r),c}}for(let r=t.claim_info.last_index-1;r>=0;r--){const c=t[r];if(e(c)){const l=n(c);return l===void 0?t.splice(r,1):t[r]=l,s?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,c}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function P(t,e,n,i){return B(t,s=>s.nodeName===e,s=>{const a=[];for(let r=0;r<s.attributes.length;r++){const c=s.attributes[r];n[c.name]||a.push(c.name)}a.forEach(r=>s.removeAttribute(r))},()=>i(e))}function yt(t,e,n){return P(t,e,n,b)}function gt(t,e,n){return P(t,e,n,M)}function tt(t,e){return B(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>v(e),!0)}function xt(t){return tt(t," ")}function L(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function wt(t,e){const n=L(t,"HTML_TAG_START",0),i=L(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new x(e);D(t);const s=t.splice(n,i-n+1);h(s[0]),h(s[s.length-1]);const a=s.slice(1,s.length-1);if(a.length===0)return new x(e);for(const r of a)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new x(e,a)}function bt(t,e){e=""+e,t.data!==e&&(t.data=e)}function vt(t,e){t.value=e??""}function Et(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}let p;function et(){if(p===void 0){p=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{p=!0}}return p}function Tt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=b("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=et();let a;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",a=H(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{a=H(i.contentWindow,"resize",e),e()}),Q(t,i),()=>{(s||a&&i.contentWindow)&&a(),h(i)}}function Nt(t,e,n){t.classList.toggle(e,!!n)}function At(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const a=s.textContent.trim();a===`HEAD_${t}_END`?(i-=1,n.push(s)):a===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class nt{constructor(e=!1){d(this,"is_svg",!1);d(this,"e");d(this,"n");d(this,"t");d(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=M(n.nodeName):this.e=b(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Y(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(h)}}class x extends nt{constructor(n=!1,i){super(n);d(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)Z(this.t,this.n[i],n)}}function St(t,e){return new t(e)}const $=new Set;let _;function Ht(){_={r:0,c:[],p:_}}function Lt(){_.r||y(_.c),_=_.p}function it(t,e){t&&t.i&&($.delete(t),t.i(e))}function Ct(t,e,n,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Mt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Dt(t){t&&t.c()}function Bt(t,e){t&&t.l(e)}function st(t,e,n){const{fragment:i,after_update:s}=t.$$;i&&i.m(e,n),A(()=>{const a=t.$$.on_mount.map(R).filter(C);t.$$.on_destroy?t.$$.on_destroy.push(...a):y(a),t.$$.on_mount=[]}),s.forEach(A)}function rt(t,e){const n=t.$$;n.fragment!==null&&(G(n.after_update),y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function lt(t,e){t.$$.dirty[0]===-1&&(q.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Pt(t,e,n,i,s,a,r=null,c=[-1]){const l=O;S(t);const o=t.$$={fragment:null,ctx:[],props:a,update:w,not_equal:s,bound:N(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:N(),dirty:c,skip_bound:!1,root:e.target||l.$$.root};r&&r(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(u,m,...E)=>{const T=E.length?E[0]:m;return o.ctx&&s(o.ctx[u],o.ctx[u]=T)&&(!o.skip_bound&&o.bound[u]&&o.bound[u](T),f&&lt(t,u)),m}):[],o.update(),f=!0,y(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){J();const u=k(e.target);o.fragment&&o.fragment.l(u),u.forEach(h)}else o.fragment&&o.fragment.c();e.intro&&it(t.$$.fragment),st(t,e.target,e.anchor),K(),I()}S(l)}class jt{constructor(){d(this,"$$");d(this,"$$set")}$destroy(){rt(this,1),this.$destroy=w}$on(e,n){if(!C(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const ot="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ot);export{wt as A,H as B,Nt as C,pt as D,vt as E,Mt as F,mt as G,x as H,$t as I,_t as J,Tt as K,M as L,gt as M,jt as S,k as a,tt as b,yt as c,h as d,b as e,Z as f,X as g,ft as h,Pt as i,dt as j,xt as k,Ct as l,Lt as m,it as n,ht as o,Et as p,Ht as q,St as r,bt as s,v as t,Dt as u,Bt as v,st as w,rt as x,At as y,ut as z};
