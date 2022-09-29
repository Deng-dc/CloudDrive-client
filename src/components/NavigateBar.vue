<template>
  <nav class="navbar navbar-expand-lg navbar-light navigater" style="background-color:#e0f2fd;">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">Cloudrive</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'mydrive', params: {userName: $store.state.user.username}}"
              v-if="$store.state.user.is_login">我的网盘
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="!$store.state.user.is_login">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'register'}">注册</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item user-area">
            <div class="user-icon">
              <!-- <el-icon>
                <User />
              </el-icon> -->
              <el-image class="user-icon-image" style="width: 50px; height: 50px"
                src="https://avatars.githubusercontent.com/u/90923078?v=4" fit="contain" />
            </div>
            <div class="user-name">
              <router-link class="nav-link" :to="{name: 'myprofile', params: {userId: $store.state.user.id}}">
                {{$store.state.user.username}}</router-link>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="cursor: pointer" @click="logout">退出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'NavigateBar',
  setup() {
    const store = useStore();
    const logout = () => {
      store.commit('logout');
    };

    return {
      logout,
    }
  },
}

</script>

<style scoped>
.navbar-brand {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 3rem;
}

li {
  font-size: 1.3rem;
}

.user-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.user-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 4%;
}

.user-icon-image {
  border-radius: 50%;
}

.user-name {
  font-weight: bold;
}
</style>