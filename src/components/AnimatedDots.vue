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
  props: ['nbDots', 'invisibleDots', 'invisibleReverseDots'],
  data () {
    return {
      dots: ''
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
    }
  },
  mounted () {
    setInterval(() => {
      this.cycleDots()
    }, 1000)
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
