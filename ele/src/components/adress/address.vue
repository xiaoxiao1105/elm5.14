<template>
  <div class="d">
    <heade :go="true" :title="'新增地址'"></heade>
    <div class="adderss-add">
      <div>
        <input
          type="text"
          placeholder="请填写你的姓名"
          v-model="name"
          @input="inp"
        />
        <p v-show="nama">{{ warnname }}</p>
      </div>
      <router-link tag="div" to="/addresss">
        <input
          type="text"
          placeholder="小区/写字楼/学校"
          v-model="address.name"
        />
      </router-link>
      <div>
        <input type="text" placeholder="请填写详细送餐地址" v-model="adress" />
        <p v-show="warn">{{ warnname1 }}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="请填写能够联系到你的手机号"
          v-model="phone"
        />
        <p v-show="pho">{{ warnname2 }}</p>
      </div>

      <div>
        <input type="text" placeholder="备用电话(选填)" v-model="phone1" />
        <p v-show="phon">{{ warnname3 }}</p>
      </div>
    </div>
    <button @click="add">新增地址</button>
  </div>
</template>

<script>
import heade from "../header/head.vue";
export default {
  components: {
    heade
  },
  data() {
    return {
      phone1: "",
      phone: "",
      address: "",
      name: "",
      adress: "",
      nama: false,
      warnname: "",
      warnname1: "",
      warnname2: "",
      warnname3: "",
      warn: false,
      pho: false,
      phon: false
    };
  },
  mounted() {
    if (sessionStorage.getItem("addressname")) {
      this.address = JSON.parse(sessionStorage.getItem("addressname"));
    }
    console.log(this.address);
    this.reg();
  },
  watch: {
    // name() {
    //   if (this.name == "") {
    //     this.nama = true;
    //     this.warnname = "请输入用户名";
    //   } else {
    //     this.nama = false;
    //   }
    // },
    adress() {
      console.log(this.adress.length);
      if (this.adress.length < 3) {
        this.warn = true;
        this.warnname1 = "输入的地址太短了";
      } else {
        this.warn = false;
      }
    },
    phone() {
      let reguname = /^1(3|4|5|7|8)\d{9}$/.test(this.phone);
      console.log(reguname);
      if (reguname == false) {
        this.pho = true;
        this.warnname2 = "请输入正确的手机格式";
      } else {
        this.pho = false;
      }
    },
    phone1() {
      let reguname = /^1(3|4|5|7|8)\d{9}$/.test(this.phone1);
      if (reguname == false) {
        this.phon = true;
        this.warnname3 = "请输入正确的手机格式";
      } else {
        this.phon = false;
      }
    }
  },
  methods: {
    inp() {
      // console.log(this.name)
      if (this.name.length < 3) {
        this.nama = true;
        this.warnname = "请输入用户名";
      } else {
        this.nama = false;
      }
    },
    reg() {
      this.axios
        .get(
          "http://elm.cangdu.org/v1/user?user_id=" + this.$store.state.reg_id
        )
        .then(res => {
          console.log(res);
        });
    },
    add() {
      let obj = {
        address: this.adress,
        address_detail: this.address.name,
        geohash: this.address.geohash,
        name: this.name,
        phone: this.phone,
        phone_bk: this.phone1,
        poi_type: 0,
        sex: 1,
        tag: "公司",
        tag_type: 4
      };
      console.log(obj)
      this.axios
        .post(
          "http://elm.cangdu.org/v1/users/" +
            this.$store.state.reg_id +
            "/addresses",
          obj
        )
        .then(res => {
          if(res.data.status==1){
            this.$router.push('/adress')
          }else{
            alert('输入错了')
          }
        });
    }
  }
};
</script>

<style lang="scss">
.d {
  width: 100%;
  height: 100%;
  background: gainsboro;
}
.adderss-add {
  margin-top: 0.4rem;
  width: 100%;
  background: white;
  padding: 5px 10px;
  div {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 50px;
    input {
      width: 100%;
      border: none;
      height: 30px;
      background: #f2f2f2;
      border-color: gainsboro;
      outline: none;
      padding-left: 10px;
    }
    p {
      font-size: 12px;
      color: red;
    }
  }
}
button {
  width: 90%;
  margin-top: 20px;
  color: white;
  background: #188efb;
  text-align: center;
  line-height: 35px;
  border: none;
  margin-left: 5%;
}
</style>
