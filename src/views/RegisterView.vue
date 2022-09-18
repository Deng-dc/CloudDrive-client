<template>
    <NavigateBar />
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="mb-3">
                        <label for="password_confirm" class="form-label">确认密码</label>
                        <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
                    </div>
                    <div class="mb-3 register-button">
                        <button type="submit" class="btn btn-primary">注册</button>
                    </div>
                </form>
            </div>
        </div>
    </ContentBase>
    <BottomBar />
</template>
    
<script>
import NavigateBar from '../components/NavigateBar.vue';
import ContentBase from '../components/ContentBase.vue';
import BottomBar from '../components/BottomBar.vue';
import { ref } from 'vue';
import $ from 'jquery';
import router from '@/router/index';

export default {
    name: 'RegisterView',
    components: {
        NavigateBar,
        ContentBase,
        BottomBar,
    },
    setup() {
        let username = ref('');
        let password = ref('');
        let password_confirm = ref('');
        console.log("username: " + username.value);
        console.log("password: " + password.value);
        if (password.value != password_confirm.value) {
            console.log("密码不一致");
        }


        const register = () => {
            let user = {
                username: username.value,
                password: password.value,
            }
            let userStr = JSON.stringify(user);
            $.ajax({
                url: "http://192.168.100.7:8066/register/",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: userStr,
                success(resp) {
                    console.log(resp);
                    if (resp.msg === "success") {
                        router.push({ name: 'login' });
                    }
                },

            });
        };

        return {
            register,
            username,
            password,
            password_confirm,
        }
    }
}
</script>
    
<style scoped>
.register-button {
    display: flex;
    justify-content: center;
}
</style>