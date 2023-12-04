<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)

// 当前用户角色
const userRoleTitleList = ref([])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'updateRole'])

/**
 * 确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  console.log('userRoleTitleList', userRoleTitleList.value)
  console.log('allRoleList', allRoleList.value)
  // 处理数据结构
  const roles = userRoleTitleList.value.map(title => {
    return allRoleList.value.find(role => role.title === title)
  })
  await updateRole(props.userId, roles)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 角色更新成功
  emits('updateRole')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

/**
 * 获取当前用户角色
 */
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  console.log(res)
  userRoleTitleList.value = res.role.map((item) => item.title)
}
/**
 * 因为该 `userId` 需要在 `user-manage` 用户点击之后获取当前点击行的 `id`。
 * 所以在 `roles` 组件的初始状态下，获取到的 `userId` 为 `null` 。
 * 因此我们想要根据 `userId` 获取用户当前角色数据的话，
 * 我们需要 `watch userId` 在 `userId` 有值的前提下，获取数据
 */
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
