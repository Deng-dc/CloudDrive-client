<template>
  <div class="card-header">
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <div class="new-dir-btn">
        <button type="button" class="btn btn-outline-primary">新建文件夹</button>
      </div>
      <div class="download-btn">
        <button type="button" class="btn btn-outline-primary">下载</button>
      </div>
    </div>
  </div>
  <div class="card-body path-navigate">
    <el-breadcrumb separator="/" style="cursor: pointer;">
      <el-breadcrumb-item @click="getHomeDirFiles">全部文件</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="card-body content-area">
    <el-table ref="multipleTableRef" :data="tableData" height="250" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="文件名" width="400" />
      <el-table-column label="修改日期" width="200">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="address" label="大小" width="120" />
    </el-table>
  </div>
  <div class="card-body upload-area">
    <el-upload class="upload-demo" drag :action="uploadUrl">
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
import $ from 'jquery';
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue'


export default {
  name: "ContentArea",
  components: {
    UploadFilled,
  },
  setup() {
    const store = useStore();
    const file = reactive({
      filename: "",
      is_directory: "",
      fileSize: "",
      lastModifyTime: "",
    });
    const tableData = [
      {
        date: '2016-05-07',
        name: 'fileDisplayTest.txt',
        address: '12MB',
      },
      {
        date: '2016-05-07',
        name: 'fileDisplayTest.txt',
        address: '12MB',
      },
      {
        date: '2016-05-07',
        name: 'fileDisplayTest.txt',
        address: '12MB',
      },
      {
        date: '2016-05-07',
        name: 'fileDisplayTest.txt',
        address: '12MB',
      },
      {
        date: '2016-05-07',
        name: 'fileDisplayTest.txt',
        address: '12MB',
      },
      {
        date: '2016-05-07',
        name: 'fileDisplayTest.txt',
        address: '12MB',
      },
    ];

    const getHomeDirFiles = () => {
      let root = store.state.user.user_drive_root_url;
      $.ajax({
        url: root,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success(resp) {
          console.log(resp);
          console.log(resp.data);
          console.log(resp.data[0]);
          console.log(resp.data[0].filename);
        }
      });
    };

    const handleSelectionChange = () => {
      console.log("handleSelectionChange");
    }

    let directory = "photo"
    const uploadUrl = "http://192.168.31.203:8066/upload/?directory=" + directory + "&token=" + store.state.user.access;

    return {
      getHomeDirFiles,
      uploadUrl,
      file,
      tableData,
      handleSelectionChange,
    }
  }
}
</script>

<style scoped>
.new-dir-btn {
  margin-left: 1rem;
}

.download-btn {
  margin-left: 1rem;
}

.upload-file {
  opacity: 0;
  width: 0;
}
</style>