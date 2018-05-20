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
              <div class="amount-container">
                <div class="icon"><i class="fas fa-plus"></i></div>
                <duration :amount="addedSeconds" fallback="0 s"></duration>
              </div>
              <div class="nb-clicks" v-if="addedSeconds > 59">{{addedSeconds}} clicks</div>
            </fading-message>
          </div>
        </fading-message>
        <div class="levels">
          <fading-message duration="-1" v-bind:trigger="visibleLevels" class="bigger">
            Level <span class="highlight">{{step}}</span>
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
        <fading-multiple-messages :messages="tauntMessages" duration="3" offset="1" >
        </fading-multiple-messages>
      </div>
      <div class="bottom-nav">
        <fading-message duration="-1" v-bind:trigger="visibleResetButton">
          <button class="reset-button clickable bigger" @click="resetProgression">
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
      ticker: null,
      developerMode: false,
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
      dotsDuration: 1,
      steps: {
        default: () => { this.taunt('LOL', 'You\'re still here ?') },
        0: () => { this.hasResetted ? this.taunt('You just reset the game ...') : this.taunt('Wait for it') },
        1: () => { this.visibleLevels = true; this.taunt(`You're level ${this.step + 1} now`, this.hasResetted ? 'Why would you do that ?' : 'Well played !') },
        2: () => { this.visibleNextDuration = true; this.hasResetted ? this.taunt('I hope you regret clicking reset') : this.taunt('You can see the duration', 'of the current level', 'top right') },
        3: () => { this.visibleElapsedTime = true; this.taunt('Congrats !', `You just wasted ${this.elapsedTime + 2} seconds`, 'of your miserable life') },
        4: () => { this.taunt('Got nothing else to do, eh ?', 'Well, me neither, so...', 'Let\'s do this') },
        5: () => { this.visibleDots ? this.taunt('Here, have some animated...', 'Wait', 'YOU ALREADY HAVE THE DOTS') : this.taunt('Here,', 'have some animated dots'); this.visibleDots = true; this.dotsDuration = 1 },
        6: () => { this.taunt('Are you entertained ?') },
        7: () => { this.hasResetted ? this.taunt('I\'m warning you', 'Don\'t reset the game again') : this.taunt('Wow O_O', 'Synchronized reversed dots !', 'So awesome'); this.visibleReverseDots = true },
        8: () => { this.visibleResetButton = true; this.hasResetted ? this.taunt('You can reset the game', 'with the bottom left button', 'BUT YOU ARLEADY KNOW THAT', 'DON\'T YOU ?') : this.taunt('You can reset the game now', 'Click on the bottom left button', 'But I wouldn\'t do that') },
        9: () => { this.visibleResetButton = true; this.taunt('Why would you start over a game', 'designed to waste your time ?') },
        10: () => { this.dotsDuration = 0.1; this.taunt('Let\'s speed up these dots.', 'Do you like speed ?', '...', 'I do') },
        11: () => { this.dotsDuration = 1; this.taunt('Ok, that was way too fast', 'Let\'s slow them down a bit') },
        12: () => { this.visibleaddedSeconds = true; this.addedSeconds > 0 ? this.taunt('Let\'s see how many times you cheated', `Oh not bad, ${this.addedSeconds} click${this.addedSeconds > 1 ? 's' : ''} !`) : this.taunt('You didn\'t cheat once !', 'Well, you can add seconds', 'by clicking top left') },
        13: () => { this.taunt('Something extremely interesting', 'should happen next level') },
        14: () => { this.taunt('Nothing ?', 'Maybe the next level, then', 'You\'ll see') },
        15: () => { this.taunt('I\'m sure something will happen', '...', 'Soon') },
        16: () => { this.taunt('Well', 'What did you expect ?') },
        17: () => { this.taunt('One day there will be', 'an e-sport version', 'of this game') },
        18: () => { this.taunt('Available on Battle.net', `around the year ${(new Date()).getFullYear() + 1}`, '...', 'just wait') },
        // 19: () => {},
        20: () => { this.taunt('I\'m warning you', 'Nothing else to see here', 'Go home', 'The game is over') },
        21: () => { this.taunt('You\'re stubborn, heh ?', '...', 'Me too') }
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
    },
    displayedElapsedTime () {
      return this.visibleaddedSeconds ? this.elapsedTime - this.addedSeconds : this.elapsedTime
    }
  },
  methods: {
    resetProgression () {
      this.hasResetted = true
      this.step = 0
      this.elapsedTime = 0
      this.addedSeconds = 0
      this.saveProgression()
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
      this.elapsedTime += 1
      this.addedSeconds += 1
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
      this.tauntMessages = arguments
    }
  },
  mounted () {
    this.loadProgression()
    this.countDown()
  },
  beforeDestroy () {
    clearInterval(this.ticker)
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
.levels {
  text-align: right;
  white-space: nowrap;
}
.nb-clicks {
  margin-left: 2em;
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
  text-align: center;
  margin: 0 !important;
}
</style>
