<template>
  <div class="">{{ detailData }}</div>
</template>

<script setup>
import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { defineProps, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id)
}
getUserDetail()
watchSwitchLang(getUserDetail)
</script>

<style lang="scss" scoped></style>
