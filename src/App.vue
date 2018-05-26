<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body, #app, main {
  height: 100%;
}
body {
  margin: 0;
}
#app {
}

</style>
