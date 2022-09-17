<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">Cloudrive</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'home'}">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'help'}">帮助</router-link>
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
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'myprofile', params: {userId: $store.state.user.id}}">
              {{$store.state.user.username}}</router-link>
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
</style>