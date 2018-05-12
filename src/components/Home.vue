<template>
  <div class="container">
    <div class="titles">
      <h1 class="highlight">Idle, please</h1>
      <div>The perfectly pointless game</div>
    </div>

    <div class="game-container centered-content">
      <game></game>
    </div>
  </div>
</template>

<script>
import Game from './Game.vue'
export default {
  name: 'home',
  components: { Game },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  padding: 0 15px;

  display: flex;
  flex-direction: column;
}
h1 {
  padding: 15px 0 5px 0;
  font-size: 2em;
  margin: 0;
}
.titles:hover {
  color: #dfe9f3;
}
.game-container {
  margin: 15px 0 15px 0;
  background-color: #67798b;
  border-radius: 5px;
  box-shadow: 10px 10px 0px rgba(0,0,0,.26);

  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
