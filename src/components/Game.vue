<template>
  <div class="game">
    <div class="top-bar">
      <div class="dual-container">
        <fading-message duration="-1" v-bind:trigger="visibleElapsedTime">
          <div>
            <div class="bigger">Time wasted</div>
            <i class="fas fa-hourglass-end"></i>
            <duration :amount="elapsedTime" fallback="-"></duration>
          </div>
        </fading-message>
        <div class="levels">
          <fading-message duration="-1" v-bind:trigger="visibleLevels" class="bigger">
            <div>
              Level <span class="highlight">{{step}}</span>
            </div>
          </fading-message>
          <fading-message duration="-1" v-bind:trigger="visibleNextDuration">
            <duration :amount="currentLevelDuration"></duration>
            <i class="fas fa-hourglass-start"></i>
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
        <fading-multiple-messages :messages="tauntMessages" duration="3" offset="1" >
        </fading-multiple-messages>
      </div>
      <div class="bottom-nav">
        <fading-message duration="-1" v-bind:trigger="visibleResetButton">
          <button class="reset-button bigger" @click="resetProgression">
            <i class="fas fa-power-off"></i>
          </button>
        </fading-message>
      </div>
    </div>
  </div>
</template>

<script>
import FadingMessage from './FadingMessage.vue'
import FadingMultipleMessages from './FadingMultipleMessages.vue'
import Duration from './Duration.vue'
import AnimatedDots from './AnimatedDots.vue'
export default {
  name: 'game',
  components: { FadingMessage, FadingMultipleMessages, Duration, AnimatedDots },
  data () {
    return {
      developerMode: false,
      elapsedTime: 0,
      step: 0,
      tauntMessages: [],
      hasResetted: false,
      visibleElapsedTime: false,
      visibleLevels: false,
      visibleDots: false,
      visibleReverseDots: false,
      visibleNextDuration: false,
      visibleResetButton: false,
      dotsDuration: 1,
      steps: {
        0: () => { this.taunt(this.hasResetted ? '... You just reset the game ...' : 'Wait for it')},
        1: () => { this.visibleLevels = true; this.taunt(this.hasResetted ? 'Why would you do that ?' : 'Well played !', `You're level ${this.step + 1} now`) },
        2: () => { this.visibleNextDuration = true; this.hasResetted ? this.taunt('I hope you regret clicking reset') : this.taunt('You can see the duration of the current level, top right') },
        3: () => { this.visibleElapsedTime = true; this.taunt('Congrats !', `You just wasted ${this.elapsedTime + 2} seconds`, 'of your miserable life') },
        4: () => { this.taunt('Got nothing else to do, eh ?', 'Me neither') },
        5: () => { this.dotsDuration = 1; this.visibleDots = true; this.taunt('Here,', 'have some animated dots') },
        6: () => { this.taunt('Are you entertained ?') },
        7: () => { this.visibleReverseDots = true; this.taunt('Wow O_O', 'Synchronized reversed dots !', 'So awesome') },
        8: () => { this.visibleResetButton = true; this.taunt('You can reset the game if you want', 'But I wouldn\'t do that') },
        9: () => { this.dotsDuration = 0.1; this.taunt('Let\'s speed up these dots.', 'Do you like speed ?', '...', 'I do') },
        10: () => { this.dotsDuration = 1; this.taunt('Ok, that is too fast.', 'Let\'s slow them down a bit') },
        default: () => { this.taunt('LOL, you\'re still here ?') }
      }
    }
  },
  computed: {
    cooldown () {
      return this.totalAmountToWait(this.step) - this.elapsedTime
    },
    currentLevelDuration () {
      if (this.developerMode) {
        return this.nextAmountToWait(this.step)
      } else {
        return this.nextAmountToWait(this.step) - 1
      }
    }
  },
  methods: {
    resetProgression () {
      this.hasResetted = true
      this.step = 0
      this.elapsedTime = 0
      this.visibleLevels = false
      this.visibleNextDuration = false
      this.visibleElapsedTime = false
      this.visibleDots = false
      this.visibleReverseDots = false
      this.visibleResetButton = false
    },
    saveProgression () {
      window.localStorage.setItem('elapsedTime', this.elapsedTime)
    },
    loadProgression () {
      this.elapsedTime = parseInt(window.localStorage.getItem('elapsedTime')) || 0
      this.step = 0
      var i = 0
      for (; i < this.elapsedTime; i++) {
        this.computeGame()
      }
    },
    nextAmountToWait (givenStep) {
      if (this.developerMode) {
        return 4
      } else {
        return 5 + givenStep
      }
    },
    totalAmountToWait (givenStep) {
      let total = 0
      let s = 0
      for (; s < givenStep; s++) {
        total += this.nextAmountToWait(s)
      }
      return total
    },
    countDown () {
      this.computeGame()
      setInterval(() => {
        this.elapsedTime++
        this.computeGame()
        this.saveProgression()
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
      }
    },
    taunt (messages) {
      this.tauntMessages = arguments
    }
  },
  mounted () {
    this.loadProgression()
    this.countDown()
  }
}
</script>

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
.dual-container {
  display: flex;
  justify-content: space-between;
}
.top-bar div {
  margin-bottom: 5px;
}
.top-bar, .bottom-bar {
  /* height: 10em; */
  flex-basis: 0;
  flex-grow: 1;
  width: 100%;
}
.center-bar {
  text-align: center;
}
.bottom-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bottom-nav {
  width: 100%;
}
.taunt {
  margin-top: 10px;
  text-align: center;
  height: 0;
  /* color: #dfe9f3; */
}
.levels {
  text-align: right;
  white-space: nowrap;
}
.bigger {
  font-size: 1.25em;
}
.even-bigger {
  font-size: 1.5em;
}
.fa-hourglass-end {
  margin-left: 5px;
}
.fa-hourglass-start, .fa-power-off {
  margin-right: 5px;
}
.reset-button {
  background-color: transparent;
  border: unset;
}
.reset-button:focus {
  outline: none;
  color: #ffffff;
}
</style>
