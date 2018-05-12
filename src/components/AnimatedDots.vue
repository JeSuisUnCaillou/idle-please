<template>
  <span class="dots">
    {{dots}}
  </span>
</template>

<script>
export default {
  name: 'animated-dots',
  props: ['nbDots'],
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
.dots {
  width: 3em;
  text-align: left;
  width: 1em;
  height: 1em;
  float: right;
}
</style>
