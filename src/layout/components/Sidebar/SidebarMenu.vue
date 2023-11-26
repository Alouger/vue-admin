<template>
  <!-- 一级menu菜单 -->
  <!-- unique-opened 是否只保持一个子菜单的展开 -->
  <!-- default-active 页面加载时默认激活菜单的 index -->
  <el-menu
    :unique-opened="true"
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})
console.log(routes.value)
console.log(JSON.stringify(routes.value))
</script>

<style scoped></style>
