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
      <el-breadcrumb-item @click="getDistDirFiles">全部文件</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in currentDir.path" :key="index" @click="getDistDirFiles">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="card-body content-area">
    <el-table ref="multipleTableRef" :data="tableData" height="250" style="width: 100%" @row-click="clickItem">
      <el-table-column type="selection" width="55" />
      <el-table-column property="filename" label="文件名" width="400" />
      <el-table-column property="lastModifyTime" label="修改日期" width="200" />
      <el-table-column property="fileSize" label="大小" width="120" />
    </el-table>
  </div>
  <div class="card-body upload-area">
    <el-upload class="upload-demo" drag :action="uploadUrl" :before-upload="getUploadDirectory">
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
import { ref } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue'


export default {
  name: "ContentArea",
  components: {
    UploadFilled,
  },
  setup() {
    const store = useStore();
    let tableData = reactive([]);
    let currentDir = reactive({
      path: [],
    });

    const getDistDirFiles = () => {
      let requestUrl = store.state.user.user_drive_root_url + "?path=" + "";
      console.log("requestUrl : " + requestUrl);
      $.ajax({
        url: requestUrl,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success(resp) {
          let fileList = resp.data;
          // 每次都需要先清空tableData的数据
          tableData.splice(0, tableData.length);
          for (let i = 0; i < fileList.length; i++) {
            tableData.push(fileList[i]);
          }
          console.log(tableData);
        }
      });
    };

    let uploadUrl = ref('');

    const getUploadDirectory = () => {
      console.log("into before-upload");
      // let directory = "";
      // for (let dir of currentDir.path) {
      //   directory = directory + dir + "\\";
      // }
      // console.log("directory : " + directory);
      uploadUrl.value = "http://192.168.100.7:8066/upload/?directory=" + currentDir.path + "&token=" + store.state.user.access;
      console.log("getUploadDirectory uploadUrl : " + uploadUrl.value);
    }

    const clickItem = (row) => {
      if (row.fileSize === "-") {
        // 仅当是目录的时候才能进入下一个目录
        currentDir.path.push(row.filename);
        let requestUrl = store.state.user.user_drive_root_url + "?path=" + currentDir.path;
        console.log("requestUrl : " + requestUrl);
        $.ajax({
          url: requestUrl,
          type: "GET",
          dataType: "json",
          contentType: "application/json",
          success(resp) {
            let fileList = resp.data;
            tableData.splice(0, tableData.length);
            for (let i = 0; i < fileList.length; i++) {
              tableData.push(fileList[i]);
            }
            console.log(tableData);
          },
        });
      } else {
        console.log("文件暂不支持在线打开");
      }
    }

    return {
      getDistDirFiles,
      uploadUrl,
      // file,
      tableData,
      clickItem,
      currentDir,
      getUploadDirectory,
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