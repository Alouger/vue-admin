<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <!-- <i class="el-icon-upload" /> -->
      <el-icon class="el-icon-upload"><upload-filled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { defineProps, ref } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function
})

/**
 * 点击上传触发
 */
const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  // loading.value = true
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  // 对于当前场景，用户只能选择一个文件，那必定是传入文件中的第一个文件
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

/**
 * 触发上传事件
 */
const upload = (rawFile) => {
  // 注意excelUploadInput是ref变量
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回true才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 读取数据（异步）
 */
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    /**
     * FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，
     * 使用 File 或 Blob 对象指定要读取的文件或数据。
     * 其中 File 对象可以是来自用户在一个<input>元素上选择文件后返回的FileList对象，
     * 也可以来自拖放操作生成的 DataTransfer对象，
     * 还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。
     */
    const reader = new FileReader()
    // onload处理load事件。该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用XLSX对数据进行解析，并将数据转换为数组格式存储在workbook变量中。
      const workbook = XLSX.read(data, {
        type: 'array'
      })
      // 3. 获取第一张表格（工作簿）名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取Sheet（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }

    // 启动读取指定的 Blob 或 File 内容。
    // readAsArrayBuffer方法用于开始读取指定的 Blob中的内容，一旦完成，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象。
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
  // 上传中跳过
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.erroe('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}

/**
 * 拖拽悬停时触发
 * 当拖拽事件发生时，将拖拽数据的 dropEffect 设置为 'copy'，即将数据复制到目标位置。
 */
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    width: 350px;
    height: 160px;
    border: 1px dashed #bbb;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    align-items: center;
    .el-icon-upload {
      font-size: 60px;
    }
  }
}
</style>
