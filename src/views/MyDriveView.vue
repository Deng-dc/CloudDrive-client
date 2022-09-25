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

export default {
  name: 'MyDriveView',
  components: {
    NavigateBar,
    SideBar,
    ContentDisplay,
  },
}
</script>

<style scoped>
.container {
  margin-top: 0;
}
</style>
