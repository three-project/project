<template>
  <div id="app">
    <NavBanner/>
    <detail/>
    <NavFooter/>
  </div>
</template>

<script>
//引入detail详情页
import detail from "../src/pages/detail";
export default {
  name: "App",
  components: {
    detail,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
