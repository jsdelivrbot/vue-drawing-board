<template>
    <control-group>
        <control @click="onUndo">
            <div slot="symbol"><</div>
            <div slot="text">undo</div>
        </control>
        <control @click="onRedo">
            <div slot="symbol">></div>
            <div slot="text">redo</div>
        </control>
    </control-group>
</template>

<script>
import Base from "../control-base/base.vue";
import SimpleUndo from "../util/simpleUndo";
import ControlPlugin from "../control-base/index";
const Component = Base.extend({
    data() {
        return {};
    },
    props: {
        container: Object
    },
    methods: {
        onUndo(evt) {
            this.history.undo((current,prev)=>{
                this.diffLayers(current,prev,(layer)=>{
                    this.restoreLayer(layer);
                });
            });
        },
        onRedo(evt) {
            this.history.redo((current,prev)=>{
                this.diffLayers(current,prev,(layer)=>{
                    this.restoreLayer(layer);
                });
            });
        },
        diffLayers(current,prev,callback){
            current.layers.forEach((layer,i) => {
                if(layer.data !== prev.layers[i].data){
                    callback(layer);
                }
            });
        },
        restoreLayer(layer){
            // draw data
            layer.elem.draw(layer.data);
        },
        generateLayerObj(layer){
            // 根据类型类做不同的处理
            const data = layer.elem.toDataURL();
            return Object.assign({},layer,{
                data:data
            });
        },
        getInitState(){
            const layer = this.container.current.layer;
            const layers = [];

            const obj = Object.assign({},layer,{
                data:layer.elem.toDataURL()
            });

            layers.push(obj);

            return {
                layers:layers
            }
        }
    },
    created() {
        this.history = new SimpleUndo({maxLength: 10});

        this.evb.$on('saveHistory',(obj)=>{
            const state = {
                layers:[]
            }

            // if doesn't have some layers,use now layer status , and generate new object TODO
            state.layers.push(this.generateLayerObj(obj.layers[0]));

            // save state to history
            this.history.save(state);
        });
    },
    mounted() {
        this.$on("containerMounted", container => {
            // history 初始化 TODO
            this.history.initialize(this.getInitState());
        });
    }
});

Component.use(ControlPlugin);

export default Component;
</script>

<style>

</style>
