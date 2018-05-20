<template>
  <div class="game">
    <div class="top-bar">
      <div class="dual-container">
        <fading-message duration="-1" v-bind:trigger="visibleElapsedTime">
          <div class="bigger">Time wasted</div>
          <i class="fas fa-hourglass-end"></i>
          <duration :amount="elapsedTime"></duration>
        </fading-message>
        <div class="levels">
          <fading-message duration="-1" v-bind:trigger="visibleLevels" class="bigger">
            Level <span class="highlight">{{step}}</span>
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
      visibleElapsedTime: false,
      visibleLevels: false,
      visibleDots: false,
      visibleReverseDots: false,
      visibleNextDuration: false,
      dotsDuration: 1,
      steps: {
        0: () => { this.taunt('Wait for it') },
        1: () => { this.visibleLevels = true; this.taunt(`You're now level ${this.step + 1}`, 'Well played !') },
        2: () => { this.visibleNextDuration = true; this.taunt('You can now see the duration of the current level') },
        3: () => { this.visibleElapsedTime = true; this.taunt('Congrats !', `You just wasted ${this.elapsedTime + 1} seconds`) },
        4: () => { this.taunt('Got nothing else to do, eh ?') },
        5: () => { this.visibleDots = true; this.taunt('Here', 'have some animated dots') },
        6: () => { this.taunt('Are you entertained ?') },
        7: () => { this.visibleReverseDots = true; this.taunt('Synchronized reversed dots ?!', 'Wow O_O') },
        8: () => { this.dotsDuration = 0.1; this.taunt('Let\'s speed up these dots.', 'Do you like speed ?', 'I do') },
        9: () => { this.dotsDuration = 0.25; this.taunt('Ok, that is to fast.', 'Let\'s slow them down a bit') },
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
      console.log(arguments)
      this.tauntMessages = arguments
    }
  },
  mounted () {
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
  height: 10em;
  width: 100%;
}
.center-bar {
  text-align: center;
}
.taunt {
  margin-top: 10px;
  text-align: center;
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
.fa-hourglass-start {
  margin-right: 5px;
}
</style>
