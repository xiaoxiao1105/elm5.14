<template>
  <div class="ada">
    <heade :go="true" :title="'搜索地址'" class="hq"></heade>
    <div class="adderss-addDeil">
      <div class="adderss-addDeil1">
        <input
          type="text"
          placeholder="请输入小区/学校/写字楼等"
          v-model="address"
        />
        <button @click="que">确认</button>
      </div>

      <p>为了满足商家的送餐要求，建议您从列表中选择</p>
      <div class="n" v-if='xian'>
        <div>找不到地址？</div>
        <div>请尝试输入小区、写字楼或学校名</div>
        <div>详细地址（如门牌号）可稍后输入哦</div>
      </div>
      <ul class="lit" v-else v-for="(item,index) in data">
        <li key="index" @click="dj(item)">
          <div>{{item.name}}</div>
          <div>{{item.address}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import heade from "../header/head.vue";
export default {
  components: {
    heade
  },
  mounted(){
    if(JSON.parse(sessionStorage.getItem('addressname'))){
this.address=JSON.parse(sessionStorage.getItem('addressname')).name
    }
    
  },
  data() {
    return {
      address: "",
      data: [],
      xian:true,

    };
  },
  methods: {
    que() {
      this.axios
        .get(
          "http://elm.cangdu.org/v1/pois?type=nearby&keyword=" + this.address
        )
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.data = res.data;
            this.xian=false
            console.log(this.data)
          }
        });
    },
    dj(item){
        // console.log(item.name)
        sessionStorage.setItem('addressname',JSON.stringify(item))
        this.$router.push({path:'/address'})
    }
  }
};
</script>

<style lang="scss">
.ada{
    width: 100%;
    height: 100%;
    background: gainsboro;
    overflow: auto;
    padding-top:2rem;
}
.hq{
    position: fixed;
    top:0;
    left:0;
}
.adderss-addDeil {
  width: 100%;
  .adderss-addDeil1 {
    width: 100%;
    background: white;
    padding: 5px;
    input {
      width: 70%;
      height: 35px;
      outline: none;
      border-radius: 5px;
      margin-left: 10px;
    }
    & > button {
      width: 20%;
      height: 35px;
      line-height: 35px;
      border-radius: 5px;
      text-align: center;
      background: #188efb;
      color: white;
      margin-top: 0;
      border: none;
      outline: none;
    }
  }
  & > p {
    background: #fff6e4;
    color: #ff883f;
    padding: 5px;
    text-align: center;
    font-size: 16px;
  }
  .n {
    width: 100%;
    text-align: center;
    color: #969696;
    font-size: 16px;
    padding-top: 100px;
    div {
      padding: 3px;
    }
  }
}
.lit {
  width: 100%;
  color:grey;
  font-size: 16px;
  li{
      padding:.1rem;
      border-bottom: 0.5px solid gray;
      div{
          padding:.1rem;
      }
  }
}
.uladdress {
  background: #ff883f;
  span {
    margin-left: 50px;
  }
}
</style>
