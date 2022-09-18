<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <ToolBar />
            </div>
            <div class="card-body path-navigate">
                <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" style="cursor: pointer;" @click="getHomeDirFiles">
                            全部文件
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
// import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: "ContentDisplay",
    components: {
        ToolBar,
        ContentArea,
    },
    props: {
        username: String,
        homeUrl: String,
    },
    setup() {
        const store = useStore();
        const getHomeDirFiles = () => {
            let root = store.state.user.user_drive_root_url;
            console.log(root);
            $.ajax({
                url: root,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                success(resp) {
                    console.log(resp);
                    console.log(resp.data);
                }
            });
        }

        return {
            getHomeDirFiles,
        }
    }
}
</script>

<style scoped>

</style>