webpackJsonp([0],{"6hvj":function(t,s){},DydK:function(t,s){},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("7+uW"),i={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("main",[s("router-view")],1)])},staticRenderFns:[]};var a=e("VU/8")({name:"app"},i,!1,function(t){e("DydK")},null,null).exports,o=e("/ocq"),r={name:"fading-message",props:["duration","trigger"],data:function(){return{isVisible:!1}},methods:{makeVisible:function(){this.isVisible=!0},startCountDown:function(){var t=this;this.duration>=0&&setTimeout(function(){t.isVisible=!1},1e3*this.duration)}},watch:{trigger:function(t,s){this.makeVisible(),this.startCountDown()}}},u={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"message",class:{visible:this.isVisible}},[this._t("default")],2)},staticRenderFns:[]};var l=e("VU/8")(r,u,!1,function(t){e("YpkX")},"data-v-70d44c23",null).exports,c={name:"duration",props:["amount","fallback"],computed:{days:function(){return Math.floor(this.amount/86400)},hours:function(){return Math.floor((this.amount-3600*this.days*24)/3600)},minutes:function(){return Math.floor((this.amount-3600*this.days*24-3600*this.hours)/60)},seconds:function(){return this.amount-3600*this.days*24-3600*this.hours-60*this.minutes}}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",[t.amount>0?e("span",[t.days>0?e("span",[e("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.days)+"\n      ")]),t._v(" "),e("span",[t._v("\n        "+t._s(t.days>1?"days":"day")+"\n      ")])]):t._e(),t._v(" "),t.hours>0?e("span",[e("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.hours)+"\n      ")]),t._v(" "),e("span",[t._v("\n        "+t._s(t.hours>1?"hours":"hour")+"\n      ")])]):t._e(),t._v(" "),t.minutes>0?e("span",[e("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.minutes)+"\n      ")]),t._v(" "),e("span",[t._v("\n        min\n      ")])]):t._e(),t._v(" "),t.seconds>0?e("span",[e("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.seconds)+"\n      ")]),t._v(" "),e("span",[t._v("\n        s\n      ")])]):t._e()]):e("span",[t._v("\n    "+t._s(t.fallback)+"\n  ")])])},staticRenderFns:[]};var d=e("VU/8")(c,v,!1,function(t){e("ejuu")},"data-v-11e83fb0",null).exports,h={name:"animated-dots",components:{Duration:d},props:["nbDots","invisibleDots","invisibleReverseDots"],data:function(){return{dots:""}},computed:{maxDots:function(){return this.nbDots?new Array(parseInt(this.nbDots)+1).join("."):"..."}},methods:{cycleDots:function(){this.dots===this.maxDots?this.dots="":this.dots+="."}},mounted:function(){var t=this;setInterval(function(){t.cycleDots()},1e3)}},m={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",[e("span",{staticClass:"withDots"},[t.invisibleDots?t._e():e("span",{class:{invisible:t.invisibleReverseDots}},[t._v(t._s(t.dots))]),t._v(" "),t._t("default"),t._v(" "),t.invisibleDots?t._e():e("span",{class:{invisible:t.invisibleDots}},[t._v(t._s(t.dots))])],2)])},staticRenderFns:[]};var p={name:"game",components:{FadingMessage:l,Duration:d,AnimatedDots:e("VU/8")(h,m,!1,function(t){e("a7V9")},"data-v-5b407e96",null).exports},data:function(){var t=this;return{developerMode:!1,elapsedTime:0,step:0,tauntMessage:"",visibleElapsedTime:!1,visibleLevels:!1,visibleTaunt:!1,visibleDots:!1,visibleReverseDots:!1,visibleNextDuration:!1,steps:{0:function(){},1:function(){t.taunt("Congrats ! You just wasted "+t.elapsedTime+" seconds")},2:function(){t.visibleElapsedTime=!0,t.taunt("Got nothing else to do, eh ?")},3:function(){t.visibleLevels=!0,t.taunt("You're level "+(t.step+2)+" now, well played !")},4:function(){t.visibleNextDuration=!0,t.taunt("You can now see the duration of the current level")},5:function(){t.visibleDots=!0,t.taunt("Here, have some animated dots")},6:function(){t.taunt("Are you entertained ?")},7:function(){t.visibleReverseDots=!0,t.taunt("You can also have synchronized reversed dots ?! Wow O_O")},default:function(){t.taunt("LOL, you're still here ?")}}}},computed:{nextAmountToWait:function(){return this.totalAmountToWait(this.step)-this.totalAmountToWait(this.step-1)},cooldown:function(){return this.totalAmountToWait(this.step)-this.elapsedTime}},methods:{totalAmountToWait:function(t){return t<0?0:this.developerMode?5*t:5*t*t},countDown:function(){var t=this;this.computeGame(),setInterval(function(){t.elapsedTime++,t.computeGame()},1e3)},computeGame:function(){if(this.cooldown<=0){var t=this.steps[this.step];t?t():this.steps.default(),this.step++}},taunt:function(t){t&&(this.tauntMessage=t),this.visibleTaunt=!this.visibleTaunt}},mounted:function(){this.countDown()}},f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"game"},[e("div",{staticClass:"top-bar"},[e("div",{staticClass:"dual-container"},[e("fading-message",{attrs:{duration:"-1",trigger:t.visibleElapsedTime}},[e("div",{staticClass:"bigger"},[t._v("Time wasted")]),t._v(" "),e("i",{staticClass:"fas fa-hourglass-end"}),t._v(" "),e("duration",{attrs:{amount:t.elapsedTime}})],1),t._v(" "),e("div",{staticClass:"levels"},[e("fading-message",{staticClass:"bigger",attrs:{duration:"-1",trigger:t.visibleLevels}},[t._v("\n          Level "),e("span",{staticClass:"highlight"},[t._v(t._s(t.step+1))])]),t._v(" "),e("fading-message",{attrs:{duration:"-1",trigger:t.visibleNextDuration}},[e("duration",{attrs:{amount:t.nextAmountToWait}}),t._v(" "),e("i",{staticClass:"fas fa-hourglass-start"})],1)],1)],1)]),t._v(" "),e("div",{staticClass:"center-bar"},[e("div",{staticClass:"even-bigger"},[e("animated-dots",{attrs:{nbDots:"4",invisibleDots:!t.visibleDots,invisibleReverseDots:!t.visibleReverseDots}},[t._v("\n         Wait for "),e("duration",{attrs:{amount:t.cooldown,fallback:"it"}})],1)],1)]),t._v(" "),e("div",{staticClass:"bottom-bar"},[e("div",{staticClass:"taunt"},[e("fading-message",{attrs:{duration:"3",trigger:t.visibleTaunt}},[t._v("\n        "+t._s(t.tauntMessage)+"\n      ")])],1)])])},staticRenderFns:[]};var _={name:"home",components:{Game:e("VU/8")(p,f,!1,function(t){e("6hvj")},"data-v-0c065c3e",null).exports},data:function(){return{}}},g={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"container"},[this._m(0),this._v(" "),s("div",{staticClass:"game-container centered-content"},[s("game")],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"titles"},[s("h1",{staticClass:"highlight"},[this._v("Idle, please")]),this._v(" "),s("div",[this._v("The perfectly pointless game")])])}]};var b=e("VU/8")(_,g,!1,function(t){e("jOB9")},"data-v-ad35ceda",null).exports;n.a.use(o.a);var D=new o.a({routes:[{path:"/",name:"Home",component:b}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:D,components:{App:a},template:"<App/>"})},YpkX:function(t,s){},a7V9:function(t,s){},ejuu:function(t,s){},jOB9:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.64da718025ad2547b851.js.map