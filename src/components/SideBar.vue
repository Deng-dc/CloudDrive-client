<template>
    <div class="row">
        <div class="card" style="width: 18rem;">
            <div class="card-body card-body-top">
            </div>
            <el-divider />
            <div class="card-body">
                <el-card v-for="item in choice" :key="item.id" class="box-card" shadow="hover">
                    <div class="side-choice">{{ item.content }}</div>
                </el-card>
            </div>
            <div class="card-body card-body-bottom">
                Contact Me : github.com/Deng-dc
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    setup() {
        const choice = [
            {
                id: "1",
                content: "全部文件",
            },
            {
                id: "2",
                content: "图片",
            }, {
                id: "3",
                content: "文档",
            },
            {
                id: "4",
                content: "音频",
            },
            {
                id: "5",
                content: "视频",
            }
        ];

        return {
            choice,
        }
    }
}
</script>

<style scoped>
.card-body-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card-body-bottom {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    text-align: center;
}

.box-card {
    cursor: pointer;
}

.box-card:hover {
    background-color: #e0f2fd;
}

.side-choice {
    text-align: center;
}
</style>