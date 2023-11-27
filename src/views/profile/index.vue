<template>
  <div class="">
    {{ $t('msg.test') }}
  </div>

  <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    />
</template>

<script setup>
// import { ref, onMounted } from 'vue'

// const pagination = ref(null)

// onMounted(() => {
//   console.log('pagination', pagination.value)
// })

</script>

<style lang="scss" scoped></style>
