<template>
  <span class="relative-container">
    <span class="jumping-shit"
          :data-jumping="isJumping"
          :style="{ transition: `transform ${duration}ms cubic-bezier(.4,0,.2,1), opacity ${duration}ms cubic-bezier(.4,0,.2,1)` }">
      +1
    </span>
  </span>
</template>

<script>
export default {
  name: 'jumping-shit',
  props: ['shit'],
  data () {
    return {
      duration: 100,
      isJumping: false,
      isVisible: false,
      jumpingTimeout: null
    }
  },
  methods: {
    jump () {
      this.isJumping = false
      setTimeout(() => {
        this.isJumping = true
        clearTimeout(this.jumpingTimeout)
        this.jumpingTimeout = setTimeout(() => {
          this.isJumping = false
        }, this.duration)
      }, 0)
    }
  }
}
</script>

<style scoped>
.relative-container {
  position: relative;
}
.jumping-shit {
  position: absolute;
  opacity: 0;
}
.jumping-shit[data-jumping] {
  transform: translateY(-30px);
  opacity: 1;
}
</style>
