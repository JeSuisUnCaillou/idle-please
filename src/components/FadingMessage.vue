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
      isVisible: false
    }
  },
  methods: {
    makeVisible () {
      this.isVisible = false
      setTimeout(() => {
        this.isVisible = true
        this.startCountDown()
      }, this.offset * 1000)
    },
    startCountDown () {
      if (this.duration >= 0) {
        setTimeout(() => { this.isVisible = false }, this.duration * 1000)
      }
    }
  },
  watch: {
    trigger: function (newValue, oldValue) {
      this.makeVisible()
    }
  }
}
</script>

<style scoped>
.message {
  margin-top: 5px;
  opacity: 0;
  transition: all 1s cubic-bezier(.4,0,.2,1);
}
.visible {
  opacity: 1;
}
</style>
