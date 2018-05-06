<template>
    <div class="control" @click="$emit('click',$event)">
        <div class="main">
            <div class="symbol">
                <slot name="symbol">
                    symbol
                </slot>
            </div>
            <div class="text">
                <slot name="text">
                    text
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
        };
    },
    created() {
        // TODO regist 默认的control  换周期
        // regist('pen',ControlPen);
    },
    mounted() {
        
    }
};
</script>

<style scoped>
.control {
    border: 1px solid red;
}
</style>
