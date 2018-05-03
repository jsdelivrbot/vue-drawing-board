<template>
    <div class="control">
        <div class="main">
            <div class="symbol" r-html=""></div>
        </div>
    </div>
</template>

<script>
import ControlPen from '';
export default {
    name: "app",
    data() {
        return {
            currentTopLayer:{} // 当前的最上层layer
        };
    },
    created() {
        // TODO regist 默认的control  换周期
        // regist('pen',ControlPen);
    },
    mounted() {
        var stage = new Konva.Stage({
            container: this.$refs.stage,
            width: 500,
            height: 500
        });

        window.layer = new Konva.Layer();
        var ctx = window.layer.getContext();

        stage.add(window.layer);
        ctx.strokeStyle = "#df4b26";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        ctx.globalCompositeOperation = 'source-over';

        stage.on("mousedown", () => {
            this.isDrawing = true;
            this.lastPoint = stage.getPointerPosition();
            console.log(this.lastPoint);
        });

        stage.on("mousemove", () => {
            if(!this.isDrawing){
                return;
            }


            // ctx.beginPath();
            ctx.moveTo(this.lastPoint.x,this.lastPoint.y);

            this.lastPoint = stage.getPointerPosition();

            ctx.lineTo(this.lastPoint.x,this.lastPoint.y);
            // ctx.closePath();
            ctx.stroke();
        });

        stage.on("mouseup", () => {
            this.isDrawing = false;
        });
    }
};
</script>

<style>
.vue-drawing-board {
    margin-left: 200px;
}
</style>
