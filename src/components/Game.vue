<template>
  <div class="game">
    <div class="top-bar">
      <div class="dual-container">
        <fading-message duration="-1" v-bind:trigger="visibleElapsedTime">
          <div class="bigger">Total time wasted</div>
          <i class="fas fa-hourglass-end"></i>
          <duration :amount="elapsedTime"></duration>
        </fading-message>
        <div class="levels">
          <fading-message duration="-1" v-bind:trigger="visibleLevels" class="bigger">
            Level <span class="highlight">{{step+1}}</span>
          </fading-message>
          <fading-message duration="-1" v-bind:trigger="visibleNextDuration">
            <duration :amount="nextAmountToWait"></duration>
            <i class="fas fa-hourglass-start"></i>
          </fading-message>
        </div>
      </div>
    </div>
    <div class="center-bar">
      <div class="even-bigger">
        <span class="dots-compensator" v-if="visibleDots"></span>
        Wait for <duration :amount="cooldown"></duration>
        <animated-dots nbDots="4" v-if="visibleDots"></animated-dots>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="taunt">
        <fading-message duration="3" v-bind:trigger="visibleTaunt">
          {{tauntMessage}}
        </fading-message>
      </div>
    </div>
  </div>
</template>

<script>
import FadingMessage from './FadingMessage.vue'
import Duration from './Duration.vue'
import AnimatedDots from './AnimatedDots.vue'
export default {
  name: 'game',
  components: { FadingMessage, Duration, AnimatedDots },
  data () {
    return {
      elapsedTime: 0,
      step: 0,
      tauntMessage: '',
      visibleElapsedTime: false,
      visibleLevels: false,
      visibleTaunt: false,
      visibleDots: false,
      visibleNextDuration: false,
      steps: {
        0: () => { this.visibleElapsedTime = true; this.taunt('Congrats ! You just waited 5 seconds') },
        1: () => { this.taunt('Got nothing else to do, eh ?') },
        2: () => { this.visibleLevels = true; this.taunt('You\'re level 4, well played !') },
        3: () => { this.visibleNextDuration = true; this.taunt('You can now see the duration of the next level') },
        4: () => { this.visibleDots = true; this.taunt('Here, have some animated dots') },
        default: () => { this.taunt('LOL') }
      }
    }
  },
  computed: {
    nextAmountToWait () {
      return this.totalAmountToWait(this.step) - this.totalAmountToWait(this.step - 1)
    },
    cooldown () {
      return this.totalAmountToWait(this.step) - this.elapsedTime
    }
  },
  methods: {
    totalAmountToWait (givenStep) {
      if (givenStep < 0) {
        return 5
      } else {
        return 5 + 5 * givenStep * givenStep
      }
    },
    countDown () {
      setInterval(() => {
        this.elapsedTime++
        this.computeGame()
      }, 1000)
    },
    computeGame () {
      if (this.cooldown === 0) {
        let stepMethod = this.steps[this.step]
        if (stepMethod) {
          stepMethod()
        } else {
          this.steps.default()
        }
        this.step++
      }
    },
    taunt (message) {
      if (message) { this.tauntMessage = message }
      this.visibleTaunt = !this.visibleTaunt
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
  padding: 10px;
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
.dots-compensator {
  width: 3em;
  width: 1em;
  height: 1em;
  float: left;
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
  margin-left: 10px;
}
.fa-hourglass-start {
  margin-right: 10px;
}
</style>
