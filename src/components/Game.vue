<template>
  <div class="game">
    <div class="top-bar">
      <fading-message duration="-1" v-bind:trigger="visibleElapsedTime">
        <duration :amount="elapsedTime"></duration> wasted
      </fading-message>
      <fading-message duration="-1" v-bind:trigger="visibleLevels">
        Level <span class="highlight">{{step+1}}</span>
      </fading-message>
    </div>
    <div class="center-bar">
      <div>
        Wait for <duration :amount="cooldown"></duration>
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
export default {
  name: 'game',
  components: { FadingMessage, Duration },
  data () {
    return {
      elapsedTime: 0,
      step: 0,
      tauntMessage: '',
      visibleElapsedTime: false,
      visibleLevels: false,
      visibleTaunt: false
    }
  },
  computed: {
    nextAmountToWait () {
      return 5 + 5 * this.step
    },
    cooldown () {
      return this.nextAmountToWait - this.elapsedTime
    }
  },
  methods: {
    countDown () {
      setInterval(() => {
        this.elapsedTime++
        this.computeGame()
      }, 1000)
    },
    computeGame () {
      // console.log(this.cooldown)
      if (this.cooldown === 0) {
        switch (this.step) {
          case 0:
            this.visibleElapsedTime = true
            break
          case 1:
            this.taunt('Got nothing else to do, eh ?')
            break
          case 2:
            this.visibleLevels = true
            break
          default:
            this.taunt('LOL')
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
.top-bar {
  width: 100%;
}
.top-bar * {
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
</style>
