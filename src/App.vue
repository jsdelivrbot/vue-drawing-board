<template>
    <div class="vue-drawing-board">
        <div class="controls">
            <!-- <control>
                <div slot="symbol">**</div>
                <div slot="text">笔</div>
                <div slot="options">
                    <control-option v-for="color in colors">
                        {{color}}
                    </control-option>
                </div>
            </control> -->
            <control-pen :container="this" :event="event"></control-pen>
            <!-- <control-colors :colors="opts.colors.colors"></control-colors> -->
        </div>
        <div class="stages">
            <div class="stage" ref="stage"></div>
        </div>
    </div>
</template>

<script>
import ControlPen from './controls/pen.vue';
import Vue from 'vue';

const Component = Vue.extend({
    name: "app",
    data() {
        return {
            event:new Vue(),
            current:{
                stage:null, // 当前stage
                layer:null // 当前最上层layer
            } // 当前的数据
        };
    },
    methods:{
        
    },
    beforeCreate(){
        Component.registControl('pen',ControlPen);
    },
    created() {
    },
    mounted() {
        console.log('aaaaaaaaaa')
        const stage = new Konva.Stage({
            container: this.$refs.stage,
            width: 500,
            height: 500
        });

        const layer = new Konva.Layer();

        stage.add(layer);

        this.current.stage = stage;
        this.current.layer = layer;
        this.event.$emit('containerMounted',this);
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

Component.registControl = function(name,Comp){
    Component.component('control-'+name,Comp);
}

// Component.use(ControlPlugin);

export default Component;
</script>

<style>
.vue-drawing-board {
    margin-left: 200px;
}
</style>
