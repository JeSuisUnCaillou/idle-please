<template>
  <div>
    <fading-message class="message" v-for="(message, index) in messages" :key="index" :duration="duration" :trigger="trigger" :offset="subOffset(index)">
      {{message}}
    </fading-message>
  </div>
</template>

<script>
import FadingMessage from './FadingMessage.vue'
export default {
  name: 'fading-mutliple-messages',
  components: { FadingMessage },
  props: ['messages', 'duration', 'offset'],
  data () {
    return {
      offsets: {},
      trigger: false,
      timeoutId: null
    }
  },
  methods: {
    subOffset (index) {
      return this.offset * index
    }
  },
  watch: {
    messages (oldVal, newVal) {
      this.timeoutId = setTimeout(() => {
        this.trigger = !this.trigger
      }, 10)
    }
  },
  beforeDestroy () {
    clearInterval(this.timeoutId)
  }
}
</script>

<style scoped>
.message {
  margin-top: 5px;
}
</style>
