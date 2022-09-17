<template>
    <NavigateBar />
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="mb-3 btn-area">
                        <button type="submit" class="btn btn-primary">登录</button>
                    </div>
                </form>
            </div>
        </div>
    </ContentBase>
    <BottomBar></BottomBar>
</template>
    
<script>
import NavigateBar from '../components/NavigateBar.vue';
import ContentBase from '../components/ContentBase.vue';
import BottomBar from '../components/BottomBar.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
    name: 'LoginView',
    components: {
        NavigateBar,
        ContentBase,
        BottomBar,
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');

        const login = () => {
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    router.push({
                        name: 'home'
                    });
                },
                error() {
                }
            });
        };

        return {
            username,
            password,
            login,
        }
    }
}
</script>
    
<style scoped>
.error-message {
    color: red;
}

.btn-area {
    display: flex;
    justify-content: center;
}
</style>