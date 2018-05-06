<template>
    <control>
        <div slot="symbol">**</div>
        <div slot="text">笔</div>
    </control>
</template>

<script>
import Base from "../control-base/base.vue";
// import Vue from "vue";
import ControlPlugin from "../control-base/index";
const Component = Base.extend({
    data() {
        return {};
    },
    props: {
        container: Object
    },
    methods: {},
    created() {

    },
    mounted() {
        this.$on("containerMounted", container => {
            const current = container.current;
            const stage = current.stage.elem;
            const layer = current.layer.elem;
            const ctx = current.layer.context;

// TODO 是否一开始就激活
            ctx.strokeStyle = "#df4b26";
            ctx.lineJoin = "round";
            ctx.lineWidth = 5;
            ctx.globalCompositeOperation = "source-over";

            stage.on("mousedown", () => {
                this.isDrawing = true;
                this.lastPoint = stage.getPointerPosition();
                console.log(this.lastPoint);
            });

            stage.on("mousemove", () => {
                if (!this.isDrawing) {
                    return;
                }

                ctx.beginPath();
                ctx.moveTo(this.lastPoint.x, this.lastPoint.y);

                this.lastPoint = stage.getPointerPosition();

                ctx.lineTo(this.lastPoint.x, this.lastPoint.y);
                ctx.closePath();
                ctx.stroke();

                layer.draw();
            });

            stage.on("mouseup", () => {
                this.isDrawing = false;
                this.evb.$emit('saveHistory',{
                    layers:[this.container.current.layer]
                });
            });
        });
    }
});

Component.use(ControlPlugin);

export default Component;
</script>

<style>

</style>
