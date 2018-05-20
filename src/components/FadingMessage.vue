<template>
  <div class="message" v-bind:class="{ visible: isVisible }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fading-message',
  props: ['duration', 'trigger', 'offset'],
  data () {
    return {
      isVisible: false,
      intervalId: null
    }
  },
  methods: {
    makeVisible () {
      // TODO : unset the fading animation before making invisible, and setting it back after
      this.isVisible = false
      clearInterval(this.intervalId)
      this.intervalId = setTimeout(() => {
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
</style>
