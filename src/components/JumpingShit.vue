<template>
    <span class="jumping-shit highlight"
          :data-jumping="isJumping"
          v-show="!isFinished"
          :style="{ transition: `transform ${duration}ms cubic-bezier(0,1,1,1.5), opacity ${duration}ms cubic-bezier(0,1,1,1.5)` }">
      <span class="primary-text">+</span>1
    </span>
</template>

<script>
export default {
  name: 'jumping-shit',
  data () {
    return {
      duration: 1000,
      isJumping: false,
      isFinished: false,
      jumpingTimeout: null
    }
  },
  methods: {
    jump () {
      setTimeout(() => {
        this.isJumping = true
        clearTimeout(this.jumpingTimeout)
        this.jumpingTimeout = setTimeout(() => {
          this.isFinished = true
          this.$emit('done')
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
  /* transform: scale(0.5); */
}
.jumping-shit[data-jumping] {
  transform: translateY(-35px);
  opacity: 1;
}
</style>
