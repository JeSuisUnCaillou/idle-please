<template>
  <span class="relative-container">
    <jumping-shit v-for="shit in shits"
                  @done="deleteShit"
                  :key="shit"
                  :id="shit">
      <span class="primary-text">+</span><span class="highlight">1</span> s
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
      shits: [],
      shitId: 0
    }
  },
  methods: {
    addShit () {
      this.shitId += 1
      this.shits.push(this.shitId)
    },
    deleteShit (id) {
      this.shits.splice(this.shits.indexOf(id), 1)
    },
    jump () {
      this.addShit()
    }
  }
}
</script>

<style scoped>
.relative-container {
  position: relative;
}
</style>
