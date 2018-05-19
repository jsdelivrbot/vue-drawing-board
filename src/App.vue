<template>
    <vue-drawing-board :pages="pages"></vue-drawing-board>
</template>

<script>
import DrawingBoard from './index.vue';

export default {
    data(){
        return {
            pages:[{
                sizeAsIndex:0,
                layers:[{
                    type:'background',
                    src:'http://oegl93v4v.bkt.clouddn.com/2018-04-27-023908.jpg'
                },{
                    type:'canvas',
                    width:400,
                    height:400
                }]
            }]
        };
    },
    components:{
        'vue-drawing-board':DrawingBoard
    }
}
</script>
