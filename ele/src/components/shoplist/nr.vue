<template>
    <div>
        <div class="main-body" ref="wrapper" >
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
        <ul  class="mui-table-view mui-grid-view">
            <!-- <li v-for="i in data" class="mui-table-view-cell mui-media mui-col-xs-6" @click="shop"> -->
               <router-link tag="li" v-for="i in data" :to="{name:'shop',params:{id:i.id,lat1:lat,log1:log,geoha:geoha}}"  class="mui-table-view-cell mui-media mui-col-xs-6">
                <div class="n1"><img :src="'//elm.cangdu.org/img/'+i.image_path"></div>
                <div class="n2">
                    <span>品牌</span>{{i.name}}
                    <p><span>{{i.rating}}</span>月售{{i.recent_order_num}}单</p>
                    <div>￥20起送/{{i.piecewise_agent_fee.tips}}</div>
                </div>
                <div class="n3">
                    <div><span  v-for="(i1,index) in i.supports" v-if="i1.icon_name">{{i1.icon_name}}</span>
                    </div>
                    <p><span v-if="i.delivery_mode">{{i.delivery_mode.text}}</span>
              
                    <span >{{i.supports[1].name}}</span>
                    </p>
                    <p><span>{{i.distance}}</span>/<span>{{i.order_lead_time}}</span></span></p>

                </div>
           
            </router-link>
             <!-- </li> -->
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
      <span v-if="show">loading...</span>
      <span v-else>没有数据了</span>
    </div>
     </mt-loadmore>
    </div>
    </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
export default {
    props:["lat","log","geoha"],
    data(){
        return{
            //保
            bao:[],
            data:"",
            n:0,
            data1:'',
            show:true,
            //可以进行上拉
      allLoaded: false,
      //是否自动触发上拉函数
      isAutoFill: false,
        }
    },
      created() {
    this.loadFrist();
  },
    mounted(){
        
        this.axios.get("http://elm.cangdu.org/shopping/restaurants?latitude="+this.lat+"&longitude="+this.log+"&offset=0&limit=10&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=").then(res=>{
        this.data=res.data;
// console.log(this.data)
    })
    },
    methods:{
    
         //   下拉刷新
    loadTop() {
      this.loadFrist();
    },
    // 上拉加载
    loadBottom() {
      this.loadMore();
    },
    // 下来刷新加载
    loadFrist() {
        
    },
        //加载更多
        loadMore(){
            this.n+=10;
            this.axios.get("http://elm.cangdu.org/shopping/restaurants?latitude="+this.lat+"&longitude="+this.log+"&offset="+this.n+"&limit=10&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=")
            .then(response=>{
                if(response.data.length<8){
                this.show=false;
          }
                this.data=this.data.concat(response.data)
                // console.log(this.data1)
                this.$refs.loadmore.onBottomLoaded();
               
            })
       }
    }
}
</script>

<style lang="scss" scoped>

ul{
     overflow: scroll;
    width:100%;
    li{
        width:100%;
        display: flex;
        .n1{
            width: 3rem;
            padding: 0.2rem;
            img{
                width:2.5rem;
            }
        }
        .n2{
            flex: 1;
            font-size: 0.6rem;
          font-weight: 600;
          &>span {
            font-size: 0.4rem;
            background: #fed744;
            padding: 0 0.1rem;
            margin-right: 0.2rem;
          }
          &>p{
              font-size: 0.4rem;
              padding:0.4rem 0;
              span{
                  color:orange;
                  padding-right: 0.2rem;
              }
          }
          &>div{
              font-size: 0.5rem;
              color: gainsboro;
              font-weight: 100;
          }
        }
        .n3{
            width:6rem;
            text-align: right;
            div{
                // border: 0.5px solid gainsboro;
                font-size: 0.3rem;
                width:1.5rem;
                display: flex;
                justify-content: space-around;
               margin-left: 4rem;
                span{
                    border: 0.1px solid gainsboro;
                     text-align: center;
                }
                span:nth-of-type(3){
                    border-right:none;
                }
            }
            p:nth-of-type(1){
                font-size: 0.3rem;
                padding:0.4rem 0;
                span:nth-of-type(1){
                    background: #3792e5;
                    color:white;
                     margin-right: 0.2rem;
                    border-radius: 2px;
                }
                span:nth-of-type(2){
                    color: #3792e5;
                   border:0.5px solid #3792e5;
                    border-radius: 2px;
                   
                }
            }
            p:nth-of-type(2){
                color:gainsboro;
                font-size: 0.3rem;
               span{
 margin: 0.1rem;
               }
                span:nth-of-type(2){
                    color: #3792e5;
                
                    border-radius: 2px;
                   
                }
            }
        }
    }
}
</style>
