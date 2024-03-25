(self["webpackChunktasker"]=self["webpackChunktasker"]||[]).push([[358],{89:function(e,t){"use strict";t.Z=(e,t)=>{const a=e.__vccOpts||e;for(const[s,l]of t)a[s]=l;return a}},9936:function(e,t,a){a(7658),
/*!
 * Copyright (c) 2021 Momo Bassit.
 * Licensed under the MIT License (MIT)
 * https://github.com/mdbassit/Coloris
 */
((e,t,a,s)=>{const l=t.createElement("canvas").getContext("2d"),o={r:0,g:0,b:0,h:0,s:0,v:0,a:1};let n,r,i,c,u,d,p,v,h,f,m,g,_,b,y,w,k;const L={el:"[data-coloris]",parent:"body",theme:"default",themeMode:"light",rtl:!1,wrap:!0,margin:2,format:"hex",formatToggle:!1,swatches:[],swatchesOnly:!1,alpha:!0,forceAlpha:!1,focusInput:!0,selectInput:!1,inline:!1,defaultColor:"#000000",clearButton:!1,clearLabel:"Clear",closeButton:!1,closeLabel:"Close",onChange:()=>s,a11y:{open:"Open color picker",close:"Close color picker",clear:"Clear the selected color",marker:"Saturation: {s}. Brightness: {v}.",hueSlider:"Hue slider",alphaSlider:"Opacity slider",input:"Color value field",format:"Color format",swatch:"Color swatch",instruction:"Saturation and brightness selector. Use up, down, left and right arrow keys to select."}},S={};let T="",E={},j=!1;function C(a){if("object"===typeof a)for(const l in a)switch(l){case"el":I(a.el),!1!==a.wrap&&U(a.el);break;case"parent":n=t.querySelector(a.parent),n&&(n.appendChild(r),L.parent=a.parent,n===t.body&&(n=s));break;case"themeMode":L.themeMode=a.themeMode,"auto"===a.themeMode&&e.matchMedia&&e.matchMedia("(prefers-color-scheme: dark)").matches&&(L.themeMode="dark");case"theme":a.theme&&(L.theme=a.theme),r.className=`clr-picker clr-${L.theme} clr-${L.themeMode}`,L.inline&&A();break;case"rtl":L.rtl=!!a.rtl,t.querySelectorAll(".clr-field").forEach((e=>e.classList.toggle("clr-rtl",L.rtl)));break;case"margin":a.margin*=1,L.margin=isNaN(a.margin)?L.margin:a.margin;break;case"wrap":a.el&&a.wrap&&U(a.el);break;case"formatToggle":L.formatToggle=!!a.formatToggle,le("clr-format").style.display=L.formatToggle?"block":"none",L.formatToggle&&(L.format="auto");break;case"swatches":if(Array.isArray(a.swatches)){const e=[];a.swatches.forEach(((t,a)=>{e.push(`<button type="button" id="clr-swatch-${a}" aria-labelledby="clr-swatch-label clr-swatch-${a}" style="color: ${t};">${t}</button>`)})),le("clr-swatches").innerHTML=e.length?`<div>${e.join("")}</div>`:"",L.swatches=a.swatches.slice()}break;case"swatchesOnly":L.swatchesOnly=!!a.swatchesOnly,r.setAttribute("data-minimal",L.swatchesOnly);break;case"alpha":L.alpha=!!a.alpha,r.setAttribute("data-alpha",L.alpha);break;case"inline":if(L.inline=!!a.inline,r.setAttribute("data-inline",L.inline),L.inline){const e=a.defaultColor||L.defaultColor;y=B(e),A(),M(e)}break;case"clearButton":"object"===typeof a.clearButton&&(a.clearButton.label&&(L.clearLabel=a.clearButton.label,v.innerHTML=L.clearLabel),a.clearButton=a.clearButton.show),L.clearButton=!!a.clearButton,v.style.display=L.clearButton?"block":"none";break;case"clearLabel":L.clearLabel=a.clearLabel,v.innerHTML=L.clearLabel;break;case"closeButton":L.closeButton=!!a.closeButton,L.closeButton?r.insertBefore(h,d):d.appendChild(h);break;case"closeLabel":L.closeLabel=a.closeLabel,h.innerHTML=L.closeLabel;break;case"a11y":const o=a.a11y;let c=!1;if("object"===typeof o)for(const e in o)o[e]&&L.a11y[e]&&(L.a11y[e]=o[e],c=!0);if(c){const e=le("clr-open-label"),t=le("clr-swatch-label");e.innerHTML=L.a11y.open,t.innerHTML=L.a11y.swatch,h.setAttribute("aria-label",L.a11y.close),v.setAttribute("aria-label",L.a11y.clear),f.setAttribute("aria-label",L.a11y.hueSlider),g.setAttribute("aria-label",L.a11y.alphaSlider),p.setAttribute("aria-label",L.a11y.input),i.setAttribute("aria-label",L.a11y.instruction)}break;default:L[l]=a[l]}}function $(e,t){"string"===typeof e&&"object"===typeof t&&(S[e]=t,j=!0)}function D(e){delete S[e],0===Object.keys(S).length&&(j=!1,e===T&&H())}function x(e){if(j){const t=["el","wrap","rtl","inline","defaultColor","a11y"];for(let a in S){const s=S[a];if(e.matches(a)){T=a,E={},t.forEach((e=>delete s[e]));for(let e in s)E[e]=Array.isArray(L[e])?L[e].slice():L[e];C(s);break}}}}function H(){Object.keys(E).length>0&&(C(E),T="",E={})}function I(e){oe(t,"click",e,(e=>{L.inline||(x(e.target),b=e.target,w=b.value,y=B(w),r.classList.add("clr-open"),A(),M(w),(L.focusInput||L.selectInput)&&(p.focus({preventScroll:!0}),p.setSelectionRange(b.selectionStart,b.selectionEnd)),L.selectInput&&p.select(),(k||L.swatchesOnly)&&se().shift().focus(),b.dispatchEvent(new Event("open",{bubbles:!0})))})),oe(t,"input",e,(e=>{const t=e.target.parentNode;t.classList.contains("clr-field")&&(t.style.color=e.target.value)}))}function A(){const a=n,s=e.scrollY,l=r.offsetWidth,o=r.offsetHeight,u={left:!1,top:!1};let d,p,v,h={x:0,y:0};if(a&&(d=e.getComputedStyle(a),p=parseFloat(d.marginTop),v=parseFloat(d.borderTopWidth),h=a.getBoundingClientRect(),h.y+=v+s),!L.inline){const e=b.getBoundingClientRect();let n=e.x,i=s+e.y+e.height+L.margin;a?(n-=h.x,i-=h.y,n+l>a.clientWidth&&(n+=e.width-l,u.left=!0),i+o>a.clientHeight-p&&o+L.margin<=e.top-(h.y-s)&&(i-=e.height+o+2*L.margin,u.top=!0),i+=a.scrollTop):(n+l>t.documentElement.clientWidth&&(n+=e.width-l,u.left=!0),i+o-s>t.documentElement.clientHeight&&o+L.margin<=e.top&&(i=s+e.y-o-L.margin,u.top=!0)),r.classList.toggle("clr-left",u.left),r.classList.toggle("clr-top",u.top),r.style.left=`${n}px`,r.style.top=`${i}px`,h.x+=r.offsetLeft,h.y+=r.offsetTop}c={width:i.offsetWidth,height:i.offsetHeight,x:i.offsetLeft+h.x,y:i.offsetTop+h.y}}function U(e){t.querySelectorAll(e).forEach((e=>{const a=e.parentNode;if(!a.classList.contains("clr-field")){const s=t.createElement("div");let l="clr-field";(L.rtl||e.classList.contains("clr-rtl"))&&(l+=" clr-rtl"),s.innerHTML='<button type="button" aria-labelledby="clr-open-label"></button>',a.insertBefore(s,e),s.setAttribute("class",l),s.style.color=e.value,s.appendChild(e)}}))}function W(e){if(b&&!L.inline){const t=b;e&&(b=s,w!==t.value&&(t.value=w,t.dispatchEvent(new Event("input",{bubbles:!0})))),setTimeout((()=>{w!==t.value&&t.dispatchEvent(new Event("change",{bubbles:!0}))})),r.classList.remove("clr-open"),j&&H(),t.dispatchEvent(new Event("close",{bubbles:!0})),L.focusInput&&t.focus({preventScroll:!0}),b=s}}function M(e){const t=Q(e),a=X(t);O(a.s,a.v),Y(t,a),f.value=a.h,r.style.color=`hsl(${a.h}, 100%, 50%)`,m.style.left=a.h/360*100+"%",u.style.left=c.width*a.s/100+"px",u.style.top=c.height-c.height*a.v/100+"px",g.value=100*a.a,_.style.left=100*a.a+"%"}function B(e){const t=e.substring(0,3).toLowerCase();return"rgb"===t||"hsl"===t?t:"hex"}function q(a){a=a!==s?a:p.value,b&&(b.value=a,b.dispatchEvent(new Event("input",{bubbles:!0}))),L.onChange&&L.onChange.call(e,a,b),t.dispatchEvent(new CustomEvent("coloris:pick",{detail:{color:a,currentEl:b}}))}function Z(e,t){const a={h:1*f.value,s:e/c.width*100,v:100-t/c.height*100,a:g.value/100},s=K(a);O(a.s,a.v),Y(s,a),q()}function O(e,t){let a=L.a11y.marker;e=1*e.toFixed(1),t=1*t.toFixed(1),a=a.replace("{s}",e),a=a.replace("{v}",t),u.setAttribute("aria-label",a)}function N(e){return{pageX:e.changedTouches?e.changedTouches[0].pageX:e.pageX,pageY:e.changedTouches?e.changedTouches[0].pageY:e.pageY}}function R(e){const t=N(e);let a=t.pageX-c.x,s=t.pageY-c.y;n&&(s+=n.scrollTop),P(a,s),e.preventDefault(),e.stopPropagation()}function F(e,t){let a=1*u.style.left.replace("px","")+e,s=1*u.style.top.replace("px","")+t;P(a,s)}function P(e,t){e=e<0?0:e>c.width?c.width:e,t=t<0?0:t>c.height?c.height:t,u.style.left=`${e}px`,u.style.top=`${t}px`,Z(e,t),u.focus()}function Y(e={},a={}){let s=L.format;for(const t in e)o[t]=e[t];for(const t in a)o[t]=a[t];const l=G(o),n=l.substring(0,7);switch(u.style.color=n,_.parentNode.style.color=n,_.style.color=l,d.style.color=l,i.style.display="none",i.offsetHeight,i.style.display="",_.nextElementSibling.style.display="none",_.nextElementSibling.offsetHeight,_.nextElementSibling.style.display="","mixed"===s?s=1===o.a?"hex":"rgb":"auto"===s&&(s=y),s){case"hex":p.value=l;break;case"rgb":p.value=ee(o);break;case"hsl":p.value=te(V(o));break}t.querySelector(`.clr-format [value="${s}"]`).checked=!0}function J(){const e=1*f.value,t=1*u.style.left.replace("px",""),a=1*u.style.top.replace("px","");r.style.color=`hsl(${e}, 100%, 50%)`,m.style.left=e/360*100+"%",Z(t,a)}function z(){const e=g.value/100;_.style.left=100*e+"%",Y({a:e}),q()}function K(e){const t=e.s/100,s=e.v/100;let l=t*s,o=e.h/60,n=l*(1-a.abs(o%2-1)),r=s-l;l+=r,n+=r;const i=a.floor(o)%6,c=[l,n,r,r,n,l][i],u=[n,l,l,n,r,r][i],d=[r,r,n,l,l,n][i];return{r:a.round(255*c),g:a.round(255*u),b:a.round(255*d),a:e.a}}function V(e){const t=e.v/100,s=t*(1-e.s/100/2);let l;return s>0&&s<1&&(l=a.round((t-s)/a.min(s,1-s)*100)),{h:e.h,s:l||0,l:a.round(100*s),a:e.a}}function X(e){const t=e.r/255,s=e.g/255,l=e.b/255,o=a.max(t,s,l),n=a.min(t,s,l),r=o-n,i=o;let c=0,u=0;return r&&(o===t&&(c=(s-l)/r),o===s&&(c=2+(l-t)/r),o===l&&(c=4+(t-s)/r),o&&(u=r/o)),c=a.floor(60*c),{h:c<0?c+360:c,s:a.round(100*u),v:a.round(100*i),a:e.a}}function Q(e){const t=/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;let a,s;return l.fillStyle="#000",l.fillStyle=e,a=t.exec(l.fillStyle),a?(s={r:1*a[3],g:1*a[4],b:1*a[5],a:1*a[6]},s.a=+s.a.toFixed(2)):(a=l.fillStyle.replace("#","").match(/.{2}/g).map((e=>parseInt(e,16))),s={r:a[0],g:a[1],b:a[2],a:1}),s}function G(e){let t=e.r.toString(16),a=e.g.toString(16),s=e.b.toString(16),l="";if(e.r<16&&(t="0"+t),e.g<16&&(a="0"+a),e.b<16&&(s="0"+s),L.alpha&&(e.a<1||L.forceAlpha)){const t=255*e.a|0;l=t.toString(16),t<16&&(l="0"+l)}return"#"+t+a+s+l}function ee(e){return!L.alpha||1===e.a&&!L.forceAlpha?`rgb(${e.r}, ${e.g}, ${e.b})`:`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`}function te(e){return!L.alpha||1===e.a&&!L.forceAlpha?`hsl(${e.h}, ${e.s}%, ${e.l}%)`:`hsla(${e.h}, ${e.s}%, ${e.l}%, ${e.a})`}function ae(){n=s,r=t.createElement("div"),r.setAttribute("id","clr-picker"),r.className="clr-picker",r.innerHTML=`<input id="clr-color-value" name="clr-color-value" class="clr-color" type="text" value="" spellcheck="false" aria-label="${L.a11y.input}"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="${L.a11y.instruction}"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" name="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="${L.a11y.hueSlider}"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" name="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="${L.a11y.alphaSlider}"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented"><legend>${L.a11y.format}</legend><input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div><button type="button" id="clr-clear" class="clr-clear" aria-label="${L.a11y.clear}">${L.clearLabel}</button><div id="clr-color-preview" class="clr-preview"><button type="button" id="clr-close" class="clr-close" aria-label="${L.a11y.close}">${L.closeLabel}</button></div><span id="clr-open-label" hidden>${L.a11y.open}</span><span id="clr-swatch-label" hidden>${L.a11y.swatch}</span>`,t.body.appendChild(r),i=le("clr-color-area"),u=le("clr-color-marker"),v=le("clr-clear"),h=le("clr-close"),d=le("clr-color-preview"),p=le("clr-color-value"),f=le("clr-hue-slider"),m=le("clr-hue-marker"),g=le("clr-alpha-slider"),_=le("clr-alpha-marker"),I(L.el),U(L.el),oe(r,"mousedown",(e=>{r.classList.remove("clr-keyboard-nav"),e.stopPropagation()})),oe(i,"mousedown",(e=>{oe(t,"mousemove",R)})),oe(i,"touchstart",(e=>{t.addEventListener("touchmove",R,{passive:!1})})),oe(u,"mousedown",(e=>{oe(t,"mousemove",R)})),oe(u,"touchstart",(e=>{t.addEventListener("touchmove",R,{passive:!1})})),oe(p,"change",(e=>{const t=p.value;if(b||L.inline){const e=""===t?t:M(t);q(e)}})),oe(v,"click",(e=>{q(""),W()})),oe(h,"click",(e=>{q(),W()})),oe(le("clr-format"),"click",".clr-format input",(e=>{y=e.target.value,Y(),q()})),oe(r,"click",".clr-swatches button",(e=>{M(e.target.textContent),q(),L.swatchesOnly&&W()})),oe(t,"mouseup",(e=>{t.removeEventListener("mousemove",R)})),oe(t,"touchend",(e=>{t.removeEventListener("touchmove",R)})),oe(t,"mousedown",(e=>{k=!1,r.classList.remove("clr-keyboard-nav"),W()})),oe(t,"keydown",(e=>{const t=e.key,a=e.target,s=e.shiftKey,l=["Tab","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];if("Escape"===t?W(!0):l.includes(t)&&(k=!0,r.classList.add("clr-keyboard-nav")),"Tab"===t&&a.matches(".clr-picker *")){const t=se(),l=t.shift(),o=t.pop();s&&a===l?(o.focus(),e.preventDefault()):s||a!==o||(l.focus(),e.preventDefault())}})),oe(t,"click",".clr-field button",(e=>{j&&H(),e.target.nextElementSibling.dispatchEvent(new Event("click",{bubbles:!0}))})),oe(u,"keydown",(e=>{const t={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};Object.keys(t).includes(e.key)&&(F(...t[e.key]),e.preventDefault())})),oe(i,"click",R),oe(f,"input",J),oe(g,"input",z)}function se(){const e=Array.from(r.querySelectorAll("input, button")),t=e.filter((e=>!!e.offsetWidth));return t}function le(e){return t.getElementById(e)}function oe(e,t,a,s){const l=Element.prototype.matches||Element.prototype.msMatchesSelector;"string"===typeof a?e.addEventListener(t,(e=>{l.call(e.target,a)&&s.call(e.target,e)})):(s=a,e.addEventListener(t,s))}function ne(e,a){a=a!==s?a:[],"loading"!==t.readyState?e(...a):t.addEventListener("DOMContentLoaded",(()=>{e(...a)}))}NodeList!==s&&NodeList.prototype&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),e.Coloris=(()=>{const e={set:C,wrap:U,close:W,setInstance:$,removeInstance:D,updatePosition:A};function t(e){ne((()=>{e&&("string"===typeof e?I(e):C(e))}))}for(const a in e)t[a]=(...t)=>{ne(e[a],t)};return t})(),ne(ae)})(window,document,Math)},875:function(e,t,a){"use strict";a.d(t,{S:function(){return i}});a(7658);var s=a(1020),l=a(4870),o=a(3396),n=a(8765),r=a(8332);const i=(0,s.Q_)("bigMenuStore",(()=>{const e=(0,l.qj)({id:0,name:"",surname:""}),t=(0,l.qj)([{id:1,name:"Сегодня",count:"",color:"#4ceba7",url:"/workspace/sortList=today"},{id:2,name:"С флажком",count:"",color:"#e76262",url:"/workspace/sortList=with_flag"},{id:3,name:"Завершено",count:"",color:"#daadad",url:"/workspace/sortList=done"},{id:4,name:"Все",count:"",color:"#c4c4c4",url:"/workspace/sortList=all"}]),a=(0,l.qj)([]),s=(0,l.qj)([{id:0,name:"Все теги"}]),i=((0,n.J)(),(0,l.iH)(!1)),c=(0,l.iH)(!1),u=(0,l.iH)(!1);(0,o.bv)((async()=>{await d(),await p(),await v()}));const d=async()=>{const t=await r.Z.getInfo("user");e.id=t.id,e.email=t.email,e.name=t.name,e.surname=t.surname},p=async()=>{console.log("go"),await h(),await f(),await m()},v=async()=>{const e=setInterval((()=>{console.log("request"),h(),f(),m()}),6e4);setTimeout((()=>{console.log("stop"),clearInterval(e)}),36e5)},h=async()=>{i.value=!0;const a=await r.Z.getInfoWithArgs("sortLists",{params:{user_id:e.id}});"object"===typeof a&&(a.forEach((e=>{t[e.id-1].count=e.count})),i.value=!1)};const f=async()=>{try{c.value=!0;const t=await r.Z.getInfoWithArgs("lists",{params:{user_id:e.id}});"object"===typeof t&&t.length>0&&(a.length=0,t.forEach((e=>{a.push(e)})),c.value=!1)}catch(t){console.log(t)}},m=async()=>{try{u.value=!0;const e=await r.Z.getInfo("tags");"object"===typeof e&&e.length>0&&(s.length=0,s.push({id:0,name:"Все теги"}),e.forEach((e=>{s.push(e)})),u.value=!1)}catch(e){console.log(e)}},g=e=>{a.push(e)},_=async e=>{await r.Z.saveList(e),await p()},b=async e=>{await r.Z.deleteList(e),await p()};return{sortLists:t,is_load_sortLists:i,personalLists:a,is_load_personalLists:c,personalTags:s,is_load_personalTags:u,user:e,firstRequest:p,addNewList:g,saveList:_,deleteList:b}}))},8765:function(e,t,a){"use strict";a.d(t,{J:function(){return c}});a(7658);var s=a(1020),l=a(4870),o=a(3396),n=a(2483),r=a(8332),i=a(875);const c=(0,s.Q_)("listViewStore",(()=>{const e=(0,l.qj)([]),t=(0,l.qj)([]),a=(0,l.qj)({id:"",name:"",color:""}),s=(0,l.qj)({id:0,name:"",color:""}),c=(0,l.qj)([]),u=(0,l.qj)([]),d=(0,l.iH)(""),p=(0,l.iH)(!0),v=(0,l.iH)(!0),h=(0,l.iH)(!1),f=(0,l.iH)(""),m=(0,n.yj)(),g=(0,l.iH)(m.path),_=(0,i.S)();(0,o.bv)((async()=>{setTimeout((()=>{b()}),300);setInterval((()=>{String(g.value)!==String(m.path)&&(p.value=!0,b())}),0)}));const b=async()=>{v.value=!0,g.value=m.path;try{h.value=!1,await y(),v.value=!1}catch(e){console.log(e),h.value=!0,p.value=!1,v.value=!1}},y=async()=>{if(m.params.id_list?f.value=`list?id=${m.params.id_list}`:m.params.name?f.value=`list?name=${m.params.name}`:m.params.id_tag?f.value=`tag?id=${m.params.id_tag}`:f.value="",f.value){const e=await r.Z.getInfoWithArgs(f.value,{params:{user_id:_.user.id}});setTimeout((()=>{w(e)}),300)}},w=l=>{(l["sortList"]||l["list"]||l["tag"])&&(l["tasks"]||l["tasksByList"])?(m.params.id_list?e.length=0:m.params.name?t.length=0:m.params.id_tag&&(u.length=0),m.params.id_list?l["tasks"].forEach((t=>{t.key=Math.random(),e.push(t)})):m.params.name&&l["tasksByList"].forEach((e=>{e.key=Math.random(),e.tasks.forEach((e=>{e.key=Math.random()})),t.push(e)})),j(),console.log(e),console.log(t),m.params.id_list?(a.id=l["list"].id,a.name=l["list"].name,a.color=l["list"].color):m.params.name?(s.id=l["sortList"].id,s.name=l["sortList"].name,_.sortLists.forEach((e=>{e.id===s.id&&(s.color=e.color)}))):m.params.id_tag&&(d.value=l["tag"]),p.value=!1,v.value=!1):(h.value=!0,p.value=!1,v.value=!1)},k=e=>{let a=0;t.forEach((t=>{t.tasks.forEach(((a,s)=>{+e===+a.id&&(console.log(t.tasks[s]),t.tasks.splice(s,1))})),t.tasks.length>0&&a++})),a||(t.length=0)},L=async e=>{await r.Z.postInfo("updateTask",e);await _.firstRequest()},S=()=>{e.push({id:null,id_list:a.id,name:null,description:null,deadline:null,is_done:0,is_flagged:0,url:null,priority:null})},T=(t,a)=>{e.find((e=>e.id===t)).is_done=+a,E(),j()},E=()=>{e.sort(((e,t)=>e.id>t.id?1:e.id==t.id?0:e.id<t.id?-1:void 0))},j=()=>{e.sort(((e,t)=>e.is_done>t.is_done?1:e.is_done==t.is_done?0:e.is_done<t.is_done?-1:void 0))},C=()=>{e.forEach(((t,a)=>{t.id||e.splice(a,1)}))},$=async t=>{t.id_list=a.id;const s=await r.Z.postInfo("createTask",t);return e.forEach(((e,t)=>{e.id||(e.id=s.id)})),await _.firstRequest(),s},D=async t=>{e.forEach(((a,s)=>{a.id===t.id&&e.splice(s,1)})),await r.Z.postInfo("deleteTask",t),await _.firstRequest()},x=async e=>{const t=await r.Z.globalSearch(e);console.log(t),c.length=0,t.forEach((e=>{c.push(e)}))};return{tasks:e,stasks:t,listInfo:a,sortListInfo:s,searchResult:c,loading:p,loadingSmall:v,is_somethingWrong:h,request:f,tags:u,tag_name:d,currentPath:g,getTasksOrTags:b,updateTask:L,addNewTask:S,removeNewTask:C,createTask:$,deleteTask:D,updateTaskDone:T,clearTasks:k,findTasks:x}}))},3746:function(e,t,a){"use strict";a.d(t,{F:function(){return c}});a(7658);var s=a(1020),l=a(4870),o=a(3396),n=a(875),r=a(8765),i=a(8332);const c=(0,s.Q_)("ImageDBStore",(()=>{(0,l.qj)([{id:1,name:"Сегодня",count:"",color:"#4ceba7",url:"/workspace/sortList=today"},{id:2,name:"С флажком",count:"",color:"#e76262",url:"/workspace/sortList=with_flag"},{id:3,name:"Завершено",count:"",color:"#daadad",url:"/workspace/sortList=done"},{id:4,name:"Все",count:"",color:"#c4c4c4",url:"/workspace/sortList=all"}]);const e=(0,l.qj)([]),t=((0,l.qj)([{id:0,name:"Все теги"}]),(0,l.qj)([]));(0,n.S)(),(0,r.J)();(0,o.bv)((async()=>{await a(),s()}));const a=async()=>{},s=()=>{t.length=0,e.forEach((async e=>{const a=await i.Z.getInfo(`list?id=${e.id}`);"object"===typeof a&&a.length>0&&t.push({list:a[0],tasks:a[1]})}))};return{personalLists:e,tasksByList:t}}))},2145:function(e,t,a){"use strict";a.d(t,{Z:function(){return d}});var s=a(3396);const l={class:"application-name__container"},o=(0,s._)("h1",{class:"application-name__label"},"Tasker",-1),n=[o];function r(e,t){return(0,s.wg)(),(0,s.iD)("div",l,n)}var i=a(89);const c={},u=(0,i.Z)(c,[["render",r]]);var d=u},7925:function(e,t,a){"use strict";a.d(t,{Z:function(){return v}});var s=a(3396),l=a(7139),o=a(4870),n=a(8765),r=a(2483);const i=e=>((0,s.dD)("data-v-f313ffa4"),e=e(),(0,s.Cn)(),e),c=i((()=>(0,s._)("button",{class:"drop-down-list__btn"},"Edit",-1)));var u={__name:"InfoList",props:["idList"],emits:["delete"],setup(e,{emit:t}){const a=e,i=(0,r.yj)(),u=((0,n.J)(),(0,o.iH)(null)),d=(0,o.iH)(null),p=()=>{d.value.classList.contains("active")?d.value.classList.remove("active"):d.value.classList.add("active")},v=e=>{d.value.classList.contains("active")&&!u.value.contains(e.target)&&d.value.classList.remove("active")};return(0,s.bv)((()=>{window.addEventListener("click",v)})),(0,s.Jd)((()=>{window.removeEventListener("click",v)})),(e,n)=>((0,s.wg)(),(0,s.iD)("div",{class:(0,l.C_)(["info-list",{active:+a.idList===+(0,o.SU)(i).params.id_list}]),ref_key:"infoList",ref:u,onMouseup:p},[(0,s._)("div",{class:"drop-down-list",ref_key:"dropDownList",ref:d},[c,(0,s._)("button",{class:"drop-down-list__btn",onMouseup:n[0]||(n[0]=e=>t("delete"))},"Delete",32)],512)],34))}},d=a(89);const p=(0,d.Z)(u,[["__scopeId","data-v-f313ffa4"]]);var v=p},8977:function(e,t,a){"use strict";a.d(t,{Z:function(){return v}});var s=a(3396);const l=e=>((0,s.dD)("data-v-58bd569a"),e=e(),(0,s.Cn)(),e),o={class:"lds-ripple"},n=l((()=>(0,s._)("div",null,null,-1))),r=l((()=>(0,s._)("div",null,null,-1))),i=[n,r];function c(e,t){return(0,s.wg)(),(0,s.iD)("div",o,i)}var u=a(89);const d={},p=(0,u.Z)(d,[["render",c],["__scopeId","data-v-58bd569a"]]);var v=p},1358:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return Re}});var s=a(3396),l=a(2145),o=a(4870),n=a(7139),r=a(875),i=a(8977);const c={class:"section-header__container"},u={class:"section-header__label"};var d={__name:"SectionHeader",props:{is_load:Boolean},setup(e){const t=e;return(e,a)=>((0,s.wg)(),(0,s.iD)("div",c,[(0,s._)("div",u,[(0,s.WI)(e.$slots,"default")]),t.is_load?((0,s.wg)(),(0,s.j4)(i.Z,{key:0})):(0,s.kq)("",!0)]))}};const p=d;var v=p,h=a(2483);const f={class:"sort-list__container"},m={class:"sort-list__count"},g={class:"sort-list__label"};var _={__name:"SortList",props:{color:String,url:String},setup(e){const t=e,a=(0,h.yj)();let l=t.color;return(e,r)=>{const i=(0,s.up)("router-link");return(0,s.wg)(),(0,s.j4)(i,{to:t.url},{default:(0,s.w5)((()=>[(0,s._)("div",{class:(0,n.C_)(["sort-list",{active:t.url===(0,o.SU)(a).path}])},[(0,s._)("div",f,[(0,s._)("div",{class:"circle",style:(0,n.j5)({backgroundColor:(0,o.SU)(l)})},null,4),(0,s._)("div",m,[(0,s.WI)(e.$slots,"count")])]),(0,s._)("div",g,[(0,s.WI)(e.$slots,"name")])],2)])),_:3},8,["to"])}}},b=a(89);const y=(0,b.Z)(_,[["__scopeId","data-v-c2be3356"]]);var w=y;const k={class:"sort-lists"},L={class:"sort-lists__container"};var S={__name:"TheSortLists",setup(e){const t=(0,r.S)();return(0,s.bv)((()=>{})),(e,a)=>((0,s.wg)(),(0,s.iD)("div",k,[(0,s.Wm)(v,{is_load:(0,o.SU)(t).is_load_sortLists},{default:(0,s.w5)((()=>[(0,s.Uk)("Списки")])),_:1},8,["is_load"]),(0,s._)("div",L,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,o.SU)(t).sortLists,(e=>((0,s.wg)(),(0,s.j4)(w,{key:e.id,color:e.color,url:e.url},{name:(0,s.w5)((()=>[(0,s.Uk)((0,n.zw)(e.name),1)])),count:(0,s.w5)((()=>[(0,s.Uk)((0,n.zw)(e.count),1)])),_:2},1032,["color","url"])))),128))])]))}};const T=S;var E=T,j=(a(7658),a(7925));const C={class:"personal-list__label"},$={class:"personal-list__count"};var D={__name:"PersonalList",props:{list:Object},setup(e){const t=e,a=(0,r.S)(),l=(0,h.yj)(),i=(0,h.tv)(),c=(0,o.iH)(null),u=e=>{c.value.contains(e.target)||i.push({name:"list",params:{id_list:t.list.id}})},d=()=>{a.deleteList(t.list.id),+t.list.id===+l.params.id_list&&i.push({name:"intro"})};return(e,a)=>((0,s.wg)(),(0,s.iD)("div",{class:(0,n.C_)(["personal-list",{active:t.list.id===+(0,o.SU)(l).params.id_list}]),onMouseup:u},[(0,s._)("div",{class:"personal-list__circle",style:(0,n.j5)({backgroundColor:t.list.color})},null,4),(0,s._)("div",C,[(0,s.WI)(e.$slots,"name")]),(0,s._)("div",{class:"info-list__wrapper",ref_key:"infoList",ref:c},[(0,s.Wm)(j.Z,{idList:t.list.id,onDelete:d},null,8,["idList"])],512),(0,s._)("div",$,[(0,s.WI)(e.$slots,"count")])],34))}};const x=D;var H=x;const I={key:0,class:"personal-lists"},A={class:"personal-lists__container"};var U={__name:"ThePersonalLists",setup(e){const t=(0,r.S)();return(e,a)=>(0,o.SU)(t).personalLists.length?((0,s.wg)(),(0,s.iD)("div",I,[(0,s.Wm)(v,{is_load:(0,o.SU)(t).is_load_personalLists},{default:(0,s.w5)((()=>[(0,s.Uk)("Мои списки")])),_:1},8,["is_load"]),(0,s._)("div",A,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,o.SU)(t).personalLists,(e=>((0,s.wg)(),(0,s.j4)(H,{key:e.id,list:e},{name:(0,s.w5)((()=>[(0,s.Uk)((0,n.zw)(e.name),1)])),count:(0,s.w5)((()=>[(0,s.Uk)((0,n.zw)(e.count_of_active_tasks),1)])),_:2},1032,["list"])))),128))])])):(0,s.kq)("",!0)}};const W=U;var M=W,B={__name:"PersonalTag",props:{tag:Object},setup(e){const t=e,a=(0,h.yj)(),l=((0,o.iH)(0),(0,o.iH)(t.tag.name)),r=()=>{0!==t.tag.id&&(l.value=`#${t.tag.name}`)};return(0,s.bv)((()=>{r()})),(e,r)=>{const i=(0,s.up)("router-link");return(0,s.wg)(),(0,s.j4)(i,{to:`/workspace/tag=${t.tag.id}`},{default:(0,s.w5)((()=>[(0,s._)("div",{class:(0,n.C_)(["personal-tag",{active:+t.tag.id===+(0,o.SU)(a).params.id_tag}])},(0,n.zw)(l.value),3)])),_:1},8,["to"])}}};const q=B;var Z=q;const O={key:0,class:"personal-tags"},N={class:"personal-tags__container scroll"};var R={__name:"ThePersonalTags",setup(e){const t=(0,r.S)();return(e,a)=>(0,o.SU)(t).personalTags.length>1?((0,s.wg)(),(0,s.iD)("div",O,[(0,s.Wm)(v,{is_load:(0,o.SU)(t).is_load_personalTags},{default:(0,s.w5)((()=>[(0,s.Uk)("Теги")])),_:1},8,["is_load"]),(0,s._)("div",N,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,o.SU)(t).personalTags,((e,t)=>((0,s.wg)(),(0,s.j4)(Z,{key:e.id,tag:e},null,8,["tag"])))),128))])])):(0,s.kq)("",!0)}};const F=R;var P=F,Y=a(9242);function J(e,t,a,l,o,r){return(0,s.wg)(),(0,s.iD)("button",{class:(0,n.C_)(["top-btn",a.cl])},null,2)}var z={props:["cl"]};const K=(0,b.Z)(z,[["render",J]]);var V=K;const X=["placeholder"];var Q={__name:"InputText",props:{name:String,placeholder:String,width:String,border:String},emits:["underDeroch"],setup(e,{emit:t}){const a=e,l=(0,o.iH)(a.name),r=(0,o.iH)(null);return(0,s.bv)((()=>{r.value.focus()})),(a,o)=>(0,s.wy)(((0,s.wg)(),(0,s.iD)("input",{type:"text",class:"searcher","onUpdate:modelValue":o[0]||(o[0]=e=>l.value=e),placeholder:e.placeholder,style:(0,n.j5)({width:e.width,borderBottom:e.border}),onChange:o[1]||(o[1]=e=>t("underDeroch",l.value)),ref_key:"inputFocus",ref:r},null,44,X)),[[Y.nr,l.value]])}};const G=Q;var ee=G,te=(a(9936),{__name:"Coloris",props:{color:String},emits:["onDroch"],setup(e,{emit:t}){const a=e,l=(0,o.iH)(a.color);return Coloris({el:".coloris",themeMode:"auto",format:"hex",swatches:["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51","#d62828","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4"]}),(e,a)=>(0,s.wy)(((0,s.wg)(),(0,s.iD)("input",{type:"text",class:"coloris inp","onUpdate:modelValue":a[0]||(a[0]=e=>l.value=e),style:(0,n.j5)({backgroundColor:l.value,color:l.value}),onChange:a[1]||(a[1]=e=>t("onDroch",l.value))},null,36)),[[Y.nr,l.value]])}});const ae=(0,b.Z)(te,[["__scopeId","data-v-249477fc"]]);var se=ae;a(8332);const le=e=>((0,s.dD)("data-v-3da30920"),e=e(),(0,s.Cn)(),e),oe={key:0},ne={class:"popup"},re={class:"popup__header"},ie=le((()=>(0,s._)("h4",{class:"popup__label"},"Создать новый список",-1))),ce={class:"popup__body"},ue={class:"body__wrapper"},de={class:"line"},pe=le((()=>(0,s._)("p",{class:"tip"},"Совет: выбирайте цвета которые будут заметны на светлом/темном фоне",-1))),ve={class:"popup__btns"},he="2px solid #706767",fe="auto";var me={__name:"CreateNewListPopup",props:{is_popup:Boolean},emits:["close"],setup(e,{emit:t}){const a=e,l=(0,o.iH)(""),i=(0,o.iH)("#e0e0e0"),c=(0,r.S)(),u=e=>{l.value=e},d=e=>{i.value=e},p=async()=>{t("close"),c.addNewList({id:null,name:l.value.trim(),color:i.value,count_of_active_tasks:0}),await c.saveList({name:l.value.trim(),color:i.value,user_id:c.user.id}),l.value="",i.value="#e0e0e0"};return(e,o)=>((0,s.wg)(),(0,s.j4)(Y.uT,{mode:"out-in",name:"fade"},{default:(0,s.w5)((()=>[a.is_popup?((0,s.wg)(),(0,s.iD)("div",oe,[(0,s._)("div",{class:"blur",onClick:o[0]||(o[0]=e=>t("close"))}),(0,s._)("div",ne,[(0,s._)("div",re,[ie,(0,s.Wm)(V,{cl:"close",onClick:o[1]||(o[1]=(0,Y.iM)((e=>t("close")),["prevent"]))})]),(0,s._)("div",ce,[(0,s._)("div",ue,[(0,s.Wm)(ee,{name:l.value,onUnderDeroch:u,width:fe,border:he,placeholder:"Имя списка"},null,8,["name"]),(0,s._)("div",de,[(0,s.Uk)(" Цвет: "),(0,s.Wm)(se,{color:i.value,onOnDroch:d},null,8,["color"])]),pe]),(0,s._)("p",{class:"big-a",style:(0,n.j5)({color:i.value})},"A",4)]),(0,s._)("div",ve,[(0,s._)("button",{class:"popup__btn cancel",onClick:o[2]||(o[2]=e=>t("close"))},"Отмена"),(0,s._)("button",{class:"popup__btn add",onClick:p},"Создать")])])])):(0,s.kq)("",!0)])),_:1}))}};const ge=(0,b.Z)(me,[["__scopeId","data-v-3da30920"]]);var _e=ge;const be={class:"big-menu"},ye={class:"big-menu__wrapper"};var we={__name:"TheBigMenu",setup(e){const t=(0,o.iH)(!1);return(e,a)=>((0,s.wg)(),(0,s.iD)("div",be,[(0,s._)("div",ye,[(0,s.Wm)(l.Z),(0,s.Wm)(E),(0,s.Wm)(M),(0,s.Wm)(P)]),(0,s._)("button",{class:"new-personal-list-btn",onClick:a[0]||(a[0]=e=>t.value=!0)},"Новый список"),((0,s.wg)(),(0,s.j4)(s.lR,{to:"body"},[(0,s.Wm)(_e,{is_popup:t.value,onClose:a[1]||(a[1]=e=>t.value=!1)},null,8,["is_popup"])]))]))}};const ke=(0,b.Z)(we,[["__scopeId","data-v-5b567e38"]]);var Le=ke,Se=a(8765);const Te=["placeholder"];var Ee={__name:"SearchInputText",props:{placeholder:String,width:String,border:String},setup(e){const t=(0,Se.J)(),a=(0,o.iH)(""),l=()=>{t.findTasks(a.value)};return(t,o)=>(0,s.wy)(((0,s.wg)(),(0,s.iD)("input",{type:"text",class:"searcher","onUpdate:modelValue":o[0]||(o[0]=e=>a.value=e),placeholder:e.placeholder,style:(0,n.j5)({width:e.width,borderBottom:e.border}),onKeyup:l,ref:"searchInput"},null,44,Te)),[[Y.nr,a.value]])}};const je=(0,b.Z)(Ee,[["__scopeId","data-v-100ccbfe"]]);var Ce=je,$e=a(3746);const De={class:"top-bar"},xe={key:0,class:"top-bar__container"},He={key:1,class:"top-bar__container vide"};var Ie={__name:"TheTopBar",emits:["newTask"],setup(e,{emit:t}){const a=(0,h.yj)(),l=(0,h.tv)(),n=(0,o.iH)(["person","plus","loup","close"]),r=(0,o.iH)(!1),i=(0,Se.J)(),c=((0,$e.F)(),()=>{r.value=!0,l.push({name:"search"})}),u=()=>{r.value=!1,l.push({name:"intro"})};return(e,t)=>{const l=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",De,[(0,s.Wm)(Y.uT,{mode:"out-in",name:"fade"},{default:(0,s.w5)((()=>[r.value?((0,s.wg)(),(0,s.iD)("div",He,[(0,s.Wm)(Ce,{placeholder:"Поиск по задачам",isSearchMode:r.value},null,8,["isSearchMode"])])):((0,s.wg)(),(0,s.iD)("div",xe,[(0,s.Wm)(l,{to:"/workspace/user"},{default:(0,s.w5)((()=>[(0,s.Wm)(V,{cl:n.value[0]},null,8,["cl"])])),_:1}),(0,o.SU)(a).params.id_list?((0,s.wg)(),(0,s.j4)(V,{key:0,cl:n.value[1],onMouseup:(0,o.SU)(i).addNewTask},null,8,["cl","onMouseup"])):(0,s.kq)("",!0)]))])),_:1}),(0,s.Wm)(Y.uT,{mode:"out-in",name:"fade"},{default:(0,s.w5)((()=>[r.value?((0,s.wg)(),(0,s.j4)(V,{key:1,cl:n.value[3],onClick:u},null,8,["cl"])):((0,s.wg)(),(0,s.j4)(V,{key:0,cl:n.value[2],onClick:c},null,8,["cl"]))])),_:1})])}}};const Ae=Ie;var Ue=Ae;const We={class:"tasker"};var Me={__name:"TheTasker",setup(e){const t=(0,h.yj)();return(e,a)=>{const l=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)("div",We,[(0,s.Wm)(Ue),(0,o.SU)(t).params.name?((0,s.wg)(),(0,s.j4)(l,{key:(0,o.SU)(t).params.name})):(0,o.SU)(t).params.id_list?((0,s.wg)(),(0,s.j4)(l,{key:(0,o.SU)(t).params.id_list})):(0,o.SU)(t).params.id_tag?((0,s.wg)(),(0,s.j4)(l,{key:(0,o.SU)(t).params.id_tag})):((0,s.wg)(),(0,s.j4)(l,{key:(0,o.SU)(t).path}))])}}};const Be=Me;var qe=Be;const Ze={class:"workspace"};var Oe={__name:"WorkspaceView",setup(e){(0,$e.F)();return(e,t)=>((0,s.wg)(),(0,s.iD)("div",Ze,[(0,s.Wm)(Le),(0,s.Wm)(qe)]))}};const Ne=(0,b.Z)(Oe,[["__scopeId","data-v-5e53fd2b"]]);var Re=Ne}}]);
//# sourceMappingURL=358.13b09e18.js.map