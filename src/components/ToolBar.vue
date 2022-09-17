<template>
    <div class="btn-group" role="group" aria-label="Basic outlined example">
        <div class="upload-btn">
            <button type="button" class="btn btn-outline-primary">上传</button>
        </div>
        <div class="new-dir-btn">
            <button type="button" class="btn btn-outline-primary">新建文件夹</button>
        </div>
        <div class="download-btn">
            <button type="button" class="btn btn-outline-primary">下载</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToolBar",
}
</script>

<style scoped>
.new-dir-btn {
    margin-left: 1rem;
}

.download-btn {
    margin-left: 1rem;
}
</style>