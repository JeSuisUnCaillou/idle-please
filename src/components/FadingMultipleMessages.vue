<template>
  <div>
    <fading-message class="message" v-for="(message, index) in strippedMessages" :key="index" :duration="duration" :trigger="trigger" :offset="subOffset(index)">
      <span :class="{ 'is-nice': isNice(index) }">{{message}}</span>
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
      timeoutId: null,
      isNiceCharacter: '#'
    }
  },
  computed: {
    strippedMessages () {
      return this.messages.map((m) => {
        if (m[0] === this.isNiceCharacter) {
          return m.slice(1)
        } else {
          return m
        }
      })
    }
  },
  methods: {
    subOffset (index) {
      return this.offset * index
    },
    isNice (index) {
      return this.messages[index][0] === this.isNiceCharacter
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
.is-nice {
  color: #ff9f54;
}
</style>
