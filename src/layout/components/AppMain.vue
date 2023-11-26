<template>
  <div class="app-main">
    <!-- router-link 实现路由之间的跳转
         router-view 当你的路由path 与访问的地址相符时，会将指定的组件替换该 router-view -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
