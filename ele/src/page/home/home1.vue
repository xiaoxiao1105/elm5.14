<template>
  <div class="pl">
    <header-top :go="true" :title="data.name" :sy="true" :sy1="false">
      <span slot="left"></span> 
       <span slot="right"></span>
    </header-top>
    <div class="ll">
      <ul>
        <li>
          <input type="text" placeholder="输入学校、商务楼、地址" v-model="val" @keyup.enter="tj" >
        </li>
        <li>
          <input type="submit" value="提交" @click="tj">
        </li>
      </ul>
      <p><button @click="ss" v-show="isshow">搜索历史</button><button @click="qk">清空历史</button>
      <ol>
          <router-link tag="li" :to="{name:'home2',params:{geoha:i.geohash,latitude:i.latitude,longitude:i.longitude}}" v-for="(i,index) in this.$store.state.list" :key="index">
           <div>{{i.name}}</div>
          <p>{{i.address}}</p>
        </router-link>
      </ol>
      <ol v-show="isshow1">
         <p>你可能要搜索</p>
        <li v-for="(item,index) in this.arr" @click="dj(index)">
          <div>{{item.name}}</div>
          <p>{{item.address}}</p>
        </li>
        
      </ol>
      </p>
      
     
      
    </div>
  </div>
</template>

<script>
import { Header } from "mint-ui";
import HeaderTop from "../../components/header/head"
export default {
  components:{
    HeaderTop
  },
  data() {
    return {
      data: "",
      val: "",
      arr: "",
      inpval:'',
      isshow:true,
      isshow1:true,
      lis:[],
    // go:true
    };
  },
  methods: {
    tj() {
      if (this.val) {
        this.axios
          .get(
            "http://elm.cangdu.org/v1/pois?type=search&city_id=" +
              this.$route.params.id +
              "&keyword=" +
              this.val
          )
          .then(res => {
            if (res.data) {
              this.arr = res.data;
            }
          });
      }
    },
    dj(index){
      this.val=this.arr[index].name
       this.$store.commit('dj',this.arr[index])
       this.$router.push({name:'home2',params:{geohash:this.arr[index].geohash,latitude:this.arr[index].latitude,longitude:this.arr[index].longitude}})
       console.log(this.arr[index].longitude)
    },
    ss(){
      //  this.$store.commit('dj',this.arr)
      // console.log(this.arr)
    },
    qk(){
      // console.log(this.$store.state.list)
      this.$store.commit('qk')
    }
  },
  mounted() {
    this.axios
      .get("http://elm.cangdu.org/v1/cities/" + this.$route.params.id)
      .then(res => {
        if (res.data) {
          this.data = res.data;
        }
      });
      if(this.$store.state.list){
         this.lis=this.$store.state.list
        //  console.log(this.lis)
      }else{
        this.isshow=false;
        this.isshow1=true;
        this.lis=[]
      }
  }
};

</script>

<style lang="less" scoped>
.lp{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.ll {
  width: 100%;
  // height: 20rem;
  flex: 1;
  background: #f5f5f5;
  padding-top: 0.3rem;
  ul {
    width: 100%;
    background: white;
    li {
      text-align: center;
      padding: 0.4rem 0;
      input {
        width: 90%;
        height: 1.5rem;
        border: 1px solid gainsboro;
        outline: none;
      }
      input[type="submit"] {
        background: #3792e5;
        color: white;
        border: none;
      }
    }
  }
  p {
    padding: 0.2rem;
    font-size: 0.6rem;
  }
  ol {
    background: white;
    li {
      padding-left: 0.3rem;
      border-bottom: 0.5px solid gainsboro;
      div {
        font-size: 0.7rem;
      }
      p {
        font-size: 0.5rem;
        color: gainsboro;
      }
    }
    .k2 {
      text-align: center;
      height: 2rem;

      line-height: 2rem;
    }
  }
}
</style>
