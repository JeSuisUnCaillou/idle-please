<template>
  <div class="game">
    <div class="top-bar">
      <div class="dual-container">
        <fading-message duration="-1" v-bind:trigger="visibleElapsedTime">
          <div class="elapsed-time-container clickable" @click="addOneSecond">
            <div class="bigger">Time wasted</div>
            <div class="amount-container">
              <div class="icon"><i class="fas fa-hourglass-end"></i></div>
              <duration :amount="displayedElapsedTime" fallback="-"></duration>
            </div>
            <fading-message duration="-1" :trigger="visibleaddedSeconds">
              <span class="amount-container">
                <div class="icon"><i class="fas fa-plus"></i></div>
                <duration :amount="addedSeconds" fallback="0 s"></duration>
              </span>
              <div class="amount-container" v-if="addedSeconds > 59">
                <div class="icon"></div>
                <span class="nb-clicks">({{addedSeconds}} clicks)</span>
              </div>
            </fading-message>
          </div>
        </fading-message>
        <div class="levels">
          <fading-message duration="-1" v-bind:trigger="visibleLevels" class="bigger">
            <span class="level-text">
              Level <span class="highlight">{{step}}</span>
            </span>
          </fading-message>
          <fading-message duration="-1" v-bind:trigger="visibleNextDuration">
            <div class="amount-container right">
              <duration :amount="currentLevelDuration"></duration>
              <div class="icon"><i class="fas fa-hourglass-start"></i></div>
            </div>
          </fading-message>
        </div>
      </div>
    </div>
    <div class="center-bar">
      <div class="even-bigger">
        <animated-dots nbDots="3" v-bind:invisibleDots="!visibleDots" v-bind:invisibleReverseDots="!visibleReverseDots" v-bind:duration="dotsDuration">
          Wait for <duration :amount="cooldown" fallback="it"></duration>
        </animated-dots>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="taunt">
        <taunt :messages="tauntMessages" duration="3" offset="1" >
        </taunt>
      </div>
      <div class="bottom-nav">
        <fading-message duration="-1" v-bind:trigger="visibleResetButton">
          <button class="reset-button clickable bigger" @click="resetProgression">
            <i class="fas fa-power-off"></i>
          </button>
        </fading-message>
        <fading-message duration="-1" v-bind:trigger="visiblePauseButton">
          <button class="reset-button clickable bigger" @click="pause">
            <span v-if="isPaused">
              <i class="fas fa-play"></i>
            </span>
            <span v-else>
              <i class="fas fa-pause"></i>
            </span>
          </button>
        </fading-message>
      </div>
    </div>
  </div>
</template>

<script>
import FadingMessage from './FadingMessage.vue'
import Taunt from './Taunt.vue'
import Duration from './Duration.vue'
import AnimatedDots from './AnimatedDots.vue'
import steps from './steps.js'
export default {
  name: 'game',
  components: { FadingMessage, Taunt, Duration, AnimatedDots },
  data () {
    return {
      ticker: null,
      isPaused: false,
      elapsedTime: 0,
      step: 0,
      addedSeconds: 0,
      tauntMessages: [],
      hasResetted: false,
      visibleElapsedTime: false,
      visibleLevels: false,
      visibleaddedSeconds: false,
      visibleDots: false,
      visibleReverseDots: false,
      visibleNextDuration: false,
      visibleResetButton: false,
      visiblePauseButton: false,
      dotsDuration: 1,
      steps: steps(this)
    }
  },
  computed: {
    cooldown () {
      return this.totalAmountToWait(this.step) - (this.elapsedTime + this.addedSeconds)
    },
    currentLevelDuration () {
      return this.nextAmountToWait(this.step) - 1
    },
    displayedElapsedTime () {
      return this.visibleaddedSeconds ? this.elapsedTime : this.elapsedTime + this.addedSeconds
    }
  },
  methods: {
    pause () {
      this.visiblePauseButton = true
      if (this.isPaused) {
        this.startCountDown()
      } else {
        clearInterval(this.ticker)
        this.ticker = null
      }
      this.isPaused = !this.isPaused
    },
    resetProgression () {
      this.hasResetted = true
      this.step = 0
      this.elapsedTime = 0
      this.addedSeconds = 0
      this.saveProgression()
      this.startCountDown()
    },
    saveProgression () {
      window.localStorage.setItem('elapsedTime', this.elapsedTime)
      window.localStorage.setItem('addedSeconds', this.addedSeconds)
    },
    loadProgression () {
      this.elapsedTime = parseInt(window.localStorage.getItem('elapsedTime')) || 0
      this.addedSeconds = parseInt(window.localStorage.getItem('addedSeconds')) || 0
      this.step = 0
      var i = 0
      for (; i < this.elapsedTime; i++) {
        this.computeGame()
      }
    },
    addOneSecond () {
      this.addedSeconds += 1
    },
    nextAmountToWait (givenStep) {
      return 5 + givenStep
    },
    totalAmountToWait (givenStep) {
      let total = 0
      let s = 0
      for (; s < givenStep; s++) {
        total += this.nextAmountToWait(s)
      }
      return total
    },
    startCountDown () {
      clearInterval(this.ticker)
      this.computeGame()
      this.ticker = setInterval(() => {
        this.elapsedTime++
        this.computeGame()
      }, 1000)
    },
    computeGame () {
      if (this.cooldown <= 0) {
        let stepMethod = this.steps[this.step]
        if (stepMethod) {
          stepMethod()
        } else {
          this.steps.default()
        }
        this.step++
        this.saveProgression()
      }
    },
    taunt (messages) {
      this.tauntMessages = [].slice.call(arguments)
    }
  },
  mounted () {
    this.loadProgression()
    this.startCountDown()
  },
  beforeDestroy () {
    clearInterval(this.ticker)
  }
}
</script>

<style>
.highlight {
  color: #ffffff;
}
</style>

<style scoped>
.game {
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 15px;
}
.game, button {
  color: #bad4ee;
}
.dual-container {
  display: flex;
  justify-content: space-between;
}
.top-bar div {
  margin-bottom: 5px;
}
.top-bar, .bottom-bar {
  flex-basis: 0;
  flex-grow: 1;
  width: 100%;
}
.center-bar {
  text-align: center;
}
.bottom-bar, .top-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bottom-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.clickable {
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.taunt {
  margin-top: 10px;
  text-align: center;
  height: 0;
}
.top-taunt {
  margin-bottom: 10px;
  text-align: center;
  /* height: 0; */
}
.levels {
  text-align: right;
}
.level-text {
  white-space: nowrap;
}
.elapsed-time-container {
  padding-right: 5px;
}
.nb-clicks {
  font-size: 0.75em;
}
.bigger {
  font-size: 1.25em;
}
.even-bigger {
  font-size: 1.5em;
}
.reset-button {
  background-color: transparent;
  border: unset;
  padding: 0 0 0 0;
  transition: all 1s cubic-bezier(.4,0,.2,1);
}
.reset-button:focus {
  outline: none;
  color: #ffffff;
}
.amount-container {
  display: flex;
}
.amount-container.right {
  justify-content: flex-end;
}
.icon {
  width: 1.7em;
  min-width: 1.7em;
  text-align: center;
  margin: 0 !important;
}
</style>
