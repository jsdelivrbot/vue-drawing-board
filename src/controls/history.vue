<template>
    <control-group>
        <control @click="onUndo">
            <div slot="symbol">
                <</div>
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
            this.history.undo((current, prev) => {
                debugger;
                this.diffLayers(current, prev, layer => {
                    this.restoreLayer(layer);
                });
            });
        },
        onRedo(evt) {
            this.history.redo((current, prev) => {
                this.diffLayers(current, prev, layer => {
                    this.restoreLayer(layer);
                });
            });
        },
        diffLayers(current, prev, callback) {
            current.layers.forEach((layer, i) => {
                if (layer.image.src !== prev.layers[i].image.src) {
                    callback(layer);
                }
            });
        },
        restoreLayer(layer) {
            // draw data
            layer.context.clearRect(
                0,
                0,
                layer.node.width(),
                layer.node.width()
            );
            layer.context.drawImage(layer.image, 0, 0);
            layer.node.draw();
            // layer.node.draw(layer.image);
        },
        generateLayerObj(layer) {
            const promise = new Promise((resolve, reject) => {
                // 根据类型类做不同的处理
                layer.node.toImage({
                    callback(image) {
                        const ret = Object.assign({}, layer, {
                            image: image
                        });         

                        resolve(ret);
                    }
                });
            });

            return promise;
        },
        getInitState:async function(){
            const state = {
                layers: []
            };

            const theLayer = await this.generateLayerObj(this.container.current.layer);

            // if doesn't have some layers,use now layer status , and generate new object TODO
            state.layers.push(theLayer);

            return state;
        },
        getCurState:async function(obj){
            const state = {
                layers: []
            };

            const theLayer = await this.generateLayerObj(obj.layers[0]);

            // if doesn't have some layers,use now layer status , and generate new object TODO
            state.layers.push(theLayer);

            return state;
        }
    },
    created() {
        this.history = new SimpleUndo({ maxLength: 10 });

        this.evb.$on("saveHistory", async obj => {
            const state = await this.getCurState(obj);

            // save state to history
            this.history.save(state);
        });
    },
    mounted() {
        this.$on("containerMounted", async container => {
            debugger;
            const state = await this.getInitState();
            // history 初始化 TODO
            this.history.initialize(state);
        });
    }
});

Component.use(ControlPlugin);

export default Component;
</script>

<style>

</style>
