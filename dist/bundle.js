(()=>{"use strict";const t=document.querySelector("#search-input"),e=document.querySelector(".search-color"),n=(document.querySelector("#search-image"),document.querySelector("#palette-type")),r=document.querySelector("#type-text"),o=document.querySelector("#palette-count"),c=document.querySelector("#random-btn"),u=document.querySelector("#palette"),l=document.querySelector("#related");let a="skyblue",s="monochromatic",d="6";function i(t,e){let n=d;const r=function(t){let e;if(h(t)){let n=document.createElement("div");n.style.color=t,document.body.appendChild(n);let r=window.getComputedStyle(n,null).getPropertyValue("color");document.body.removeChild(n),r=function(t){return t.replace("rgb(","").replace(")","").split(",")}(r),e=function(t){let e=t[0]/255,n=t[1]/255,r=t[2]/255,o=Math.min(e,n,r),c=Math.max(e,n,r),u=c-o,l=0,a=0,s=(o+c)/2;return 0===u?(l=0,a=0):l=c===e?(n-r)/u%6:c===n?(r-e)/u+2:(e-n)/u+4,l=Math.round(60*l),l<0&&(l+=360),0!==u&&(a=Math.round(u/(1-Math.abs(2*s-1))*100)),s=Math.round(100*s),[l,a,s]}(r)}return e}(a);if(!r)return;let o=[];e.innerHTML="",o=function(t,e,n){switch(e){case"analogous":return function(t,e){const n=[],[r,o,c]=t;for(let t=0;t<e;t++){let e=r+30*t;e>360&&(e-=360),n.push([e,o,c])}return n}(t,n);case"monochromatic":return function(t,e){const n=[];let[r,o,c]=t;for(let t=0;t<e;t++){let e=c=10*t;e>100&&(e-=100),n.push([r,o,e])}return n}(t,n);case"triadic":return function(t,e){const n=[];let[r,o,c]=t;for(let t=0;t<e;t++){let e=r+120*t;e>360&&(e-=360),n.push([e,o,c])}return n}(t,n);case"compound":return function(t,e){const n=[];let[r,o,c]=t;for(let t=0;t<e;t++){let e=r+150*t;e>360&&(e-=360),n.push([e,o,c])}return n}(t,n);case"shades":return function(t,e){const n=[];let[r,o,c]=t;for(let t=0;t<e;t++){let e=o+10*t;e>100&&(e-=100),n.push([r,e,c])}return n}(t,n);case"tetradic":return function(t,e){const n=[];let[r,o,c]=t;for(let t=0;t<e;t++){let e=r+90*t;e>360&&(e-=360),n.push([e,o,c])}return n}(t,n);case"square":return function(t,e){const n=[];let[r,o,c]=t;for(let t=0;t<e;t++){let e=r+60*t;e>360&&(e-=360),n.push([e,o,c])}return n}(t,n);case"related":return function(t,e){const n=[],[r,o,c]=t;n.push([r,(o+20)%100,c]),n.push([r,(o-20)%100,c]),n.push([r,o,(c+20)%100]),n.push([r,o,(c-20)%100]),n.push([(r+20)%360,o,c]),n.push([(r-20)%360,o,c]);for(let t=n.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[n[t],n[e]]=[n[e],n[t]]}return n}(t)}}(r,t,n),o.forEach((t=>{t=function(t){let e=t[0],n=t[1],r=t[2];r/=100;const o=n*Math.min(r,1-r)/100,c=t=>{const n=(t+e/30)%12,c=r-o*Math.max(Math.min(n-3,9-n,1),-1);return Math.round(255*c).toString(16).padStart(2,"0")};return`#${c(0)}${c(8)}${c(4)}`}(t);const n=document.createElement("div");n.classList.add("color"),n.style.backgroundColor=t,n.innerHTML=`\n        <div class="overlay">\n          <div class="icons">\n            <div class="copy-color">\n                <i class="far fa-copy"></i>\n            </div>\n            <div class="generate-palette">\n                <i class="fas fa-palette"></i>\n            </div>\n          </div>\n            <div class="code">${t}</div>\n        </div>\n    `,e.appendChild(n)}))}function h(t){return CSS.supports("color",t)}i(s,u),i("related",l),t.addEventListener("keyup",(t=>{const n=t.target.value;h(n)&&(e.style.backgroundColor=n,a=n,i(s,u),i("related",l))})),n.addEventListener("change",(t=>{const e=t.target.value;s=e,r.textContent=e+"Palette",i(s,u)})),o.addEventListener("change",(t=>{const e=t.target.value;d=e,i(s,u)})),c.addEventListener("click",(n=>{const r=function(){let t="#";for(let e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}();t.value=r,e.style.backgroundColor=r,a=r,i(s,u),i("related",l)}))})();