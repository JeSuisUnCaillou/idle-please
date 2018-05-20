<template>
  <div>
    <fading-message v-for="(message, index) in messages" :key="index" :duration="duration" :trigger="realTrigger" :offset="subOffset(index)">
      {{message}}
    </fading-message>
  </div>
</template>

<script>
import FadingMessage from './FadingMessage.vue'
export default {
  name: 'fading-mutliple-messages',
  components: { FadingMessage },
  props: ['messages', 'duration', 'offset', 'trigger'],
  data () {
    return {
      offsets: {},
      realTrigger: false
    }
  },
  methods: {
    subOffset (index) {
      return this.offset * index
    }
  },
  watch: {
    trigger (oldVal, newVal) {
      setTimeout(() => {
        this.realTrigger = !this.realTrigger
      }, 10)
    }
  }
}
</script>

<style scoped>

</style>
