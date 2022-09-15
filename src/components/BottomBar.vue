<template>
    <ContentBase>
        <footer>
            <div class="foot-content">
                Contact Me : github.com/Deng-dc
            </div>
        </footer>
    </ContentBase>
</template>

<script>
import ContentBase from './ContentBase.vue';

export default {
    name: "BottomBar",
    components: {
        ContentBase,
    },
}
</script>

<style scoped>
.foot-content{
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    font-weight: bold;
}
</style>