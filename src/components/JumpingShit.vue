<template>
    <span class="jumping-shit highlight"
          :data-jumping="isJumping"
          :style="{ transition: `transform ${duration}ms cubic-bezier(0,1,1,1.5), opacity ${duration}ms cubic-bezier(0,1,1,1.5)` }">
      <slot></slot>
    </span>
</template>

<script>
export default {
  name: 'jumping-shit',
  props: ['id'],
  data () {
    return {
      duration: 1000,
      isJumping: false,
      jumpingTimeout: null
    }
  },
  methods: {
    jump () {
      setTimeout(() => {
        this.isJumping = true
        clearTimeout(this.jumpingTimeout)
        this.jumpingTimeout = setTimeout(() => {
          this.$emit('done', this.id)
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
