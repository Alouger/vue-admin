<template>
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <!-- 渲染标题和图标 -->
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 渲染children，循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-submenu>
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'

defineProps({
  route: {
    type: Object,
    require: true
  }
})
</script>

<style lang="scss" scoped></style>
