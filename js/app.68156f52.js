(function(e){function t(t){for(var a,o,s=t[0],c=t[1],l=t[2],p=0,m=[];p<s.length;p++)o=s[p],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&m.push(i[o][0]),i[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(m.length)m.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},i={app:0},r=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/CaixaRitmos/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e623"),n("e379"),n("5dc8"),n("37e1");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"has-hover":e.hasHover},attrs:{id:"app"},on:{touchstart:function(t){e.hasHover=!1}}},[e._m(0),n("h1",{staticClass:"title"},[e._v("Caixa de Ritmos")]),n("div",{staticClass:"container"},[n("div",{staticClass:"content"},[e._l(e.instruments,(function(t,a){return[n("div",{key:t.name,staticClass:"instrument-label item"},[e._v(" "+e._s(t.name)+" ")]),e._l(e.gridSize,(function(i){return n("div",{key:t.name+"-"+(i-1),staticClass:"instrument item",class:{active:e.matrix[a][i-1],activeMeasure:i-1===e.activeMeasure},on:{click:function(t){return e.toggleStep(a,i-1)}}},[n("img",{attrs:{src:t.icon}})])}))]}))],2)]),n("i",{staticClass:"play fa",class:e.playing?"fa-stop":"fa-play",on:{click:e.togglePlay}})])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{attrs:{href:"http://www.casadamusica.com/pt/servico-educativo/agenda/2019/11/20-caixa-de-ritmos/1000/?lang=pt#tab=0",target:"_blank"}},[n("img",{staticClass:"icon",attrs:{src:"icon.jpeg",alt:""}})])}],o=(n("4160"),n("b0c0"),n("159b"),n("8cc4")),s=n.n(o),c=n("f75e"),l=n.n(c),u={name:"app",data:function(){return{hasHover:!0,playing:!1,gridSize:8,activeMeasure:-1,matrix:[],instruments:[{name:"Bongós",icon:"img/bongos.png",sample:"sounds/bongos.mp3"},{name:"Congas",icon:"img/congas.png",sample:"sounds/congas.mp3"},{name:"Clavas ",icon:"img/clavas.png",sample:"sounds/clavas.mp3"},{name:"Triângulo",icon:"img/triangulo.png",sample:"sounds/triangulo.mp3"},{name:"Maracas",icon:"img/maracas.png",sample:"sounds/maracas.mp3"},{name:"Darbuka",icon:"img/darbuka.png",sample:"sounds/darbuka.mp3"},{name:"Pandeireta",icon:"img/pandeireta.png",sample:"sounds/pandeireta.mp3"},{name:"Agogo",icon:"img/agogo.png",sample:"sounds/agogo.mp3"}]}},created:function(){for(var e=this,t=0;t<this.instruments.length;t++){this.matrix[t]=new Array(this.gridSize);for(var n=0;n<this.gridSize;n++)this.matrix[t][n]=!1}this.initAudio(),document.addEventListener("keypress",(function(t){" "===t.key&&e.togglePlay()})),new l.a({threshold:10,timeout:1e3}).start(),window.addEventListener("shake",this.shaked,!1)},mounted:function(){var e=this;window.addEventListener("resize",(function(){e.resize()})),this.resize()},methods:{shaked:function(){for(var e=0;e<this.matrix.length;e++)for(var t=0;t<this.matrix[e].length;t++)this.matrix[e][t]=!1;this.$forceUpdate(),this.playing&&this.togglePlay()},resize:function(){var e=document.querySelectorAll(".instrument-label");e.forEach((function(e){window.fitText(e,.6)}))},initAudio:function(){var e=this;this.samples=(new s.a.Players).toMaster(),this.instruments.forEach((function(t){e.samples.add(t.name,t.sample)})),s.a.Transport.bpm.value=110,this.loop=new s.a.Sequence((function(t,n){e.activeMeasure=n;for(var a=0;a<e.instruments.length;a++)e.matrix[a][n]&&e.samples.get(e.instruments[a].name).start(t)}),[0,1,2,3,4,5,6,7],"1m"),this.loop.start(0)},togglePlay:function(){this.playing=!this.playing,this.playing?s.a.Transport.start():(this.activeMeasure=-1,this.samples.stopAll(),s.a.Transport.stop())},toggleStep:function(e,t){this.matrix[e][t]=!this.matrix[e][t],this.$forceUpdate()}}},p=u,m=(n("5c0b"),n("2877")),d=Object(m["a"])(p,i,r,!1,null,null,null),f=d.exports,g=n("9483");Object(g["a"])("".concat("/CaixaRitmos/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(f)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var a=n("9c0c"),i=n.n(a);i.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.68156f52.js.map