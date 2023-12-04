<template>
  <div class="">
    <el-card>
      <!-- 当 row 中包含 children 字段时，被视为树形数据。
        渲染嵌套数据需要 prop 的 row-key。 此外，子行数据可以异步加载。
        设置 Table 的lazy属性为 true 与加载函数 load 。
        通过指定 row 中的hasChildren字段来指定哪些行是包含子节点。
        children 与hasChildren都可以通过 tree-props 配置。
        如果不是懒加载的话，后端不要设置hasChildren 这个属性，
        要不然不能树形显示；如果是懒加载，则需要设置hasChildren字段。 -->
      <el-table
        :data="allPermission"
        border
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          :label="$t('msg.permission.name')"
          prop="permissionName"
          width="180"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.mark')"
          prop="permissionMark"
          width="180"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.desc')"
          prop="permissionDesc"
          width="180"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */
// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
