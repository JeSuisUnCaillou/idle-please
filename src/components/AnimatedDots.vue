<template>
  <span>
    <span class="withDots">
      <span v-if="!invisibleDots" v-bind:class="{ invisible: invisibleReverseDots }">{{dots}}</span>
      <slot class="slot"></slot>
      <span v-if="!invisibleDots" v-bind:class="{ invisible: invisibleDots }">{{dots}}</span>
    </span>
  </span>
</template>

<script>
import Duration from './Duration.vue'
export default {
  name: 'animated-dots',
  components: { Duration },
  props: ['nbDots', 'invisibleDots', 'invisibleReverseDots', 'duration'],
  data () {
    return {
      dots: '',
      intervalID: null
    }
  },
  computed: {
    maxDots () {
      if (!this.nbDots) {
        return '...'
      } else {
        return new Array(parseInt(this.nbDots) + 1).join('.')
      }
    }
  },
  methods: {
    cycleDots () {
      if (this.dots === this.maxDots) {
        this.dots = ''
      } else {
        this.dots += '.'
      }
    },
    setInterval () {
      this.intervalID = setInterval(() => {
        this.cycleDots()
      }, this.duration * 1000)
    }
  },
  mounted () {
    if (!this.duration) { this.duration = 1 }
    this.setInterval()
  },
  watch: {
    duration (oldVal, newVal) {
      clearInterval(this.intervalID)
      this.setInterval()
    }
  }
}
</script>

<style scoped>
.slot {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
</style>
