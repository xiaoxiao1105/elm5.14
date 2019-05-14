<template>
  <div class="hh">
    <headr :go="true" :title="'重置密码'"></headr>
    <ul class="from">
      <li><input type="text" placeholder="账号" v-model="username" /></li>
      <li><input type="text" placeholder="旧密码" v-model="oldpassword" /></li>
      <li><input type="text" placeholder="请输入新密码" v-model="newpassword"/></li>
      <li><input type="text" placeholder="请确认密码" v-model="okpassword"/></li>
      <li class="gai">
        <input type="text" placeholder="验证码" v-model="yzm"/>
        <img :src='image' alt=""/>
        <p class="change" @click="captchas">
          <span>看不清</span>
          <a>换一张</a>
        </p>
      </li>
    </ul>
    <div class="red">
        <button @click="que">确认修改</button>
    </div>
    <div id="tan" v-show="tan">
        <h3>!</h3>
        <p>{{ tit }}</p>
        <button @click="off">点此关闭</button>
      </div>
  </div>
</template>

<script>
import headr from "../header/head.vue";
export default {
  components: {
    headr
  },
  data(){
      return{
          tan:false,
          image:'',
          username:'',
          oldpassword:'',
          newpassword:'',
          okpassword:'',
          yzm:'',
          tit:''
      }
  },
  mounted(){
      this.captchas()
      this.axios.get("http://elm.cangdu.org/v1/user?user_id=" + this.$store.state.reg_id).then(res => {});
  },
  methods:{
      captchas() {
      let obj = {};
      this.axios.post("http://elm.cangdu.org/v1/captchas", obj).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.image = res.data.code;
        }
      });
    },
    off(){
this.tan=false
    },
    que(){
        if(this.newpassword===this.okpassword){
let obj={
            captcha_code:this.yzm,
confirmpassword:this.newpassword,
newpassword:this.newpassword,
oldpassWord:this.oldpassword,
username:this.username,
        }
        console.log(obj)
        this.axios.post('http://elm.cangdu.org/v2/changepassword',obj).then(res=>{
            console.log(res)
            if(res.data.status==0){
                this.tit=res.data.message
                this.tan=true
            }else{
                this.tit=res.data.success
            }
        })
        }else{
             this.tit='两次密码不一样'
                this.tan=true
        }
        
    }
  }
};
</script>

<style lang="scss">
.hh{
    width:100%;
    height: 100%;
    background: gainsboro;
}
.red{
    width:100%;
    color:#FF0000;
    button{
        width:95%;
        font-size: 16px;
        color:#fff;
        background-color: #4CD964;
        border:none;
        padding: 10px 0;
        margin-left: 2.5%;
        margin-top: 20px;
        border-radius: 5px;
        outline: none;
    }
}
.from{
    width:100%;
    margin: 0;
    // display:none;
    margin-top: 20px;
    li{
        width:100%;
        border-bottom:10px solid #F8F8F8;
        input{
            width:100%;
            background-color: #fff;
            border:none;
            outline: none;
            padding: 15px 10px;
            font-size: 16px;
        }
    }
    .gai{
        position: relative;
        img{
            position: absolute;
            right:100px;
            top:0.2rem;
        }
        .change{
            position: absolute;
            right:20px;
            top:10px;
            color:gainsboro;
            font-size: 14px;
            span{
                display: block;
            }
        }
    }
}
#tan {
  width: 60%;
  height: 30%;
  position: absolute;
  top: 30%;
  left: 50%;
  padding-top: 1rem;
  text-align: center;
  margin-left: -30%;
  background: white;
  border-radius: 20px;
  h3 {
    color: orange;
    text-align: center;
    height: 60px;
    width: 60px;
    line-height: 60px;
    margin: 0 auto;
    border-radius: 50%;
    border: 4px solid orange;
  }
  button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #4cd964;
    outline: none;
    border: none;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 0;
  }
}
</style>
