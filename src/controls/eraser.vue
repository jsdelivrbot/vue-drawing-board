<template>
    <control @click="onClick">
        <div slot="symbol">xp</div>
        <div slot="text">橡皮</div>
    </control>
</template>

<script>
import Base from "../control-base/base.vue";
import ControlPlugin from "../control-base/index";
const Component = Base.extend({
    data() {
        return {};
    },
    props: {
        container: Object
    },
    methods: {
        onClick(evt){
            const current = this.container.current;
            const stage = current.stage.elem;
            const layer = current.layer.elem;
            const ctx = layer.getContext();

            ctx.globalCompositeOperation = 'destination-out';
        }
    },
    created() {
    },
    mounted() {
        this.$on("containerMounted", container => {

        });
    }
});

Component.use(ControlPlugin);

export default Component;
</script>

<style>

</style>
