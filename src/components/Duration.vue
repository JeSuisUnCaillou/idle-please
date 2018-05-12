<template>
  <span>
    <span v-if="hours > 0">
      <span class="highlight">
        {{hours}}
      </span>
      <span>
        {{hours > 1 ? 'hours' : 'hour'}}
      </span>
    </span>
    <span v-if="minutes > 0">
      <span class="highlight">
        {{minutes}}
      </span>
      <span>
        min
      </span>
    </span>
    <span v-if="seconds > 0">
      <span class="highlight">
        {{seconds}}
      </span>
      <span>
        sec
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'duration',
  props: ['amount'],
  computed: {
    hours () {
      return Math.floor(this.amount / 3600)
    },
    minutes () {
      return Math.floor((this.amount - (this.hours * 3600)) / 60)
    },
    seconds () {
      return this.amount - (this.hours * 3600) - (this.minutes * 60)
    }
  }
}
</script>

<style scoped>

</style>
