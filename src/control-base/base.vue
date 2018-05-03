<script>
import Vue from "vue";
const Base = Vue.extend({
    name: "app",
    
    data() {
        return {
        };
    },
    props: {
        evb:Object
    },
    created() {
        console.log('baseeeee')
        this.evb.$on('containerMounted',container=>{
            this.$emit('containerMounted',container);
        });
    },
    mounted() {
        console.log('baseeeee1111111')
    }
});

export default Base;
</script>
