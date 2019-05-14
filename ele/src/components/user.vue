<template>
  <div>
    <headr :go="true" :title="'账户信息'"></headr>
    <div class="users-box">
      <ul>
        <li>
          <div>头像</div>
          <div>
            <p v-if="this.bb">
              <img :src="this.bb" />
              <i class="fa fa-fw fa-angle-right"></i>
            </p>
            <p v-else>
              <img :src="'//elm.cangdu.org/img/' + user.avatar" />
              <i class="fa fa-fw fa-angle-right"></i>
            </p>

            <input
              type="file"
              class="upload"
              accept="image/jpeg, image/jpg, image/png"
              @change="handFile"
            />
          </div>
        </li>
        <li class="users-box-b">
          <div>用户名</div>
          <div>
            {{ user.username }}
            <i class="fa fa-fw fa-angle-right"></i>
          </div>
        </li>
        <router-link tag="li" to="/adress" class="users-box-b">
          <!-- <li> -->
          <div>收货地址</div>
          <div>
            <i class="fa fa-fw fa-angle-right"></i>
          </div>
          <!-- </li> -->
        </router-link>
        <li class="users-box-a">账户绑定</li>
        <li class="users-box-b">
          <div>
            <i class="fa fa-fw fa-tablet"></i>
            手机
          </div>
          <div>
            <i class="fa fa-fw fa-angle-right"></i>
          </div>
        </li>
        <li class="users-box-a">安全设置</li>
        <!-- <li class="users-box-b"> -->
        <router-link to="/forget" tag="li" class="users-box-b">
          <div>登录密码</div>
          <div>
            修改
            <i class="fa fa-fw fa-angle-right"></i>
          </div>
        </router-link>
        <!-- </li> -->
      </ul>
      <button @click="edit">退出登录</button>
      <div id="tan" v-show="tan">
        <h3>!</h3>
        <p>{{ tit }}</p>
        <button @click="off">点此关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import headr from "./header/head";
export default {
  components: {
    headr
  },
  data() {
    return {
      user: {},
      bb: "",
      tan: false,
      tit: ""
    };
  },
  mounted() {
    this.reg();
  },
  methods: {
    off() {
      this.tan = false;
    },
    reg() {
      this.axios
        .get(
          "http://elm.cangdu.org/v1/user?user_id=" + this.$store.state.reg_id
        )
        .then(res => {
          console.log(res.data);
          if (res.status == 200) {
            this.user = res.data;
          }
        });
    },
    edit(){
       this.$store.commit('edit')
       this.$router.push('/my')
    },
    //点击上传头像
    handFile(e) {
      e.preventDefault(); //防止上面的链接打开 URL。preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）
      let $target = e.target || e.srcElement; //获取input file标签 表示调用他的各种属性 两个的区别是：ie下支持e.srcElement，火狐支持e.target
      let file = $target.files[0]; //表示取第一张图
      //   console.log(file); //获取到本地当前所选图片
      var reader = new FileReader(); //FileReader 对象允许Web应用程序异步读取存储在用户
      //计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
      reader.onload = data => {
        //onload事件会在页面或图像加载完成后立即发生
        let res = data.target || data.srcElement;
        this.bb = res.result;
        // console.log(res); //res是FileReader这个函数
      };
      //// 通过FormData将文件转成二进制数据
      let formData = new FormData(); //实例化
      formData.append("file", file); //原型
      const instance = this.axios.create({
        withCredentials: true
        // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
      });
      instance
        .post(
          "http://elm.cangdu.org/eus/v1/users/" +
            this.$store.state.reg_id +
            "/avatar",
          formData
        )
        .then(res => {
          if (res.status !== 200) {
            this.tan = true;
            this.tit = res.data.message;
          }
        });
      //FileReader对象的readAsDataURL方法可以将读取到的文件编码成Data URL
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss">
.users-box {
  width: 100%;
  height: 617px;
  background: gainsboro;
  padding-top: 10px;
  ul {
    width: 100%;
    li {
      width: 100%;
      padding: 10px;
      display: flex;
      margin-bottom: 2px;
      background: white;
      input {
        width: 60px;
        border: none;
        outline: none;
        opacity: 0;
        position: absolute;
        top: 84px;
        right: 52px;
      }
      div {
        flex: 1;
      }
      div:nth-of-type(1) {
        text-align: left;
        padding-top: 8px;
      }
      div:nth-of-type(2) {
        text-align: right;
        p {
          display: inline-block;
          width: 100%;
          height: 100%;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
    .users-box-b {
      width: 100%;
      height: 50px;
      font-size: 16px;
      div:nth-of-type(1) {
        padding-top: 0px;
      }
      div:nth-of-type(2) {
        height: 100%;
        line-height: 30px;
      }
    }
    .users-box-a {
      height: 40px;
      background: none;
      font-size: 14px;
    }
  }
  button {
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    background: red;
    color: white;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>
