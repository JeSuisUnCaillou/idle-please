<template>
    <span class="jumping-shit"
          :data-jumping="isJumping"
          :style="{ transition: `transform ${duration}ms cubic-bezier(0,1,1,1.5), opacity ${duration}ms cubic-bezier(0,0.5,0.5,1)` }">
      <slot></slot>
    </span>
</template>

<script>
export default {
  name: 'jumping-shit',
  props: ['id'],
  data () {
    return {
      duration: 500,
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
  },
  mounted () {
    this.jump()
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
  left: -35px;
  transform: scale(0.8);
}
.jumping-shit[data-jumping] {
  transform: translateY(-35px) scale(1);
  opacity: .9;
}
</style>
