<template>
  <div class="card-header">
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <div class="new-dir-area">
        <div class="refresh-btn" @click="getHomeDirFiles">
          <el-icon>
            <Refresh />
          </el-icon>
        </div>
        <div class="new-dir-input">
          <el-input v-model="newDirname" placeholder="input new dir name" />
        </div>
        <div class="new-dir-btn">
          <!-- <button type="button" class="btn btn-outline-primary" @click="createDir">新建文件夹</button> -->
          <el-button size="small" type="primary" round @click="createDir">新建文件夹</el-button>
        </div>
      </div>
      <div class="download-btn">
        <!-- <button type="button" class="btn btn-outline-primary">下载</button> -->
        <el-button size="small" type="primary" round>下载</el-button>
      </div>
    </div>
  </div>
  <div class="card-body path-navigate">
    <el-breadcrumb separator="/" style="cursor: pointer;">
      <el-breadcrumb-item @click="getHomeDirFiles">全部文件</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in currentDir" :key="item.id" @click="getDistDirFiles(item)">
        {{item.path}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="card-body content-area">
    <el-table class="content-area-table" ref="multipleTableRef" :data="tableData" height="250" style="width: 100%"
      @row-click="clickItem">
      <el-table-column type="selection" width="55" />
      <el-table-column>
        <template #default="scope">
          <el-icon v-if="scope.row.fileTypeCode === '0'">
            <Folder />
          </el-icon>
          <el-icon v-else-if="scope.row.fileTypeCode === '1'">
            <PictureFilled />
          </el-icon>
          <el-icon v-else-if="scope.row.fileTypeCode === '2'">
            <DocumentCopy />
          </el-icon>
          <el-icon v-else-if="scope.row.fileTypeCode === '3'">
            <Headset />
          </el-icon>
          <el-icon v-else-if="scope.row.fileTypeCode === '4'">
            <VideoPlay />
          </el-icon>
          <el-icon v-else-if="scope.row.fileTypeCode === '5'">
            <QuestionFilled />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column property="filename" label="文件名" width="400" />
      <el-table-column property="lastModifyTime" label="修改日期" width="200" />
      <el-table-column property="fileSize" label="大小" width="120" />
    </el-table>
    <!-- <el-dialog v-model="dialogVisible" title="预览" draggable>
      <div class="preview-image-area">
        <el-image style="width: 200px; height: 200px" :src="pictureAccessUrl" fit="contain" />
      </div>
    </el-dialog> -->
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
import { onMounted, reactive } from 'vue';
import { ref } from 'vue';
import { UploadFilled, Folder, DocumentCopy, PictureFilled, Headset, VideoPlay, QuestionFilled, Refresh } from '@element-plus/icons-vue'


export default {
  name: "ContentArea",
  components: {
    UploadFilled,
    Folder,
    DocumentCopy,
    PictureFilled,
    Headset,
    VideoPlay,
    QuestionFilled,
    Refresh
  },
  setup() {
    const store = useStore();
    let tableData = reactive([]);
    let currentDir = reactive([]);
    let uploadUrl = ref('');
    let newDirname = ref('');
    const dialogVisible = ref(false);
    let pictureAccessUrl = ref('');

    onMounted(() => {
      console.log("into onMounted !");
      getHomeDirFiles();
    })

    // 新疆文件夹
    const createDir = () => {
      let createDirName = newDirname.value;
      newDirname.value = "";
      let path = [];
      for (let dir of currentDir) {
        path.push(dir.path);
      }
      $.ajax({
        // url: "http://192.168.31.203:8066/createNewDir/?path=" + path + "&newDir=" + createDirName + "&token=" + store.state.user.access,
        url: "http://192.168.0.16:8066/createNewDir/?path=" + path + "&newDir=" + createDirName + "&token=" + store.state.user.access,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success(resp) {
          console.log(resp.code);
          if (resp.code === 1000) {
            // 创建文件夹成功
            $.ajax({
              url: store.state.user.user_drive_root_url,
              type: "POST",
              data: JSON.stringify(currentDir),
              dataType: "json",
              contentType: "application/json",
              success(resp) {
                let fileList = resp.data;
                tableData.splice(0, tableData.length);
                for (let i = 0; i < fileList.length; i++) {
                  tableData.push(fileList[i]);
                }
              },
            });
          }
        }
      });
    }

    // 获取根目录下的文件
    const getHomeDirFiles = () => {
      // 每次回到根目录都需要清空当前的目录数组currentDir
      currentDir.splice(0, currentDir.length);
      let requestUrl = store.state.user.user_drive_root_url;
      // console.log("requestUrl : " + requestUrl);
      $.ajax({
        url: requestUrl,
        type: "POST",
        data: JSON.stringify([]),
        dataType: "json",
        contentType: "application/json",
        success(resp) {
          let fileList = resp.data;
          // 每次都需要先清空tableData的数据
          tableData.splice(0, tableData.length);
          for (let i = 0; i < fileList.length; i++) {
            tableData.push(fileList[i]);
          }
        }
      });
    }

    // 获取点击目录下的文件
    const getDistDirFiles = (item) => {
      let index = 0;
      for (let i = 0; i < currentDir.length; i++) {
        if (item.id === currentDir[i].id) {
          index = i;
          break;
        }
      }
      currentDir.splice(index + 1, currentDir.length - index - 1);
      let requestUrl = store.state.user.user_drive_root_url;
      $.ajax({
        url: requestUrl,
        type: "POST",
        data: JSON.stringify(currentDir),
        dataType: "json",
        contentType: "application/json",
        success(resp) {
          let fileList = resp.data;
          // 每次都需要先清空tableData的数据
          tableData.splice(0, tableData.length);
          for (let i = 0; i < fileList.length; i++) {
            tableData.push(fileList[i]);
          }
        }
      });
    };

    // 获取当前上传的目录
    const getUploadDirectory = () => {
      // console.log("into before-upload");
      // console.log("currentDir : " + JSON.stringify(currentDir));
      let directory = [];
      for (let dir of currentDir) {
        // console.log("dir : " + dir);
        // console.log("stringfy dir : " + JSON.stringify(dir));
        directory.push(dir.path);
      }
      // console.log("directory : " + directory);
      // uploadUrl.value = "http://192.168.31.203:8066/upload/?directory=" + directory + "&token=" + store.state.user.access;
      uploadUrl.value = "http://192.168.0.16:8066/upload/?directory=" + directory + "&token=" + store.state.user.access;
      // console.log("getUploadDirectory uploadUrl : " + uploadUrl.value);
    }

    // 点击栏目: 若是文件夹则进入 若是文件则预览或者下载
    const clickItem = (row) => {
      if (row.fileSize === "-") {
        // 仅当是目录的时候才能进入下一个目录
        currentDir.push({
          id: getUUID(),
          path: row.filename,
        });
        console.log("currentDir : " + JSON.stringify(currentDir));
        let requestUrl = store.state.user.user_drive_root_url;
        console.log("requestUrl : " + requestUrl);
        $.ajax({
          url: requestUrl,
          type: "POST",
          data: JSON.stringify(currentDir),
          dataType: "json",
          contentType: "application/json",
          success(resp) {
            let fileList = resp.data;
            console.log("click item : " + resp.data);
            tableData.splice(0, tableData.length);
            for (let i = 0; i < fileList.length; i++) {
              tableData.push(fileList[i]);
            }
            console.log(tableData);
          },
        });
      } else {
        dialogVisible.value = true;
        $.ajax({
          // url: "http://192.168.31.203:8066/loadFile/?fileTimestamp=" + row.lastModifyTime + "&filename=" + row.filename,
          url: "http://192.168.0.16:8066/loadFile/?fileTimestamp=" + row.lastModifyTime + "&filename=" + row.filename,
          type: "GET",
          dataType: "json",
          contentType: "application/json",
          success(resp) {
            console.log("pictureAccessUrl : " + resp.data);
            pictureAccessUrl = resp.data;
            window.open(pictureAccessUrl, "_blank");
          }
        });
      }
    }

    const getUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    return {
      createDir,
      getHomeDirFiles,
      getDistDirFiles,
      uploadUrl,
      newDirname,
      tableData,
      clickItem,
      currentDir,
      getUploadDirectory,
      getUUID,
      dialogVisible,
      pictureAccessUrl
    }
  }
}
</script>

<style scoped>
.new-dir-area {
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
}

.refresh-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 1rem;
  cursor: pointer;
}

.new-dir-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.new-dir-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
}

.download-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
}

.upload-file {
  opacity: 0;
  width: 0;
}

.content-area-table {
  cursor: pointer;
}

.preview-image-area {
  text-align: center;
}
</style>