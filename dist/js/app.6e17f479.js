(function(t){function e(e){for(var o,a,s=e[0],c=e[1],u=e[2],p=0,d=[];p<s.length;p++)a=s[p],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);l&&l(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(o=!1)}o&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},i={app:0},r=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"3c56":function(t,e,n){"use strict";var o=n("f898"),i=n.n(o);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"red",dark:""}},[n("div",{staticClass:"d-flex align-center ml-4"},[n("h1",[t._v("Looper")])]),n("v-row",[n("v-btn",{staticClass:"ml-auto mr-8",attrs:{color:"dark"},on:{click:t.toggleState}},[t._v(" "+t._s(t.buttonText)+" ")])],1)],1),n("v-main",{staticClass:"align-center justify-center"},[n("Sequencer")],1)],1)},r=[],a=n("5530"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[t.audioCtx?n("v-row",{staticClass:"d-flex flex-column align-center"},[n("div",{staticClass:"sequencer__playhead"}),t._l(t.tracks,(function(e,o){return n("div",{key:o},[n("Track",{attrs:{track:e,audioCtx:t.audioCtx,numberOfSteps:t.numberOfSteps,position:t.currentStep}})],1)}))],2):t._e()],1)},c=[],u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["sequencer__track",{"sequencer__track--disabled":!t.enabled}]},[n("v-switch",{staticClass:"mx-4",attrs:{inset:""},model:{value:t.enabled,callback:function(e){t.enabled=e},expression:"enabled"}}),t._l(t.steps,(function(e,o){return n("div",{key:o},[n("Step",{attrs:{step:e,index:o,position:t.position}})],1)}))],2)},l=[],p=(n("a630"),n("d81d"),n("d3b7"),n("3ca3"),n("ddb0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{class:["sequencer__step",{"sequencer__step--active":t.isActive,"sequencer__step--current":t.isCurrent}],on:{click:t.ToggleStep}})}),d=[],f={name:"Step",props:["step","index","position"],data:function(){return{isActive:!1}},computed:{isCurrent:function(t){return t.index==t.position}},methods:{ToggleStep:function(){console.log("is it active test poopopkkopkop?",this.step.active,this.index),this.isActive=!this.isActive,this.step.active=this.isActive}}},v=f,g=n("2877"),b=Object(g["a"])(v,p,d,!1,null,null,null),h=b.exports,m={name:"Track",props:["numberOfSteps","track","position","audioCtx"],data:function(){return{enabled:!0,volume:10,audioSrc:null}},components:{Step:h},computed:{steps:function(t){console.log("steps count is:",t.numberOfSteps,t);var e=Array.from(Array(t.numberOfSteps).keys());return e.map((function(){return{active:!1}}))}},mounted:function(){var t=new XMLHttpRequest;this.audioSrc=this.audioCtx.createBufferSource(),t.open("GET",this.track.source,!0),t.responseType="arraybuffer";var e=this.audioCtx,n=this.audioSrc,o=function(t){n.buffer=t,n.connect(e.destination)},i=function(t){console.log("Error with decoding audio data"+t.err)};t.onload=function(){var n=t.response;e.decodeAudioData(n,o,i)},console.log("now make the request!"),t.send()},watch:{position:function(t){0==t&&console.log("restart"),this.steps[t]["active"]&&(console.log("this ones playing!",this.track.source),this.audioSrc.start(0))}}},w=m,y=n("6544"),x=n.n(y),S=n("b73d"),k=Object(g["a"])(w,u,l,!1,null,null,null),_=k.exports;x()(k,{VSwitch:S["a"]});var O=n("2f62"),j={name:"Sequencer",data:function(){return{audioCtx:null,ticks:0,numberOfSteps:8,interval:null,tracks:[{source:"../assets/audio/1.wav"},{source:"../assets/audio/2.wav"},{source:"../assets/audio/3.wav"},{source:"../assets/audio/4.wav"},{source:"../assets/audio/5.wav"},{source:"../assets/audio/6.wav"},{source:"../assets/audio/7.wav"},{source:"../assets/audio/8.wav"}]}},components:{Track:_},computed:Object(a["a"])(Object(a["a"])({},Object(O["c"])(["isRunning"])),{},{currentStep:function(t){return t.ticks%t.numberOfSteps},buttonText:function(t){return t.isRunning?"Stop":"Start"}}),methods:{startPlaying:function(){var t=this;this.ticks=0,this.interval=setInterval((function(){t.ticks++}),1e3)},stopPlaying:function(){this.ticks=0,clearInterval(this.interval)}},mounted:function(){this.audioCtx=new AudioContext,console.log("now creating it!",this.audioCtx)},watch:{isRunning:function(t){console.log("updated to ",t),t?this.startPlaying():this.stopPlaying()}},destroyed:function(){clearInterval(this.interval)}},C=j,P=(n("3c56"),n("a523")),A=n("0fd9"),R=Object(g["a"])(C,s,c,!1,null,null,null),T=R.exports;x()(R,{VContainer:P["a"],VRow:A["a"]});var q={name:"App",components:{Sequencer:T},data:function(){return{}},computed:Object(a["a"])(Object(a["a"])({},Object(O["c"])(["isRunning"])),{},{buttonText:function(t){return t.isRunning?"Stop":"Play"}}),methods:Object(a["a"])(Object(a["a"])({},Object(O["b"])(["togglePlaying"])),{},{toggleState:function(){this.togglePlaying(!this.isRunning)}}),mounted:function(){window.AudioContext=window.AudioContext||window.webkitAudioContext}},V=q,E=(n("5c0b"),n("7496")),M=n("40dc"),$=n("8336"),B=n("f6c4"),I=Object(g["a"])(V,i,r,!1,null,null,null),J=I.exports;x()(I,{VApp:E["a"],VAppBar:M["a"],VBtn:$["a"],VMain:B["a"],VRow:A["a"]});var L=n("f309");o["a"].use(L["a"]);var D=new L["a"]({});o["a"].use(O["a"]);var G=new O["a"].Store({state:{isRunning:!1},mutations:{togglePlaying:function(t,e){t.isRunning=e}},actions:{togglePlaying:function(t,e){t.commit("togglePlaying",e)}},getters:{isRunning:function(t){return t.isRunning}}});o["a"].config.productionTip=!1,new o["a"]({vuetify:D,store:G,render:function(t){return t(J)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var o=n("9c0c"),i=n.n(o);i.a},"9c0c":function(t,e,n){},f898:function(t,e,n){}});
//# sourceMappingURL=app.6e17f479.js.map