<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <!-- node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
         show-checkbox 节点是否可被选择
         check-strictly 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false -->
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { rolePermission, distributePermission } from '@/api/role'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

const emits = defineEmits(['update:modelValue'])

/**
 * 确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
  console.log(allPermission.value)
}
getPermissionList()
watchSwitchLang(getPermissionList)

// 根据获取到的数据渲染选中的tree
const treeRef = ref(null)
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  // setCheckedKeys 设置目前选中的节点，使用此方法必须设置 node-key 属性
  treeRef.value.setCheckedKeys(checkedKeys)
  console.log(checkedKeys)
}
watch(() => props.roleId, val => {
  if (val) getRolePermission()
})

</script>

<style lang="scss" scoped></style>
