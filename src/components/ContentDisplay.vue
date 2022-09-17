<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <ToolBar />
            </div>
            <div class="card-body path-navigate">
                <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            全部文件
                        </li>
                        <li class="breadcrumb-item">
                            Library
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="card-body content-area">
                <ContentArea />
            </div>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar.vue';
import ContentArea from './ContentArea.vue';

export default {
    name: "ContentDisplay",
    components: {
        ToolBar,
        ContentArea,
    }
}
</script>

<style scoped>

</style>