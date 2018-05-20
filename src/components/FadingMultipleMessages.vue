<template>
  <div>
    <fading-message v-for="(slotName, index) in slotNames" :key="index" :duration="duration" :trigger="triggers[slotName]">
      <slot :name="slotName">
      </slot>
    </fading-message>
  </div>
</template>

<script>
import FadingMessage from './FadingMessage.vue'
export default {
  name: 'fading-mutliple-messages',
  components: { FadingMessage },
  props: ['duration', 'offset', 'trigger'],
  data () {
    return {
      triggers: {}
    }
  },
  computed: {
    slotNames () {
      return Object.keys(this.$slots)
    }
  },
  mounted () {
    for (var slotName in this.slotNames) {
      this.triggers[slotName] = false
    }
  },
  watch: {
    trigger (oldVal, newVal) {
      let i = 0
      for (; i < this.slotNames.length; i++) {
        let slotName = this.slotNames[i]
        setInterval(() => {
          this.triggers[slotName] = !this.triggers[slotName]
        }, i * this.offset)
      }
    }
  }
}
</script>

<style scoped>

</style>
