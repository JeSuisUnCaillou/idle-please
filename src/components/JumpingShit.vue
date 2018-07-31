<template>
  <span class="relative-container">
    <span class="jumping-shit"
          :data-jumping="isJumping"
          :style="{ transition: `transform ${fadeDuration}ms ease-in-out, opacity ${fadeDuration}ms ease-in-out` }">
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
      duration: 200,
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
  left: -34px;
}
.jumping-shit[data-jumping] {
  transform: translateY(-50px);
  opacity: 1;
}
</style>
