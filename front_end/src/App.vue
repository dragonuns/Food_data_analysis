<template>
  <!-- 项目主体框架 -->
  <div id="app">
    <!-- 路由展示，路由匹配的组件会渲染在这里 -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="stylus">
html, body, #app {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
