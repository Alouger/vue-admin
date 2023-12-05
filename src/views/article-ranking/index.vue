<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.publicDate')"
          prop="publicDate"
        >
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <el-button type="primary" size="small" @click="onShowClick(row)">{{
            $t('msg.article.show')
          }}</el-button>
          <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
            $t('msg.article.remove')
          }}</el-button>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :total="total"
        :current-page="pafge"
        :page-size="size"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 50, 100, 200]"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { getArticleList } from '@/api/article'
import { ref, onActivated } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
  console.log('result', result)
}
getListData()
// 监听语言切换
watchSwitchLang(getListData)
// 处理数据不重新加载的问题
onActivated(getListData)

/**
 * size改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped></style>
