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
                            <div v-if="isLogin" class="account-content-body-left col-4">
                                <div class="account-content-body-left-top">
                                    <el-avatar shape="circle" :size="150" fit="fill" class="user-avatar"
                                        :src="avatarSrc" />
                                </div>
                                <div class="account-content-body-left-bottom">
                                    <el-upload name="avatar" :action="avatarUrl" :limit="1"
                                        :on-success="uploadAvatarSuccess" :before-upload="getAvatarUploadUrl">
                                        <template #trigger>
                                            <el-button class="change-avatar-btn" type="primary">更换头像</el-button>
                                        </template>
                                    </el-upload>
                                </div>
                            </div>
                            <div v-else class="account-content-body-left col-4">
                                <el-avatar :icon="UserFilled" shape="circle" :size="150" />
                            </div>
                            <div class="account-content-body-right col-6">
                                <el-descriptions title="Your profile" direction="vertical" :column="4" :size="size">
                                    <el-descriptions-item v-if="isLogin" label="Username">{{username}}
                                    </el-descriptions-item>
                                    <el-descriptions-item v-else label="Username">----------</el-descriptions-item>
                                    <el-descriptions-item v-if="isLogin" label="Nickname">{{nickname}}
                                    </el-descriptions-item>
                                    <el-descriptions-item v-else label="Nickname">----------</el-descriptions-item>
                                </el-descriptions>
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
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { UserFilled } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";

export default {
    name: "MyProfileView",
    components: {
        NavigateBar,
    },
    setup() {
        const store = useStore();
        let avatarUrl = ref('');
        let avatarSrc = ref('');
        let isLogin = ref();
        let username = ref('');
        let nickname = ref('');
        const router = useRouter();

        onMounted(() => {
            console.log("into onMounted !");
            avatarSrc.value = store.state.user.profpic;
            isLogin.value = store.state.user.is_login;
            username.value = store.state.user.username;
            nickname.value = store.state.user.nickname;
        });

        const getAvatarUploadUrl = () => {
            console.log("before upload");
            // avatarUrl.value = "http://192.168.31.203:8066/uploadFaceImg/?username=" + store.state.user.username;
            avatarUrl.value = "http://192.168.0.16:8066/uploadFaceImg/?username=" + store.state.user.username;
            console.log("get avatarUpload url : " + avatarUrl.value);
        }

        const uploadAvatarSuccess = (response) => {
            console.log("response code : " + response.code);
            console.log("avatar url : " + response.data);
            // avatarSrc.value = response.data;
            if (response.code === 1000) {
                // TODO 在更换头像或者修改个人信息后后需要几秒延时提示用户正在跳转到登录页面
                const loading = ElLoading.service({
                    lock: true,
                    text: '头像上传成功, 正为您跳转至登录页',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                setTimeout(() => {
                    loading.close();
                    store.commit("logout");
                    router.push({
                        path: "/login/"
                    });
                }, 3000)
            }
        }

        return {
            avatarUrl,
            avatarSrc,
            getAvatarUploadUrl,
            uploadAvatarSuccess,
            UserFilled,
            isLogin,
            username,
            nickname,
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
    flex-direction: row;
    justify-content: center;
}

.account-content-body-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.user-avatar {
    cursor: pointer;
}

.change-avatar-btn {
    margin-left: 60%;
}
</style>