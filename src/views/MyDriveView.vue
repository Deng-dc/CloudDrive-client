<template>
  <NavigateBar />
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-3">
        <SideBar />
      </div>
      <div class="col-9">
        <ContentDisplay />
      </div>
    </div>
  </div>
</template>

<script>
import NavigateBar from '../components/NavigateBar.vue';
import SideBar from '../components/SideBar.vue';
import ContentDisplay from '../components/ContentDisplay.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'MyDriveView',
  components: {
    NavigateBar,
    SideBar,
    ContentDisplay,
  },
  setup() {
    const username = computed(() => useStore().state.user.username);
    const homeUrl = "http://192.168.100.7:8066/drive/" + username.value + "/";

    return {
      username,
      homeUrl,
    };
  },
}
</script>

<style scoped>

</style>
