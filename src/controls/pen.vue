<template>
    <control>
        <div slot="symbol">**</div>
        <div slot="text">笔</div>
    </control>
</template>

<script>
// import Base from "../control-base/base.vue";
import Vue from "vue";
import ControlPlugin from "../control-base/index";
const Component = Vue.extend({
    data() {
        return {};
    },
    props: {
        container: Object,
        event:Object
    },
    methods: {},
    created() {
        // TODO regist 默认的control  换周期
        // regist('pen',ControlPen);
    },
    mounted() {
        console.log("mounted", this.container.current.layer);
        this.event.$on("containerMounted", container => {
            debugger;
            console.log("containerMounted", container.current.layer);
        });

        // const current = this.container.current;
        // const layer = current.layer;
        // const ctx = layer.getContext();
        // const stage = current.stage;

        // ctx.strokeStyle = "#df4b26";
        // ctx.lineJoin = "round";
        // ctx.lineWidth = 5;
        // ctx.globalCompositeOperation = 'source-over';

        // stage.on("mousedown", () => {
        //     this.isDrawing = true;
        //     this.lastPoint = stage.getPointerPosition();
        //     console.log(this.lastPoint);
        // });

        // stage.on("mousemove", () => {
        //     if(!this.isDrawing){
        //         return;
        //     }

        //     // ctx.beginPath();
        //     ctx.moveTo(this.lastPoint.x,this.lastPoint.y);

        //     this.lastPoint = stage.getPointerPosition();

        //     ctx.lineTo(this.lastPoint.x,this.lastPoint.y);
        //     // ctx.closePath();
        //     ctx.stroke();
        // });

        // stage.on("mouseup", () => {
        //     this.isDrawing = false;
        // });
    }
});

Component.use(ControlPlugin);

export default Component;
</script>

<style>

</style>
