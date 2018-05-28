<template>
  <div class="bg-container">
    <div class="container">
      <div class="titles">
        <h1><span class="highlight">Idle,</span> please</h1>
        <div>The perfectly <span class="highlight">pointless</span> game</div>
      </div>
      <div class="game-container">
        <game></game>
      </div>
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
.bg-container {
  height: 100%;
  /* background: rgb(2,0,36);
  background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(60,60,93,1) 35%, rgba(163,197,204,1) 100%); */
  background-color: black;
  background-image: url('/static/images/sunset.jpg');
  background-position: bottom;
  background-size: cover;
}
.container {
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.titles {
  color: #bad4ee;
}
h1 {
  padding: 15px 0 5px 0;
  font-size: 2em;
  margin: 0;
}
.game-container {
  margin: 15px 0 15px 0;
  background-color: #67798b;
  background-image: url('/static/images/trianglify-darkblue.svg');
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,1);

  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 768px) {
  .game-container {
    max-height: 600px;
  }
  .container {
    max-width: 600px;
  }
}
</style>
