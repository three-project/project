<template>
  <div id="app">
    <NavBanner />
    <router-view />
    <NavFooter />
  </div>
</template>

<script>
import NavBanner from "./components/NavBanner/NavBanner";
import NavFooter from "./components/NavFooter/NavFooter";
export default {
  name: "App",
  components: {
    NavBanner,
    NavFooter,
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 1200px;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background: #f6f6f6;
}
</style>
