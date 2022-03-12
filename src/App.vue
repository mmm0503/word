<template>
  <div id="app">
    <Myquill></Myquill>
  </div>
</template>

<script>
import Myquill from "./components/quill/myquill.vue";
export default {
  name: 'App',
  components: {
    Myquill
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  margin-left: 60px;
}
</style>
