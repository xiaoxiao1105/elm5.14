<template>
    <div class="g">
        <heade :go='true' :title="'编辑地址'" :sy="true" :right="'编辑'"></heade>
            <ul v-for='i in data'>
                <li>{{i.address}}</li>
                <li>{{i.phone}}</li>
            </ul>
            
            <router-link tag="ul" class="add" to="/address">
            <li>新增地址</li>
            <li>
                 <i class="fa fa-fw fa-angle-right"></i>
            </li>
            </router-link>
        
    </div>
</template>

<script>
import heade from '../header/head.vue'
export default {
components:{
    heade
},
data(){
return{
    data:[]
}
},
mounted(){
this.axios.get('http://elm.cangdu.org/v1/users/'+this.$store.state.reg_id+'/addresses').then(res=>{
    console.log(res)
    if(res.status==200){
        this.data=res.data
    }
})
},
}
</script>

<style lang="scss">
.g{
    background: gainsboro;
    width:100%;
    height: 100%;
}
    .add{
        width:100%;
        display: flex;
        background: white;
        margin-top:.5rem;
        font-size: .6rem;
        li{
            flex: 1;
            padding:.5rem .3rem;
            &:nth-of-type(2){
                text-align: right;
            }
        }
    }
</style>
