webpackJsonp([0],{AXG5:function(t,n){},DydK:function(t,n){},HalM:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("7+uW"),i={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("main",[n("router-view")],1)])},staticRenderFns:[]};var a=e("VU/8")({name:"app"},i,!1,function(t){e("DydK")},null,null).exports,o=e("/ocq"),r={name:"fading-message",props:["duration","trigger"],data:function(){return{isVisible:!1}},methods:{makeVisible:function(){var t=this;setTimeout(function(){t.isVisible=!0},500)},startCountDown:function(){var t=this;this.duration>=0&&setTimeout(function(){t.isVisible=!1},1e3*this.duration)}},watch:{trigger:function(t,n){this.makeVisible(),this.startCountDown()}}},u={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"message",class:{visible:this.isVisible}},[this._t("default")],2)},staticRenderFns:[]};var c={name:"duration",props:["amount"],computed:{hours:function(){return Math.floor(this.amount/3600)},minutes:function(){return Math.floor((this.amount-3600*this.hours)/60)},seconds:function(){return this.amount-3600*this.hours-60*this.minutes}}},l={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("span",[t.hours>0?e("span",[e("span",{staticClass:"highlight"},[t._v("\n      "+t._s(t.hours)+"\n    ")]),t._v(" "),e("span",[t._v("\n      "+t._s(t.hours>1?"hours":"hour")+"\n    ")])]):t._e(),t._v(" "),t.minutes>0?e("span",[e("span",{staticClass:"highlight"},[t._v("\n      "+t._s(t.minutes)+"\n    ")]),t._v(" "),e("span",[t._v("\n      min\n    ")])]):t._e(),t._v(" "),t.seconds>0?e("span",[e("span",{staticClass:"highlight"},[t._v("\n      "+t._s(t.seconds)+"\n    ")]),t._v(" "),e("span",[t._v("\n      sec\n    ")])]):t._e()])},staticRenderFns:[]};var h={name:"game",components:{FadingMessage:e("VU/8")(r,u,!1,function(t){e("woPx")},"data-v-baccd808",null).exports,Duration:e("VU/8")(c,l,!1,function(t){e("SKpa")},"data-v-052ea29a",null).exports},data:function(){return{elapsedTime:0,step:0,tauntMessage:"",visibleElapsedTime:!1,visibleTaunt:!1}},computed:{nextAmountToWait:function(){return 5+5*this.step},cooldown:function(){return this.nextAmountToWait-this.elapsedTime}},methods:{countDown:function(){var t=this;setInterval(function(){t.elapsedTime++,t.computeGame()},1e3)},computeGame:function(){if(0===this.cooldown){switch(this.step){case 0:this.visibleElapsedTime=!0;break;case 1:this.taunt("Got nothing else to do, eh ?");break;default:this.taunt("LOL")}this.step++}},taunt:function(t){t&&(this.tauntMessage=t),this.visibleTaunt=!this.visibleTaunt}},mounted:function(){this.countDown()}},d={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"game"},[e("div",{staticClass:"top-bar"},[e("fading-message",{attrs:{duration:"-1",trigger:t.visibleElapsedTime}},[e("duration",{attrs:{amount:t.elapsedTime}}),t._v(" wasted\n    ")],1)],1),t._v(" "),e("div",{staticClass:"center-bar"},[e("div",[t._v("\n      Wait for "),e("duration",{attrs:{amount:t.cooldown}})],1)]),t._v(" "),e("div",{staticClass:"bottom-bar"},[e("div",{staticClass:"taunt"},[e("fading-message",{attrs:{duration:"3",trigger:t.visibleTaunt}},[t._v("\n        "+t._s(t.tauntMessage)+"\n      ")])],1)])])},staticRenderFns:[]};var m={name:"home",components:{Game:e("VU/8")(h,d,!1,function(t){e("HalM")},"data-v-006678b4",null).exports},data:function(){return{}}},v={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"container"},[this._m(0),this._v(" "),n("div",{staticClass:"game-container centered-content"},[n("game")],1)])},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"titles"},[n("h1",{staticClass:"highlight"},[this._v("Idle, please")]),this._v(" "),n("div",[this._v("The perfectly pointless game")])])}]};var p=e("VU/8")(m,v,!1,function(t){e("AXG5")},"data-v-178613fc",null).exports;s.a.use(o.a);var f=new o.a({routes:[{path:"/",name:"Home",component:p}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:f,components:{App:a},template:"<App/>"})},SKpa:function(t,n){},woPx:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.867bd7c46fe6d69b7a7d.js.map