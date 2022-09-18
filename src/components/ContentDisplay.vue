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
import { ref } from 'vue';
import $ from 'jquery';

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
    setup(props) {
        const homeUrl = ref(props.homeUrl);
        const username = ref(props.username);
        console.log(username.value);
        console.log(homeUrl.value);

        const getHomeDirFiles = () => {
            $.ajax({
                url: "http://192.168.100.7:8066/drive/test1/",
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                success(resp) {
                    console.log(resp);
                    const homeFiles = resp.data;
                    console.log(homeFiles);
                }
            });
        };

        return {
            getHomeDirFiles,
        }
    }
}
</script>

<style scoped>

</style>