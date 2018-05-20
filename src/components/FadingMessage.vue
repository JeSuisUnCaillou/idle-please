<template>
  <div class="message" v-bind:class="{ visible: isVisible }">
    <div :class="{ 'is-reseting': isReseting }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fading-message',
  props: ['duration', 'trigger', 'offset'],
  data () {
    return {
      isVisible: false,
      isReseting: false,
      intervalId: null
    }
  },
  methods: {
    makeVisible () {
      this.isReseting = true
      this.isVisible = false
      clearInterval(this.intervalId)
      this.intervalId = setTimeout(() => {
        this.isReseting = false
        this.isVisible = true
        this.startCountDown()
      }, this.offset * 1000)
    },
    startCountDown () {
      if (this.duration >= 0) {
        clearInterval(this.intervalId)
        this.intervalId = setTimeout(() => { this.isVisible = false }, this.duration * 1000)
      }
    }
  },
  watch: {
    trigger: function (newValue, oldValue) {
      this.makeVisible()
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  }
}
</script>

<style scoped>
.message {
  opacity: 0;
  transition: all 1s cubic-bezier(.4,0,.2,1);
}
.visible {
  opacity: 1;
}
.is-reseting {
  opacity: 0;
}
</style>
