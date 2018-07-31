<template>
  <span class="relative-container">
    <span class="jumping-shit highlight"
          :data-jumping="isJumping"
          :style="{ transition: `transform ${fadeDuration}ms ease-in-out, opacity ${fadeDuration}ms ease-in-out` }">
      <span class="primary-text">+</span>1
    </span>
  </span>
</template>

<script>
export default {
  name: 'jumping-shit',
  data () {
    return {
      duration: 100,
      fadeDuration: 0,
      isJumping: false,
      jumpingTimeout: null
    }
  },
  methods: {
    jump () {
      this.fadeDuration = 0
      this.isJumping = false
      setTimeout(() => {
        this.fadeDuration = this.duration
        this.isJumping = true
        clearTimeout(this.jumpingTimeout)
        this.jumpingTimeout = setTimeout(() => {
          this.fadeDuration = 0
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
  left: -27px;
  transform: scale(0.5);
}
.jumping-shit[data-jumping] {
  transform: translateY(-50px) scale(1);
  opacity: 1;
}
</style>
