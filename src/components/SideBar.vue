<template>
    <div class="row">
        <div class="card" style="width: 18rem;">
            <div class="card-body card-body-top">
                Cloudrive
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item all-file">
                        <a>
                            我的文件
                        </a>
                    </li>
                    <li class="list-group-item my-picture">
                        <a>
                            图片
                        </a>
                    </li>
                    <li class="list-group-item my-document">
                        <a>
                            文档
                        </a>
                    </li>
                    <li class="list-group-item my-audio">
                        <a>
                            音频
                        </a>
                    </li>
                    <li class="list-group-item my-video">
                        <a>
                            视频
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="app-icon-field">
                    <img class="app-icon" src="../assets/app.png">
                </div>
            </div>
            <div class="card-body card-body-bottom">
                Contact Me @ github.com/Deng-dc
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
}
</script>

<style scoped>
.card-body-top {
    font-family: 'Courier New', Courier, monospace;
    font-size: 2rem;
    text-align: center;
}

.card-body-bottom {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    text-align: center;
}

li {
    text-align: center;
    font-family: "SimHei";
    font-size: 1rem;
}

a {
    cursor: pointer;
    font-size: 1.3rem;
}

.app-icon-field {
    text-align: center;
}

.app-icon {
    width: 5rem;
    height: 5rem;
}

li:hover {
    background-color: rgb(240, 249, 253);
}
</style>