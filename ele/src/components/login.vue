<template>
  <div>
    <headr :go="true" :title="'密码登录'"></headr>
    <div class="reg">
      <div><input type="text" placeholder="账号" v-model="username" /></div>
      <div><input type="password" placeholder="密码" v-model="psw" /></div>
      <div class="inp">
        <input ype="text" placeholder="验证码" v-model="yzm" />
        <span><img :src="image"/></span>
        <span @click="captchas">点击</span>
      </div>
      <p>温馨提示：未注册过的账号，登录时将自动注册</p>
      <p>注册过的账户可凭账号密码登录</p>
      <button @click="deg">登录</button>
      <p>重置密码？</p>
      <div id="tan" v-show="tan">
        <h3>!</h3>
        <p>{{ tit }}</p>
        <button @click="off">点此关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import headr from "./header/head.vue";
export default {
  components: {
    headr
  },
  data() {
    return {
      username: "",
      psw: "",
      yzm: "",
      image: "",
      tan: false,
      tit: ""
    };
  },
  mounted() {
    //   验证码
    this.captchas();
  },
  methods: {
    //   点击验证码
    captchas() {
      let obj = {};
      this.axios.post("http://elm.cangdu.org/v1/captchas", obj).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.image = res.data.code;
        }
      });
    },
    //存入cookies值
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    // 点击关闭
    off() {
      this.tan = false;
    },
    deg() {
      let username = /^1(3|4|5|7|8)\d{9}$/.test(this.username);
      let psw = /^[A-z][0-9]{5,10}$/.test(this.psw);
      let regm = /^[0-9]{4}$/.test(this.yzm);
      if (!username) {
        this.tan = true;
        this.tit = "请输入正确的用户名";
      }
      if (!psw) {
        this.tan = true;
        this.tit = "密码输入错误";
      }
      if (!regm) {
        this.tan = true;
        this.tit = "验证码错误";
      }
      if (username && psw && regm) {
        this.setCookie("cap", this.yzm);
        let data = {
          username: this.username,
          password: this.psw,
          captcha_code: this.yzm
        };
        this.axios.post("http://elm.cangdu.org/v2/login", data).then(res => {
          console.log(res)
          if (res.data.status == 0) {
            this.tan = true;
            this.tit = res.data.message;
          } else {
            this.$router.push('/my')
            this.$store.commit('reg',res.data.id)
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.reg {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  div {
    width: 100%;
    height: 50px;
    background: white;
    margin-bottom: 1px;
    input {
      padding-left: 10px;
      border: none;
      outline: none;
      font-size: 18px;
      // color:gainsboro;
    }
    input[type="text"] {
      width: 100%;
      height: 100%;
    }

    input[type="password"] {
      width: 80%;
      height: 100%;
    }
  }
  .inp {
    width: 100%;
    height: 50px;
    & > input {
      width: 60%;
      height: 100%;
    }
  }
  p {
    color: red;
    font-size: 14px;
    padding: 8px 15px;
  }
  button {
    width: 90%;
    height: 50px;
    line-height: 50px;
    color: white;
    margin-left: 5%;
    border: none;
    outline: none;
    background: #4cd964;
    border-radius: 5px;
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
