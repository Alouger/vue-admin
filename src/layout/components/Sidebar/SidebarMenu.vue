<template>
  <!-- 一级menu菜单 -->
  <!-- unique-opened 是否只保持一个子菜单的展开 -->
  <!-- default-active 页面加载时默认激活菜单的 index -->
  <!-- router 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项。 -->
  <!-- collapse 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :unique-opened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
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
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()

// 默认激活的菜单项，计算高亮menu的方法，即实现刷新后还高亮激活显示刷新前的菜单项页面
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})
console.log(routes.value)
console.log(JSON.stringify(routes.value))
</script>

<style scoped></style>
