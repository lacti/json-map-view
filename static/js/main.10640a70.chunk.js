(window["webpackJsonpjson-map-view"]=window["webpackJsonpjson-map-view"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(12)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(4),c=n.n(o),u=(n(10),n(1)),l=(n(11),n(2)),i=function(e,t,n){var r=function(e){return function(t,n){if(!t)return{};var r=e[n];if(!r)return t;for(var a={},o=0,c=Object.keys(t);o<c.length;o++){var u=c[o];(u.includes(r)||"string"!==typeof t[u]&&Object.keys(t[u]).some(function(e){return e.toLowerCase().includes(r.toLowerCase())}))&&(a[u]=t[u])}return a}}(n);return function(n){for(var a=r(e,0),o=0;o<n;o++){var c=t[o];if(!c)return{};if(!(a=r(s(a,c),o+1)))return{}}return a}},s=function(e,t){return f(t.filter(function(t){return!!e&&!!e[t]}).map(function(t){return[t,e[t]]}),t.length>1)},f=function e(t,n){var r={},a=d(t.map(function(e){var t=Object(u.a)(e,2);t[0];return t[1]}).flatMap(function(e){return Object.keys(e)})),o=!0,c=!1,l=void 0;try{for(var i,s=function(){var a=i.value,o=t.filter(function(e){var t=Object(u.a)(e,2)[1];return!!t[a]&&"string"!==typeof t[a]}).map(function(e){var t=Object(u.a)(e,2);return[t[0],t[1][a]]});o.length>0&&(r[a]=e(o,n));var c=t.filter(function(e){var t=Object(u.a)(e,2)[1];return!!t[a]&&"string"===typeof t[a]}).map(function(e){var t=Object(u.a)(e,2);return[t[0],t[1][a]]});1===c.length?r[n?m(a,c[0][0]):a]=c[0][1]:c.length>1&&c.forEach(function(e){var t=Object(u.a)(e,2),n=t[0],o=t[1];return r[m(a,n)]=o})},f=a[Symbol.iterator]();!(o=(i=f.next()).done);o=!0)s()}catch(p){c=!0,l=p}finally{try{o||null==f.return||f.return()}finally{if(c)throw l}}return r},m=function(e,t){return[e,t].join("$$")},d=function(e){return Object(l.a)(new Set(e||[]))},p=function(e){var t=e.placeholder,n=e.onKeyUp;return a.a.createElement("input",{type:"text",onKeyUp:n,placeholder:t})},y=function(e){var t=e.nodeKey;return a.a.createElement(a.a.Fragment,null,t.split(" ").map(function(e,t){return 0===t?a.a.createElement("span",{key:t,className:"node-text"},e):a.a.createElement(a.a.Fragment,{key:t},a.a.createElement("br",null),a.a.createElement("span",{className:"node-text"},e))}))},g=function(e){var t=e.nodeKey,n=e.nodeValue,r=e.onNodeKeyToggled,o=Object.keys(n).length;return a.a.createElement("button",{className:"selected",onClick:function(){return r(t)},title:"".concat(t," (").concat(o,")")},a.a.createElement(y,{nodeKey:t}),a.a.createElement("span",{className:"count"},"(",o,")"))},v=function(e){var t=e.nodeKey,n=e.nodeValue,r=e.onNodeKeyToggled,o=Object.keys(n).length;return a.a.createElement("button",{onClick:function(){return r(t)},title:"".concat(t," (").concat(o,")")},a.a.createElement(y,{nodeKey:t}),a.a.createElement("span",{className:"count"},"(",o,")"))},b=function(e){var t=e.nodeKey,n=e.nodeValue,r=e.selectedNodeKeys,o=e.onNodeKeyToggled;return r&&r.includes(t)?a.a.createElement(g,{nodeKey:t,nodeValue:n,onNodeKeyToggled:o}):a.a.createElement(v,{nodeKey:t,nodeValue:n,onNodeKeyToggled:o})},E=function(e){return e.includes("$$")?e.substring(e.indexOf("]")+1,e.indexOf("$$")).trim():e.substring(e.indexOf("]")+1).trim()},h=function(e){return e.includes("$$")?e.substring(e.indexOf("$$")+"$$".length).split("$$").map(function(e){return e.trim()}):[]},O=function(e){var t=e.text,n=e.link;return a.a.createElement("a",{className:"link",href:n,title:n,target:"_blank"},a.a.createElement("span",{className:"text"},E(t)),h(t).map(function(e){return a.a.createElement("span",{key:e,className:"reference"},e)}))},j=function(e){var t=e.text,n=e.tooltip;return a.a.createElement("span",{className:"link",title:n},t)},w=function(e){var t=e.text,n=e.value;return/^(http|\/|\.)/i.test(n)?a.a.createElement(O,{text:t,link:n}):a.a.createElement(j,{text:t,tooltip:n})},k=function(e,t){return"string"===typeof e[1]?e[0].localeCompare(t[0]):N(t[1])-N(e[1])},N=function(e){return"string"===typeof e?e.length:Object.keys(e).length},K=function(e){var t=e.model,n=e.selectedNodeKeys,r=e.onNodeKeyToggled;return a.a.createElement("ul",null,Object.entries(t).filter(function(e){return"string"!==typeof Object(u.a)(e,2)[1]}).sort(k).map(function(e){var t=Object(u.a)(e,2),o=t[0],c=t[1];return a.a.createElement("li",{key:o},a.a.createElement(b,{nodeKey:o,nodeValue:c,selectedNodeKeys:n,onNodeKeyToggled:r}))}),Object.entries(t).filter(function(e){return"string"===typeof Object(u.a)(e,2)[1]}).sort(k).map(function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return a.a.createElement("li",{key:n},a.a.createElement(w,{text:n,value:r}))}))},x=function(e){var t=e.map,n=t.headers,o=t.body,c=function(){return Array(n.length).fill(null)},s=Object(r.useState)(c()),f=Object(u.a)(s,2),m=f[0],d=f[1],y=Object(r.useState)(c()),g=Object(u.a)(y,2),v=g[0],b=g[1],E=i(o,m,v),h=function(e){return function(t,n){return e.map(function(e,r){return r!==t?e:n})}}(v),O=function(e){return function(t,n){return e.map(function(e,r){return r<t?e:r>t?null:(e||[]).includes(n)?(e||[]).filter(function(e){return e!==n}):[].concat(Object(l.a)(e||[]),[n])})}}(m),j=function(e){return function(t,n){return e.map(function(e,r){return r!==t?e:null!=e&&e.length>0?null:Object.keys(n)})}}(m);return a.a.createElement("div",{className:"row"},n.map(function(e,t){var n=E(t),r=m[t],o=null!==r&&r.length>0?"column selected":"column";return a.a.createElement("div",{key:e,className:o,onDoubleClick:function(){return d(j(t,n))}},a.a.createElement(p,{placeholder:e,onKeyUp:function(e){return b(h(t,e.target.value))}}),a.a.createElement(K,{model:n,selectedNodeKeys:r,onNodeKeyToggled:function(e){return d(O(t,e))}}))}))},$=function(e){var t=e.url,n=e.setUrl;return a.a.createElement("div",{className:"sourceUrl"},a.a.createElement("input",{type:"text",defaultValue:t||"",placeholder:"Map JSON URL",onKeyPress:function(e){return"Enter"===e.key?n(e.target.value):void 0}}))},S=function(){var e=Object(r.useState)(window&&window.location&&window.location.search?new URLSearchParams(window.location.search).get("map"):null),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(null),l=Object(u.a)(c,2),i=l[0],s=l[1];return Object(r.useEffect)(function(){n&&fetch(n).then(function(e){return e.json()}).then(function(e){return s(e)}).catch(function(e){s(null),console.error(e),alert(e.message)})},[n]),a.a.createElement("div",{className:"app"},a.a.createElement($,{url:n,setUrl:o}),i&&a.a.createElement(x,{map:i}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[5,1,2]]]);
//# sourceMappingURL=main.10640a70.chunk.js.map