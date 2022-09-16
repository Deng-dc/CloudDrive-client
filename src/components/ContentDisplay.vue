<template>
<div class="container">
    <div class="card">
        <div class="card-header">
            <ToolBar />
        </div>
        <div class="card-body">
            <ContentArea />
        </div>
    </div>
</div>
</template>

<script>
import ToolBar from './ToolBar.vue';
import ContentArea from './ContentArea.vue';

export default{
    name: "ContentDisplay",
    components: {
        ToolBar,
        ContentArea,
    }
}
</script>

<style scoped>

</style>