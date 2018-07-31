<template>
  <span class="relative-container">
    <jumping-shit v-for="(shit, index) in shits"
                  @done="deleteShit(index)"
                  :key="index"
                  v-if="shit"
                  :ref="`shit-${index}`">
    </jumping-shit>
  </span>
</template>

<script>
import JumpingShit from './JumpingShit.vue'
export default {
  name: 'jumping-shits',
  components: { JumpingShit },
  data () {
    return {
      shits: {},
      shitId: 0
    }
  },
  methods: {
    addShit () {
      this.shitId += 1
      this.$set(this.shits, this.shitId, true)
    },
    deleteShit () {
      // this.$set(this.shits, this.shitId, false)
      delete this.shits[this.shitId]
    },
    jump () {
      console.log('jump')
      this.addShit()
      setTimeout(() => {
        this.$refs[`shit-${this.shitId}`][0].jump()
      }, 0)
    }
  }
}
</script>

<style scoped>
.relative-container {
  position: relative;
}
</style>
