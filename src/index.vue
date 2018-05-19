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
            <control-pen :container="this" :evb="evb"></control-pen>
            <control-history :container="this" :evb="evb"></control-history>
            <!-- <control-colors :colors="opts.colors.colors"></control-colors> -->
        </div>
        <div class="stages">
            <div class="stage" ref="stage"></div>
        </div>
    </div>
</template>

<script>
import ControlPen from "./controls/pen.vue";
import ControlEraser from "./controls/eraser.vue";
import ControlHistory from "./controls/history.vue";
import Vue from "vue";
import Konva from "konva";

const Component = Vue.extend({
    name: "app",
    data() {
        return {
            evb: new Vue(),
            current: {
                stage: null, // 当前stage
                layers: null, // 当前stage的所有layer
                layer: null // 当前最上层layer
            } // 当前的数据
        };
    },
    props: {
        pages: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        getCurData() {
            // 先获取layers里面的背景图，再根据背景图尺寸渲染canvas
            this.current.stage = this.getInitStage();
            this.current.layers = this.getInitLayers();
        },
        getInitStage() {
            const stage = new Konva.Stage({
                container: this.$refs.stage,
                width: 500,
                height: 500
            });

            return stage
        },
        getInitLayers(){
            this.pages[0].layers.map((layer)=>{
                return this.getLayerObjByType(layer);
            })
        },
        getLayerObjByType(layer){
            switch(layer.type){
                case 'background':
                    return this.getBackgroundLayerObj(layer);
                case 'canvas':
                    return this.getCanvasLayerObj(layer);
            }
        },
        getBackgroundLayerObj(layer){
            const ext = {
                node:null,  // layer的konva node
                imageNode:null, // image的konva node
                context:null    // 图片的2d context
            }
        }
    },
    beforeCreate() {
        Component.registControl("pen", ControlPen);
        // Component.registControl("eraser", ControlEraser);
        Component.registControl("history", ControlHistory);
    },
    created() {},
    mounted() {
        // this.getCurData();
        const stage = new Konva.Stage({
            container: this.$refs.stage,
            width: 500,
            height: 500
        });

        const layer = new Konva.Layer();

        stage.add(layer);

        const canvas = document.createElement("canvas");
        canvas.width = layer.width();
        canvas.height = layer.height();

        const image = new Konva.Image({
            image: canvas,
            x: 0,
            y: 0
        });
        const context = canvas.getContext("2d");
        layer.add(image);
        stage.draw();

        this.current.stage = { node: stage };
        this.current.layer = { node: layer, context: context };
        this.evb.$emit("containerMounted", this);
    }
});

Component.registControl = function(name, Comp) {
    Component.component("control-" + name, Comp);
};

// Component.use(ControlPlugin);

export default Component;
</script>

<style>
.vue-drawing-board {
    margin-left: 200px;
}
</style>
