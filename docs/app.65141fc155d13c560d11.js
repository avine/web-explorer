!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/web-explorer/",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(3);function r(e){const t=document.createElement("div");return t.innerHTML=e,t.removeChild(t.firstChild)}function i(e){const t=document.createElement("script");return[].forEach.call(e.attributes,e=>t.setAttribute(e.name,e.value)),t.innerHTML=e.innerHTML,t}t.querySelectorAll=function(e,t){return[].slice.call((t||document).querySelectorAll(e))},t.getParentNodes=function(e,t){const n=[];let a=e.parentNode;for(;a&&a!==t&&a!==document;)n.unshift(a),a=a.parentNode;return n},t.createNode=r,t.wrapNode=function(e,t=""){const n=document.createElement("div");return t&&n.classList.add(t),e.parentNode&&e.parentNode.insertBefore(n,e),n.appendChild(e),n},t.insertAfter=function(e,t){t.parentNode&&(t.nextSibling?t.parentNode.insertBefore(e,t.nextSibling):t.parentNode.appendChild(e))},t.makeScriptAlive=i,t.insertHtml=function(e,t){return t.innerHTML=e,t.querySelectorAll("script").forEach(e=>{!e.hasAttribute("app-script-defer")&&e.parentNode&&(e.parentNode.insertBefore(i(e),e),e.parentNode.removeChild(e))}),t.innerHTML},t.isScriptDeferred=function(e){return e.hasAttribute("app-script-defer")},t.resolveUrl=function(e){if(null==e)return;const t=document.createElement("a");return t.setAttribute("href",e),t.href},t.toggleNode=function(e,t){let n,i=parseInt(e.getAttribute("app-toggle-id"),10);return i||(i=a.getId(),e.setAttribute("app-toggle-id",i+""),e.parentNode||!t)?(e.parentNode?(n=r(`<script type="placeholder" app-toggle-id="${i}">`),e.parentNode.insertBefore(n,e),e.parentNode.removeChild(e)):((n=document.querySelector(`[app-toggle-id="${i}"]`)).parentNode.insertBefore(e,n),n.parentNode.removeChild(n)),i):(t.appendChild(e),i)},t.getAction=function(e,t,n){t.classList.add("app-action");const a={link:t,active:!1,handler:r=>{r&&r.preventDefault(),a.active=t.classList.toggle("app-action--active"),sessionStorage.setItem(e,a.active+""),n()}};return"true"===sessionStorage.getItem(e)&&a.handler(),t.addEventListener("click",a.handler),a}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(4),r=n(0),i=n(5);let o,s;var l;function c(){const e=document.querySelector("base"),t=e.getAttribute("href").replace(/\/$/,""),n=r.resolveUrl(e.href);return{base:t,root:n,index:r.resolveUrl(`${n}index.html`),home:r.resolveUrl(`${n}${a.FRONT_PAGES_FOLDER}/index.html`)}}function u(e){const t=document.createElement("a");if(t.setAttribute("href",e),"/"!==t.pathname){const{base:e}=c();t.pathname=t.pathname.replace(new RegExp(`^${e}`),e+a.SPA_URL_STATE_PREFIX)}return t.href}function d(e){const t=document.createElement("a");t.setAttribute("href",e);const{base:n}=c();return t.pathname=t.pathname.replace(new RegExp(`^${n+a.SPA_URL_STATE_PREFIX}`),n),t.href}function p(e,t){const n=new CustomEvent(e,{detail:{appUrl:t}});window.dispatchEvent(n)}function g(e=!0){o.classList[e?"add":"remove"]("app-content--active")}function h(e,t){const n=document.createElement("a"),a=document.createElement("a");return n.setAttribute("href",e),a.setAttribute("href",t),n.pathname=a.pathname,n.href}!function(e){e.START="appNavigateStart",e.CANCEL="appNavigateCancel",e.END="appNavigateEnd"}(l=t.ON_NAVIGATE||(t.ON_NAVIGATE={}));let f="";function m(e){f&&p(l.CANCEL,f);const t=function(e){const t=document.createElement("a");return t.setAttribute("href",e),t.href=t.pathname,t.href}(e);return t!==s.home&&t!==s.index||function(e){window.history.replaceState({appUrl:e},"",u(e))}(h(e,s.root)),t!==s.index&&t!==s.root||(e=h(e,s.home)),f=e,p(l.START,e),g(!1),i.fetchContent(e).then(t=>{e===f&&(r.insertHtml(t,o),f="",p(l.END,e),g())})}function v(e){e.state&&e.state.appUrl&&m(e.state.appUrl)}function b(e){let t=e.target;try{const e=t.closest("[app-link]");e&&(t=e)}catch(e){}if(t.hasAttribute("app-link")){const n=t.getAttribute("app-link");let a;n&&(a=r.resolveUrl(n)),"a"===t.nodeName.toLowerCase()&&(e.preventDefault(),!n&&t.href&&(a=t.href)),a&&a!==d(window.location.href)&&(!function(e){window.history.pushState({appUrl:e},"",u(e))}(a),m(a))}}function y(e){return r.querySelectorAll("[app-link]",e).map(e=>{let t=r.resolveUrl(e.getAttribute("app-link")||e.href);return t!==s.home&&t!==s.index||(t=s.root),{element:e,url:t,active:t===d(window.location.href)}})}function w(){y().forEach(e=>e.element.classList[e.active?"add":"remove"]("app-link__active"))}t.navigate=m,t.getActiveLinks=function(e){return y(e).filter(e=>e.active).map(e=>e.element)},t.updateActiveLinks=w;const _=w;t.initRouter=function(){o=document.querySelector("[app-content]"),s=c()},t.bootstrapRouter=function(){m(d(window.location.href)),window.addEventListener("popstate",v),window.addEventListener("click",b),window.addEventListener(l.END,_)}},function(e,t,n){(function(t){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},a=function(){var e=/\blang(?:uage)?-([\w-]+)\b/i,t=0,a=n.Prism={manual:n.Prism&&n.Prism.manual,disableWorkerMessageHandler:n.Prism&&n.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof r?new r(e.type,a.util.encode(e.content),e.alias):"Array"===a.util.type(e)?e.map(a.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e,t){var n=a.util.type(e);switch(t=t||{},n){case"Object":if(t[a.util.objId(e)])return t[a.util.objId(e)];var r={};for(var i in t[a.util.objId(e)]=r,e)e.hasOwnProperty(i)&&(r[i]=a.util.clone(e[i],t));return r;case"Array":if(t[a.util.objId(e)])return t[a.util.objId(e)];r=[];return t[a.util.objId(e)]=r,e.forEach(function(e,n){r[n]=a.util.clone(e,t)}),r}return e}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){var i=(r=r||a.languages)[e];if(2==arguments.length){for(var o in n=arguments[1])n.hasOwnProperty(o)&&(i[o]=n[o]);return i}var s={};for(var l in i)if(i.hasOwnProperty(l)){if(l==t)for(var o in n)n.hasOwnProperty(o)&&(s[o]=n[o]);s[l]=i[l]}return a.languages.DFS(a.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=s)}),r[e]=s},DFS:function(e,t,n,r){for(var i in r=r||{},e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],n||i),"Object"!==a.util.type(e[i])||r[a.util.objId(e[i])]?"Array"!==a.util.type(e[i])||r[a.util.objId(e[i])]||(r[a.util.objId(e[i])]=!0,a.languages.DFS(e[i],t,i,r)):(r[a.util.objId(e[i])]=!0,a.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){a.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",r);for(var i,o=r.elements||e.querySelectorAll(r.selector),s=0;i=o[s++];)a.highlightElement(i,!0===t,r.callback)},highlightElement:function(t,r,i){for(var o,s,l=t;l&&!e.test(l.className);)l=l.parentNode;l&&(o=(l.className.match(e)||[,""])[1].toLowerCase(),s=a.languages[o]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,t.parentNode&&(l=t.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+o));var c={element:t,language:o,grammar:s,code:t.textContent};if(a.hooks.run("before-sanity-check",c),!c.code||!c.grammar)return c.code&&(a.hooks.run("before-highlight",c),c.element.textContent=c.code,a.hooks.run("after-highlight",c)),void a.hooks.run("complete",c);if(a.hooks.run("before-highlight",c),r&&n.Worker){var u=new Worker(a.filename);u.onmessage=function(e){c.highlightedCode=e.data,a.hooks.run("before-insert",c),c.element.innerHTML=c.highlightedCode,i&&i.call(c.element),a.hooks.run("after-highlight",c),a.hooks.run("complete",c)},u.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else c.highlightedCode=a.highlight(c.code,c.grammar,c.language),a.hooks.run("before-insert",c),c.element.innerHTML=c.highlightedCode,i&&i.call(t),a.hooks.run("after-highlight",c),a.hooks.run("complete",c)},highlight:function(e,t,n){var i={code:e,grammar:t,language:n};return a.hooks.run("before-tokenize",i),i.tokens=a.tokenize(i.code,i.grammar),a.hooks.run("after-tokenize",i),r.stringify(a.util.encode(i.tokens),i.language)},matchGrammar:function(e,t,n,r,i,o,s){var l=a.Token;for(var c in n)if(n.hasOwnProperty(c)&&n[c]){if(c==s)return;var u=n[c];u="Array"===a.util.type(u)?u:[u];for(var d=0;d<u.length;++d){var p=u[d],g=p.inside,h=!!p.lookbehind,f=!!p.greedy,m=0,v=p.alias;if(f&&!p.pattern.global){var b=p.pattern.toString().match(/[imuy]*$/)[0];p.pattern=RegExp(p.pattern.source,b+"g")}p=p.pattern||p;for(var y=r,w=i;y<t.length;w+=t[y].length,++y){var _=t[y];if(t.length>e.length)return;if(!(_ instanceof l)){if(f&&y!=t.length-1){if(p.lastIndex=w,!(L=p.exec(e)))break;for(var k=L.index+(h?L[1].length:0),S=L.index+L[0].length,A=y,N=w,E=t.length;A<E&&(N<S||!t[A].type&&!t[A-1].greedy);++A)k>=(N+=t[A].length)&&(++y,w=N);if(t[y]instanceof l)continue;x=A-y,_=e.slice(w,N),L.index-=w}else{p.lastIndex=0;var L=p.exec(_),x=1}if(L){h&&(m=L[1]?L[1].length:0);S=(k=L.index+m)+(L=L[0].slice(m)).length;var C=_.slice(0,k),j=_.slice(S),P=[y,x];C&&(++y,w+=C.length,P.push(C));var T=new l(c,g?a.tokenize(L,g):L,v,L,f);if(P.push(T),j&&P.push(j),Array.prototype.splice.apply(t,P),1!=x&&a.matchGrammar(e,t,n,y,w,!0,c),o)break}else if(o)break}}}}},tokenize:function(e,t,n){var r=[e],i=t.rest;if(i){for(var o in i)t[o]=i[o];delete t.rest}return a.matchGrammar(e,r,t,0,0,!1),r},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var r,i=0;r=n[i++];)r(t)}}},r=a.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r};if(r.stringify=function(e,t,n){if("string"==typeof e)return e;if("Array"===a.util.type(e))return e.map(function(n){return r.stringify(n,t,e)}).join("");var i={type:e.type,content:r.stringify(e.content,t,n),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:n};if(e.alias){var o="Array"===a.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,o)}a.hooks.run("wrap",i);var s=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(s?" "+s:"")+">"+i.content+"</"+i.tag+">"},!n.document)return n.addEventListener?(a.disableWorkerMessageHandler||n.addEventListener("message",function(e){var t=JSON.parse(e.data),r=t.language,i=t.code,o=t.immediateClose;n.postMessage(a.highlight(i,a.languages[r],r)),o&&n.close()},!1),n.Prism):n.Prism;var i=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return i&&(a.filename=i.src,a.manual||i.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(a.highlightAll):window.setTimeout(a.highlightAll,16):document.addEventListener("DOMContentLoaded",a.highlightAll))),n.Prism}();e.exports&&(e.exports=a),void 0!==t&&(t.Prism=a),a.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/(^|[^\\])["']/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},a.languages.markup.tag.inside["attr-value"].inside.entity=a.languages.markup.entity,a.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),a.languages.xml=a.languages.markup,a.languages.html=a.languages.markup,a.languages.mathml=a.languages.markup,a.languages.svg=a.languages.markup,a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},a.languages.css.atrule.inside.rest=a.languages.css,a.languages.markup&&(a.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:a.languages.css,alias:"language-css",greedy:!0}}),a.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:a.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:a.languages.css}},alias:"language-css"}},a.languages.markup.tag)),a.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},a.languages.javascript=a.languages.extend("clike",{keyword:/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,function:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),a.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"},constant:/\b[A-Z][A-Z\d_]*\b/}),a.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\${[^}]+}/,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}}}),a.languages.javascript["template-string"].inside.interpolation.inside.rest=a.languages.javascript,a.languages.markup&&a.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:a.languages.javascript,alias:"language-javascript",greedy:!0}}),a.languages.js=a.languages.javascript,"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,r=t.getAttribute("data-src"),i=t,o=/\blang(?:uage)?-([\w-]+)\b/i;i&&!o.test(i.className);)i=i.parentNode;if(i&&(n=(t.className.match(o)||[,""])[1]),!n){var s=(r.match(/\.(\w+)$/)||[,""])[1];n=e[s]||s}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var c=new XMLHttpRequest;c.open("GET",r,!0),c.onreadystatechange=function(){4==c.readyState&&(c.status<400&&c.responseText?(l.textContent=c.responseText,a.highlightElement(l)):c.status>=400?l.textContent="✖ Error "+c.status+" while fetching file: "+c.statusText:l.textContent="✖ Error: File does not exist or is empty")},c.send(null)}),a.plugins.toolbar&&a.plugins.toolbar.registerButton("download-file",function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&t.hasAttribute("data-src")&&t.hasAttribute("data-download-link")){var n=t.getAttribute("data-src"),a=document.createElement("a");return a.textContent=t.getAttribute("data-download-link-label")||"Download",a.setAttribute("download",""),a.href=n,a}})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}).call(this,n(8))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let a=0;t.getId=function(){return a+=1},t.formatCode=function(e){let t=e.split("\n");const n=t.reduce((e,t)=>{if(t){const n=(t.match(/^[\s]+/)||[""])[0].length;e=-1===e?n:Math.min(e,n)}return e},-1);return n>0&&(t=t.map(e=>e.substr(n))),t.join("\n").trim().replace(/\n{2,}/g,"\n\n")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SPA_URL_STATE_PREFIX="/content",t.FRONT_PAGES_FOLDER="pages",t.BACK_HOST="127.0.0.1",t.BACK_PORT=3e3},function(e,t,n){"use strict";var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))(function(r,i){function o(e){try{l(a.next(e))}catch(e){i(e)}}function s(e){try{l(a.throw(e))}catch(e){i(e)}}function l(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(o,s)}l((a=a.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(4),i=n(0),o='<p class="app-content__error">\n  <br>\n  <i class="fas fa-3x fa-exclamation"></i>\n  <br>\n  <br>\n  No internet access\n</p>';function s(){return a(this,void 0,void 0,function*(){return(yield fetch(i.resolveUrl(`./${r.FRONT_PAGES_FOLDER}/error404.html`))).text()})}t.fetchContent404=s,t.fetchContent=function(e){return a(this,void 0,void 0,function*(){try{const t=yield fetch(e);return 200!==t.status?(yield s()).replace("{{url}}",e):t.text()}catch(e){return o}})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(7),n(2),n(9),n(10)},function(e,t,n){},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(11),r=n(1),i=n(12),o=n(14),s=n(15),l=n(16);s.bootstrapServiceWorker(!0),window.addEventListener("DOMContentLoaded",()=>{r.initRouter(),i.bootstrapSidebar({hidden:!0}),i.bootstrapToggleSidebar(),o.bootstrapSpinner(),l.bootstrapToolbox(),a.bootstrapPlayground(),r.bootstrapRouter()})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),r=n(0),i=n(1),o=n(3);function s(e){return`<i class="app-playground__icon ${e}"></i>`}function l(e){let t="";switch(e){case"js":t="fab fa-js";break;case"css":t="fab fa-css3";break;case"html":t="fab fa-html5";break;case"log":t="fa fa-trash-alt"}return s(t)}function c(e){return t=`${e} ${l(e)}`,r.createNode(`<span class="app-playground__action app-playground__action--disabled">${t}</span>`);var t}function u(e,t,n=!1){const a=r.createNode(`<a href="#" class="app-playground__action">${e} ${l(e)}</a>`);return n&&t.classList.add("app-playground--disabled"),a.addEventListener("click",e=>{e.preventDefault(),n?(t.classList.remove("app-playground--disabled"),a.classList.add("app-playground__action--disabled")):t.classList.toggle("app-playground--disabled")}),a}function d(e,t){const n=r.createNode('<pre class="app-playground"></pre>'),i=r.createNode('<code class="app-playground__code"></code>'),s=function(e,t){switch(t){case"js":return r.isScriptDeferred(e);case"css":return!0;case"html":return!1}}(e,t)?u(t,n,"js"===t):c(t),l=o.formatCode(e.innerHTML);i.innerHTML=a.highlight(l,a.languages[t],a.languages[t]),i.addEventListener("dblclick",()=>i.classList.toggle("app-playground__code--reduce")),n.appendChild(i),n.appendChild(s);let d=null;const p=e.getAttribute("app-playground")||"";return d=document.querySelector(`[app-playground-anchor="${p}"]`),r.insertAfter(n,d||e),{wrap:n,code:i,action:s}}function p(e){const t=e.nodeName.toLowerCase(),n="script"===t?"js":"style"===t?"css":"html",a=d(e,n);switch(n){case"js":!function(e,t){r.isScriptDeferred(e)&&t.addEventListener("click",()=>{e.parentNode&&(e.parentNode.insertBefore(r.makeScriptAlive(e),e),e.parentNode.removeChild(e))})}(e,a.action);break;case"css":!function(e,t){t.addEventListener("click",t=>{e.disabled=!e.disabled})}(e,a.action);break;case"html":!function(e,t){e.classList.add("app-playground"),e.classList.add("app-playground--demo");const n=r.wrapNode(e,"app-playground-demo"),a=e.getAttribute("app-playground")||"demo",i=s("fa fa-coffee"),o=r.createNode(`<a href="#" class="app-playground__action">${a} ${i}</a>`);o.addEventListener("click",e=>{e.preventDefault(),n.classList.toggle("app-playground-demo--fixed")}),e.appendChild(o)}(e,a.action)}}function g(){document.querySelectorAll("[app-content] [app-playground]").forEach(p)}window.Playground=window.Playground||{},window.Playground.log=((e,t="")=>{const n=document.querySelector(`[app-content] [app-playground="${t}"]`);if(n){let t=n.nextElementSibling;if(!t||!t.classList.contains("app-playground--log")){const e=u("log",t=r.createNode('<div class="app-playground app-playground--log"><div class="app-playground__log"></div></div>'));e.addEventListener("click",()=>{t&&t.parentNode&&t.parentNode.removeChild(t)}),t.appendChild(e),r.insertAfter(t,n)}t.firstElementChild&&t.firstElementChild.appendChild(r.createNode(`<samp class="app-playground__log-item">${e}</samp>`))}}),t.bootstrapPlayground=function(){window.addEventListener(i.ON_NAVIGATE.END,g)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(4),r=n(0),i=n(5),o=n(13),s=n(1);function l(){const e=document.querySelector(".app-grid__wrap");e&&e.classList.toggle("app-grid__wrap--sidebar-hidden")}t.bootstrapSidebar=function({hidden:e=!1}){const t=document.querySelector(".app-grid__wrap");t&&e&&t.classList.add("app-grid__wrap--sidebar-hidden");const n=document.querySelector("[app-sidebar]");n&&i.fetchContent(`./${a.FRONT_PAGES_FOLDER}/sidebar.html`).then(e=>{r.insertHtml(e,n),o.bootstrapMenu(n),s.updateActiveLinks()})},t.toggleSidebar=l,t.bootstrapToggleSidebar=function(){const e=document.querySelector("[app-sidebar-toggle]");e&&r.getAction("view_sidebar",e,l)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(0),r=n(1);class i{constructor(e){this.menu=e,this.closeChilds(e),e.addEventListener("click",this.clickHandler.bind(this)),this.openActiveLinks(),this.activeLinksHandler=(e=>this.openActiveLinks()),this.init()}init(){window.addEventListener(r.ON_NAVIGATE.END,this.activeLinksHandler)}destroy(){window.removeEventListener(r.ON_NAVIGATE.END,this.activeLinksHandler)}openActiveLinks(){r.getActiveLinks(this.menu).forEach(e=>this.openParents(e))}clickHandler(e){const t=e.target;t&&t.classList.contains("app-menu__header")&&this.toggleMenu(t)}toggleMenu(e){if(!e.classList.contains("app-menu__header--closed")){const t=e.nextElementSibling;t&&this.closeChilds(t)}e.classList.toggle("app-menu__header--closed")}closeChilds(e){e.querySelectorAll(".app-menu__header").forEach(e=>e.classList.add("app-menu__header--closed"))}openParents(e){a.getParentNodes(e,this.menu).forEach(e=>{if(e.classList.contains("app-menu")){const t=e.previousElementSibling;t&&t.classList.contains("app-menu__header")&&t.classList.remove("app-menu__header--closed")}})}}t.Menu=i,t.bootstrapMenu=function(e){e.querySelectorAll("[app-menu]").forEach(e=>new i(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(0),r=n(1);class i{constructor(e,t={delay:1e3,duration:400}){this.element=e,this.transition=t,this.spinner=a.createNode('<div class="app-spinner"><i class="app-spinner__content fas fa-3x fa-spinner fa-pulse"></i></div>'),this.spinner.style.transition=`opacity ${this.transition.duration}ms ease`}show(){this.pendingHide&&this.cancelHide(),this.pendingShow||this.scheduleShow()}hide(){this.pendingShow&&this.cancelShow(),this.pendingHide||this.scheduleHide()}addSpinner(){this.element.appendChild(this.spinner)}removeSpinner(){this.spinner.parentNode===this.element&&this.element.removeChild(this.spinner)}scheduleShow(){this.addSpinner(),this.pendingShow=setTimeout(()=>{this.pendingShow=null,this.spinner.classList.add("app-spinner--show")},this.transition.delay)}cancelShow(){clearTimeout(this.pendingShow),this.pendingShow=null,this.removeSpinner()}scheduleHide(){this.spinner.classList.remove("app-spinner--show"),this.pendingHide=setTimeout(()=>{this.pendingHide=null,this.removeSpinner()},this.transition.duration)}cancelHide(){clearTimeout(this.pendingHide),this.pendingHide=null}}t.Spinner=i,t.bootstrapSpinner=function(){const e=new i(document.querySelector("[app-spinner]"));window.addEventListener(r.ON_NAVIGATE.START,()=>{e.show()}),window.addEventListener(r.ON_NAVIGATE.END,()=>{e.hide()})}},function(e,t,n){"use strict";function a(){navigator.serviceWorker.register("./service-worker.js").then(()=>console.log("Service Worker Registered"))}function r(){navigator.serviceWorker.getRegistrations().then(e=>{for(const t of e)t.unregister(),console.log("Service Worker Unregistered")})}Object.defineProperty(t,"__esModule",{value:!0}),t.register=a,t.unregister=r,t.bootstrapServiceWorker=function(e=!0){"serviceWorker"in navigator&&(e?a():r())}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),r=n(0),i=n(1),o=n(3);function s(e,t="#"){return r.createNode(`<a href="${t}"><i class="fas fa-${e} fa-fw fa-lg"></i></a>`)}function l(){const e=document.querySelector("[app-content]");e.classList.add("app-code__source");const t=r.wrapNode(e,"app-code"),n=r.createNode('<pre class="app-code__target"><code></code></pre>'),l=r.getAction("view_code",s("code"),()=>{t.classList.toggle("app-code--active"),r.toggleNode(n,t)});return window.addEventListener(i.ON_NAVIGATE.END,()=>{n.firstChild.innerHTML=a.highlight(function(e){const t=e.cloneNode(!0);return t.querySelectorAll("[app-code-hidden]").forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)}),o.formatCode(t.innerHTML)}(e),a.languages.html,a.languages.html)}),l.link}t.bootstrapToolbox=function(){const e=document.querySelector("[app-toolbox]");e&&(e.classList.add("app-toolbox"),e.appendChild(function(){const e=document.querySelector("html");return r.getAction("toggle_grid_fixed",s("arrows-alt-v"),()=>{e.classList.toggle("app-grid--fixed")}).link}()),e.appendChild(function(){const e=document.querySelector("html");return r.getAction("toggle_settings_dark",s("image"),()=>{e.classList.toggle("app-settings--dark")}).link}()),e.appendChild(l()))}}]);
//# sourceMappingURL=app.65141fc155d13c560d11.js.map