<template>
  <div>
    <headr :go="true" :title="'我的'"></headr>
    <router-link to="/login" tag="div" v-if="this.$store.state.reg_id==''">
    <dl class="deg">
      <dt>
        <span><img src="http://elm.cangdu.org/img/default.jpg"/></span>
      </dt>
      <dd>
        <p>
          登录/注册
        </p>
        <p><i class="fa fa-fw fa-tablet"></i>暂无绑定手机号</p>
      </dd>
      <dd>
        <i class="fa fa-fw fa-angle-right"></i>
      </dd>
    </dl>
     </router-link>
   <router-link to="/user" tag="div"  v-else>
    <dl class="deg">
      <dt>
        <span><img :src="'http://elm.cangdu.org/img/'+re.avatar"/></span>
      </dt>
      <dd>
        <p>
         {{re.username}}
        </p>
        <p><i class="fa fa-fw fa-tablet"></i>暂无绑定手机号</p>
      </dd>
      <dd>
        <i class="fa fa-fw fa-angle-right"></i>
      </dd>
    </dl>
      </router-link>
    <div id="oy">
      <ul class="oy1">
        <li>
          <p><span>0.00</span>元</p>
          <p>我的余额</p>
        </li>
        <li>
          <p><span>0</span>个</p>
          <p>我的优惠</p>
        </li>
        <li>
          <p><span>0</span>分</p>
          <p>我的积分</p>
        </li>
      </ul>
      <ul class="oy2">
        <li>我的订单</li>
        <li>积分商城</li>
      </ul>
      <ul class="oy3">
        <li>饿了么会员卡</li>
        <li>服务中心</li>
        <li>下载饿了么APP</li>
      </ul>
    </div>
    <foot class="foot"></foot>
  </div>
</template>

<script>
import foot from "../ele/Footer.vue";
import headr from "../header/head.vue";
export default {
  components: {
    foot,
    headr
  },
  data(){
return{
    re:{}
}
  },
  mounted(){
   this.reg()
      

  },
  methods:{
      reg(){
this.axios.get('http://elm.cangdu.org/v1/user?user_id='+this.$store.state.reg_id).then(res=>{
console.log(res)
if(res.status==200){
this.re=res.data
}

      })
      }
  }
};
</script>

<style lang="scss">
.foot {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.deg {
  width: 100%;
  padding: 15px;
  display: flex;
  color: white;
  background: #3190e8;
  dt {
    width: 20%;
    padding: 10px;
    span {
      img {
        width: 100%;
        border-radius: 30px;
      }
    }
  }
  dd:nth-of-type(1) {
    flex: 1;
    p:nth-of-type(2) {
      font-size: 0.7rem;
      padding: 0.2rem 0;
    }
  }
  dd:nth-of-type(2) {
  }
}
#oy {
  width: 100%;
  background-color: #f5f5f5;
  .oy1 {
    border-bottom: 1px solid gainsboro;
    background-color: #fff;
    list-style: none;
    width: 100%;
    height: 125px;
    display: flex;
    li {
      text-align: center;
      height: 120px;
      flex: 1;
      padding-top: 10px;
    }
    li:nth-of-type(1) {
      p {
        font-size: 18px;
        margin-bottom: 10px;
        span {
          font-size: 30px;
          color: orange;
        }
      }
    }
    li:nth-of-type(2) {
      border-left: 1px solid gainsboro;
      border-right: 1px solid gainsboro;
      p {
        font-size: .7rem;
        margin-bottom: 10px;
        span {
          font-size: 30px;
          color: red;
        }
      }
    }
    li:nth-of-type(3) {
      p {
        font-size: .7rem;
        margin-bottom: 10px;
        span {
          font-size: 30px;
          color: greenyellow;
        }
      }
    }
  }
  .oy2{
  width: 100%;
  font-size: .7rem;
  background-color: #fff;
  list-style: none;
  li{
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 25px;
  border-bottom: 1px solid gainsboro;
  }
  margin-top: 10px;
  margin-bottom: 10px;
  }
  .oy3{
  width: 100%;
  font-size: .7rem;
  background-color: #fff;
  list-style: none;
  li{
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 25px;
  border-bottom: 1px solid gainsboro;
  }
  }
}
</style>
