webpackJsonp([0],{"1+Fq":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("main",[e("router-view")],1)])},staticRenderFns:[]};var a=s("VU/8")({name:"app"},i,!1,function(t){s("ddLF")},null,null).exports,o=s("/ocq"),r={name:"fading-message",props:["duration","trigger","offset"],data:function(){return{isVisible:!1,intervalId:null}},methods:{makeVisible:function(){var t=this;this.isVisible=!1,clearInterval(this.intervalId),this.intervalId=setTimeout(function(){t.isVisible=!0,t.startCountDown()},1e3*this.offset)},startCountDown:function(){var t=this;this.duration>=0&&(clearInterval(this.intervalId),this.intervalId=setTimeout(function(){t.isVisible=!1},1e3*this.duration))}},watch:{trigger:function(t,e){this.makeVisible()}},beforeDestroy:function(){clearInterval(this.intervalId)}},u={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"message",class:{visible:this.isVisible}},[this._t("default")],2)},staticRenderFns:[]};var l=s("VU/8")(r,u,!1,function(t){s("1+Fq")},"data-v-6653a7b6",null).exports,c={name:"fading-mutliple-messages",components:{FadingMessage:l},props:["messages","duration","offset"],data:function(){return{offsets:{},realTrigger:!1}},methods:{subOffset:function(t){return this.offset*t}},watch:{messages:function(t,e){var s=this;setTimeout(function(){s.realTrigger=!s.realTrigger},10)}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",t._l(t.messages,function(e,n){return s("fading-message",{key:n,staticClass:"message",attrs:{duration:t.duration,trigger:t.realTrigger,offset:t.subOffset(n)}},[t._v("\n    "+t._s(e)+"\n  ")])}))},staticRenderFns:[]};var v=s("VU/8")(c,d,!1,function(t){s("mEUu")},"data-v-02c44e96",null).exports,h={name:"duration",props:["amount","fallback"],computed:{days:function(){return Math.floor(this.amount/86400)},hours:function(){return Math.floor((this.amount-3600*this.days*24)/3600)},minutes:function(){return Math.floor((this.amount-3600*this.days*24-3600*this.hours)/60)},seconds:function(){return this.amount-3600*this.days*24-3600*this.hours-60*this.minutes}}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[t.amount>0?s("span",[t.days>0?s("span",[s("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.days)+"\n      ")]),t._v(" "),s("span",[t._v("\n        "+t._s(t.days>1?"days":"day")+"\n      ")])]):t._e(),t._v(" "),t.hours>0?s("span",[s("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.hours)+"\n      ")]),t._v(" "),s("span",[t._v("\n        "+t._s(t.hours>1?"hours":"hour")+"\n      ")])]):t._e(),t._v(" "),t.minutes>0?s("span",[s("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.minutes)+"\n      ")]),t._v(" "),s("span",[t._v("\n        min\n      ")])]):t._e(),t._v(" "),t.seconds>0?s("span",[s("span",{staticClass:"highlight"},[t._v("\n        "+t._s(t.seconds)+"\n      ")]),t._v(" "),s("span",[t._v("\n        s\n      ")])]):t._e()]):s("span",[t._v("\n    "+t._s(t.fallback)+"\n  ")])])},staticRenderFns:[]};var m=s("VU/8")(h,f,!1,function(t){s("ejuu")},"data-v-11e83fb0",null).exports,p={name:"animated-dots",components:{Duration:m},props:["nbDots","invisibleDots","invisibleReverseDots","duration"],data:function(){return{dots:"",intervalID:null}},computed:{maxDots:function(){return this.nbDots?new Array(parseInt(this.nbDots)+1).join("."):"..."}},methods:{cycleDots:function(){this.dots===this.maxDots?this.dots="":this.dots+="."},setInterval:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){var t=this;this.intervalID=setInterval(function(){t.cycleDots()},1e3*this.duration)})},mounted:function(){this.duration||(this.duration=1),this.setInterval()},watch:{duration:function(t,e){clearInterval(this.intervalID),this.setInterval()}}},g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[s("span",{staticClass:"withDots"},[t.invisibleDots?t._e():s("span",{class:{invisible:t.invisibleReverseDots}},[t._v(t._s(t.dots))]),t._v(" "),t._t("default"),t._v(" "),t.invisibleDots?t._e():s("span",{class:{invisible:t.invisibleDots}},[t._v(t._s(t.dots))])],2)])},staticRenderFns:[]};var _={name:"game",components:{FadingMessage:l,FadingMultipleMessages:v,Duration:m,AnimatedDots:s("VU/8")(p,g,!1,function(t){s("a1c1")},"data-v-97648c1c",null).exports},data:function(){var t=this;return{ticker:null,developerMode:!1,elapsedTime:0,step:0,tauntMessages:[],hasResetted:!1,visibleElapsedTime:!1,visibleLevels:!1,visibleDots:!1,visibleReverseDots:!1,visibleNextDuration:!1,visibleResetButton:!1,dotsDuration:1,steps:{0:function(){t.hasResetted?t.taunt("You just reset the game ..."):t.taunt("Wait for it")},1:function(){t.visibleLevels=!0,t.taunt("You're level "+(t.step+1)+" now",t.hasResetted?"Why would you do that ?":"Well played !")},2:function(){t.visibleNextDuration=!0,t.hasResetted?t.taunt("I hope you regret clicking reset"):t.taunt("You can see the duration of the current level, top right")},3:function(){t.visibleElapsedTime=!0,t.taunt("Congrats !","You just wasted "+(t.elapsedTime+2)+" seconds","of your miserable life")},4:function(){t.taunt("Got nothing else to do, eh ?","Well, me neither, so...")},5:function(){t.dotsDuration=1,t.visibleDots=!0,t.taunt("Here,","have some animated dots")},6:function(){t.taunt("Are you entertained ?")},7:function(){t.visibleReverseDots=!0,t.taunt("Wow O_O","Synchronized reversed dots !","So awesome")},8:function(){t.visibleResetButton=!0,t.taunt("You are able to reset the game","Click on the bottom left button","But I wouldn't do that")},9:function(){t.visibleResetButton=!0,t.taunt("Why would you start over a game","designed to waste your time ?")},10:function(){t.dotsDuration=.1,t.taunt("Let's speed up these dots.","Do you like speed ?","...","I do")},11:function(){t.dotsDuration=1,t.taunt("Ok, that was way too fast","Let's slow them down a bit")},default:function(){t.taunt("LOL, you're still here ?")}}}},computed:{cooldown:function(){return this.totalAmountToWait(this.step)-this.elapsedTime},currentLevelDuration:function(){return this.developerMode?this.nextAmountToWait(this.step):this.nextAmountToWait(this.step)-1}},methods:{resetProgression:function(){this.hasResetted=!0,this.step=0,this.elapsedTime=0},saveProgression:function(){window.localStorage.setItem("elapsedTime",this.elapsedTime)},loadProgression:function(){this.elapsedTime=parseInt(window.localStorage.getItem("elapsedTime"))||0,this.step=0;for(var t=0;t<this.elapsedTime;t++)this.computeGame()},nextAmountToWait:function(t){return this.developerMode?4:5+t},totalAmountToWait:function(t){for(var e=0,s=0;s<t;s++)e+=this.nextAmountToWait(s);return e},countDown:function(){var t=this;this.computeGame(),this.ticker=setInterval(function(){t.elapsedTime++,t.computeGame(),t.saveProgression()},1e3)},computeGame:function(){if(this.cooldown<=0){var t=this.steps[this.step];t?t():this.steps.default(),this.step++}},taunt:function(t){this.tauntMessages=arguments}},mounted:function(){this.loadProgression(),this.countDown()},beforeDestroy:function(){clearInterval(this.ticker)}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"game"},[s("div",{staticClass:"top-bar"},[s("div",{staticClass:"dual-container"},[s("fading-message",{attrs:{duration:"-1",trigger:t.visibleElapsedTime}},[s("div",{staticClass:"bigger"},[t._v("Time wasted")]),t._v(" "),s("i",{staticClass:"fas fa-hourglass-end"}),t._v(" "),s("duration",{attrs:{amount:t.elapsedTime,fallback:"-"}})],1),t._v(" "),s("div",{staticClass:"levels"},[s("fading-message",{staticClass:"bigger",attrs:{duration:"-1",trigger:t.visibleLevels}},[t._v("\n            Level "),s("span",{staticClass:"highlight"},[t._v(t._s(t.step))])]),t._v(" "),s("fading-message",{attrs:{duration:"-1",trigger:t.visibleNextDuration}},[s("duration",{attrs:{amount:t.currentLevelDuration}}),t._v(" "),s("i",{staticClass:"fas fa-hourglass-start"})],1)],1)],1)]),t._v(" "),s("div",{staticClass:"center-bar"},[s("div",{staticClass:"even-bigger"},[s("animated-dots",{attrs:{nbDots:"3",invisibleDots:!t.visibleDots,invisibleReverseDots:!t.visibleReverseDots,duration:t.dotsDuration}},[t._v("\n         Wait for "),s("duration",{attrs:{amount:t.cooldown,fallback:"it"}})],1)],1)]),t._v(" "),s("div",{staticClass:"bottom-bar"},[s("div",{staticClass:"taunt"},[s("fading-multiple-messages",{attrs:{messages:t.tauntMessages,duration:"3",offset:"1"}})],1),t._v(" "),s("div",{staticClass:"bottom-nav"},[s("fading-message",{attrs:{duration:"-1",trigger:t.visibleResetButton}},[s("button",{staticClass:"reset-button bigger",on:{click:t.resetProgression}},[s("i",{staticClass:"fas fa-power-off"})])])],1)])])},staticRenderFns:[]};var D={name:"home",components:{Game:s("VU/8")(_,b,!1,function(t){s("jzru")},"data-v-6ba9a5c2",null).exports},data:function(){return{}}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[this._m(0),this._v(" "),e("div",{staticClass:"game-container centered-content"},[e("game")],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"titles"},[e("h1",{staticClass:"highlight"},[this._v("Idle, please")]),this._v(" "),e("div",[this._v("The perfectly pointless game")])])}]};var y=s("VU/8")(D,w,!1,function(t){s("jOB9")},"data-v-ad35ceda",null).exports;n.a.use(o.a);var C=new o.a({routes:[{path:"/",name:"Home",component:y}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:C,components:{App:a},template:"<App/>"})},a1c1:function(t,e){},ddLF:function(t,e){},ejuu:function(t,e){},jOB9:function(t,e){},jzru:function(t,e){},mEUu:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.d06e39ca0f151fc79062.js.map