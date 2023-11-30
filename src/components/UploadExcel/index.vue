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

<script setup></script>

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
    height: 160px;;
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
