webpackJsonp([0],{"6dOY":function(t,s){},"7yu2":function(t,s){},Avyt:function(t,s){},DydK:function(t,s){},NHnr:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=n("7+uW"),i={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("main",[s("router-view")],1)])},staticRenderFns:[]};var a=n("VU/8")({name:"app"},i,!1,function(t){n("DydK")},null,null).exports,o=n("/ocq"),r={name:"fading-message",props:["duration","trigger"],data:function(){return{isVisible:!1}},methods:{makeVisible:function(){this.isVisible=!0},startCountDown:function(){var t=this;this.duration>=0&&setTimeout(function(){t.isVisible=!1},1e3*this.duration)}},watch:{trigger:function(t,s){this.makeVisible(),this.startCountDown()}}},u={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"message",class:{visible:this.isVisible}},[this._t("default")],2)},staticRenderFns:[]};var c={name:"duration",props:["amount"],computed:{days:function(){return Math.floor(this.amount/86400)},hours:function(){return Math.floor((this.amount-3600*this.days*24)/3600)},minutes:function(){return Math.floor((this.amount-3600*this.days*24-3600*this.hours)/60)},seconds:function(){return this.amount-3600*this.days*24-3600*this.hours-60*this.minutes}}},l={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("span",[t.days>0?n("span",[n("span",{staticClass:"highlight"},[t._v("\n      "+t._s(t.days)+"\n    ")]),t._v(" "),n("span",[t._v("\n      "+t._s(t.days>1?"days":"day")+"\n    ")])]):t._e(),t._v(" "),t.hours>0?n("span",[n("span",{staticClass:"highlight"},[t._v("\n      "+t._s(t.hours)+"\n    ")]),t._v(" "),n("span",[t._v("\n      "+t._s(t.hours>1?"hours":"hour")+"\n    ")])]):t._e(),t._v(" "),t.minutes>0?n("span",[n("span",{staticClass:"highlight"},[t._v("\n      "+t._s(t.minutes)+"\n    ")]),t._v(" "),n("span",[t._v("\n      min\n    ")])]):t._e(),t._v(" "),t.seconds>0?n("span",[n("span",{staticClass:"highlight"},[t._v("\n      "+t._s(t.seconds)+"\n    ")]),t._v(" "),n("span",[t._v("\n      s\n    ")])]):t._e()])},staticRenderFns:[]};var d={name:"animated-dots",props:["nbDots"],data:function(){return{dots:""}},computed:{maxDots:function(){return this.nbDots?new Array(parseInt(this.nbDots)+1).join("."):"..."}},methods:{cycleDots:function(){this.dots===this.maxDots?this.dots="":this.dots+="."}},mounted:function(){var t=this;setInterval(function(){t.cycleDots()},1e3)}},h={render:function(){var t=this.$createElement;return(this._self._c||t)("span",{staticClass:"dots"},[this._v("\n  "+this._s(this.dots)+"\n")])},staticRenderFns:[]};var v={name:"game",components:{FadingMessage:n("VU/8")(r,u,!1,function(t){n("YpkX")},"data-v-70d44c23",null).exports,Duration:n("VU/8")(c,l,!1,function(t){n("6dOY")},"data-v-66ef0eb2",null).exports,AnimatedDots:n("VU/8")(d,h,!1,function(t){n("7yu2")},"data-v-49b7e05e",null).exports},data:function(){var t=this;return{elapsedTime:0,step:0,tauntMessage:"",visibleElapsedTime:!1,visibleLevels:!1,visibleTaunt:!1,visibleDots:!1,visibleNextDuration:!1,steps:{0:function(){t.taunt("Congrats ! You just waited 5 seconds")},1:function(){t.visibleElapsedTime=!0,t.taunt("Got nothing else to do, eh ?")},2:function(){t.visibleLevels=!0,t.taunt("You're level 4 now, well played !")},3:function(){t.visibleNextDuration=!0,t.taunt("You can now see the duration of the next level")},4:function(){t.visibleDots=!0,t.taunt("Here, have some animated dots")},default:function(){t.taunt("LOL, you're still here ?")}}}},computed:{nextAmountToWait:function(){return this.totalAmountToWait(this.step)-this.totalAmountToWait(this.step-1)},cooldown:function(){return this.totalAmountToWait(this.step)-this.elapsedTime}},methods:{totalAmountToWait:function(t){return t<0?5:5+5*t*t},countDown:function(){var t=this;setInterval(function(){t.elapsedTime++,t.computeGame()},1e3)},computeGame:function(){if(0===this.cooldown){var t=this.steps[this.step];t?t():this.steps.default(),this.step++}},taunt:function(t){t&&(this.tauntMessage=t),this.visibleTaunt=!this.visibleTaunt}},mounted:function(){this.countDown()}},m={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"game"},[n("div",{staticClass:"top-bar"},[n("div",{staticClass:"dual-container"},[n("fading-message",{attrs:{duration:"-1",trigger:t.visibleElapsedTime}},[n("div",{staticClass:"bigger"},[t._v("Time wasted")]),t._v(" "),n("i",{staticClass:"fas fa-hourglass-end"}),t._v(" "),n("duration",{attrs:{amount:t.elapsedTime}})],1),t._v(" "),n("div",{staticClass:"levels"},[n("fading-message",{staticClass:"bigger",attrs:{duration:"-1",trigger:t.visibleLevels}},[t._v("\n          Level "),n("span",{staticClass:"highlight"},[t._v(t._s(t.step+1))])]),t._v(" "),n("fading-message",{attrs:{duration:"-1",trigger:t.visibleNextDuration}},[n("duration",{attrs:{amount:t.nextAmountToWait}}),t._v(" "),n("i",{staticClass:"fas fa-hourglass-start"})],1)],1)],1)]),t._v(" "),n("div",{staticClass:"center-bar"},[n("div",{staticClass:"even-bigger"},[t.visibleDots?n("span",{staticClass:"dots-compensator"}):t._e(),t._v("\n      Wait for "),n("duration",{attrs:{amount:t.cooldown}}),t._v(" "),t.visibleDots?n("animated-dots",{attrs:{nbDots:"4"}}):t._e()],1)]),t._v(" "),n("div",{staticClass:"bottom-bar"},[n("div",{staticClass:"taunt"},[n("fading-message",{attrs:{duration:"3",trigger:t.visibleTaunt}},[t._v("\n        "+t._s(t.tauntMessage)+"\n      ")])],1)])])},staticRenderFns:[]};var f={name:"home",components:{Game:n("VU/8")(v,m,!1,function(t){n("Avyt")},"data-v-035315f3",null).exports},data:function(){return{}}},p={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"container"},[this._m(0),this._v(" "),s("div",{staticClass:"game-container centered-content"},[s("game")],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"titles"},[s("h1",{staticClass:"highlight"},[this._v("Idle, please")]),this._v(" "),s("div",[this._v("The perfectly pointless game")])])}]};var _=n("VU/8")(f,p,!1,function(t){n("jOB9")},"data-v-ad35ceda",null).exports;e.a.use(o.a);var g=new o.a({routes:[{path:"/",name:"Home",component:_}]});e.a.config.productionTip=!1,new e.a({el:"#app",router:g,components:{App:a},template:"<App/>"})},YpkX:function(t,s){},jOB9:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.61e894db449edd9a0239.js.map