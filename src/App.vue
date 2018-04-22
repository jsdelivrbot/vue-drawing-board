<template>
    <div class="vue-drawing-board">
        <div class="controls"></div>
        <div class="stages">
            <div class="stage" ref="stage"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    },
    created() {},
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
