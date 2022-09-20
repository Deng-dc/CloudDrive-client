<template>
  <div class="card-header">
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <div class="upload-btn">
        <!-- <button type="button" class="btn btn-outline-primary">上传</button> -->
        <!-- <label for="upload" class="btn btn-outline-primary">上传</label> -->
        <!-- <input type="file" class="upload-file" id="upload" @change="upload"> -->
      </div>
      <div class="new-dir-btn">
        <button type="button" class="btn btn-outline-primary">新建文件夹</button>
      </div>
      <div class="download-btn">
        <button type="button" class="btn btn-outline-primary">下载</button>
      </div>
    </div>
  </div>
  <div class="card-body path-navigate">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" style="cursor: pointer;" @click="getHomeDirFiles">
          全部文件
        </li>
      </ol>
    </nav>
  </div>
  <div class="card-body content-area">
    <ul v-if="homeDirList.length" class="list-group">
      <li v-for="item of homeDirList" :key="item.id">
        {{item}}
      </li>
    </ul>
    <ul v-if="homeFileList.length" class="list-group">
      <li v-for="item of homeFileList" :key="item.id">
        {{item}}
      </li>
    </ul>
  </div>
  <div class="card-body">
    <el-upload name="file" class="upload-demo" drag action="none" :auto-upload="false" :on-change="uploadFile">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
import $ from 'jquery';
import { useStore } from 'vuex';
import { reactive } from 'vue';

export default {
  name: "ContentArea",
  setup() {
    const store = useStore();
    let homeFileList = reactive([]);
    let homeDirList = reactive([]);

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
          let respList = resp.data;
          let i = 0;
          while (respList[i] != "=========") {
            i++;
          }
          let dirLength = i;
          homeDirList = respList.slice(0, dirLength);
          homeFileList = respList.slice(dirLength + 1, respList.length);
          console.log("文件夹列表 : " + homeDirList);
          console.log("文件列表 : " + homeFileList);
        }
      });
    };

    const uploadFile = (file, fileList) => {
      console.log(file);
      console.log(fileList);
      let data = new FormData();
      data.append("myfile", file);
      let directory = "photo"

      $.ajax({
        url: "http://192.168.31.203:8066/upload/?directory=" + directory + "&token=" + store.state.user.access,
        type: "POST",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
      });
    };

    return {
      getHomeDirFiles,
      homeDirList,
      homeFileList,
      uploadFile,
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