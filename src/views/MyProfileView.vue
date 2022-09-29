<template>
    <NavigateBar />
    <div class="common-layout">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-10">
                    <el-card>
                        <div class="account-content-header">
                            <h4>Welcome To Cloudrive Account</h4>
                        </div>
                        <el-divider />
                        <div class="account-content-body">
                            <div class="account-content-body-left col-4">
                                <el-avatar shape="circle" :size="250" fit="contain" class="user-avatar"
                                    src="https://avatars.githubusercontent.com/u/90923078?v=4" />
                                <div class="account-content-body-left-bottom">
                                    <el-upload ref="upload" class="upload-demo"
                                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                        :on-exceed="handleExceed" :auto-upload="false">
                                        <template #trigger>
                                            <el-button type="primary">select file</el-button>
                                        </template>
                                        <el-button class="ml-3 upload-avatar" type="success" @click="submitUpload">
                                            upload to server
                                        </el-button>
                                        <template #tip>
                                            <div class="el-upload__tip text-red">
                                                limit 1 file, new file will cover the old file
                                            </div>
                                        </template>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="account-content-body-right col-6">
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavigateBar from "../components/NavigateBar.vue";

export default {
    name: "MyProfileView",
    components: {
        NavigateBar,
    },
    setup() {

        return {

        }
    }
}
</script>

<style scoped>
.card-body {
    display: flex;
    justify-content: center;
    height: 50%;
}

.account-content-header {
    text-align: center;
}

.account-content-body {
    display: flex;
    flex-direction: column;
}

.user-avatar {
    cursor: pointer;
}

.upload-avatar {
    margin-left: 1%;
}
</style>