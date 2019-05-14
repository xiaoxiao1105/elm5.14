<template>
  <div class="b">
    <header-top :go="true" :title="data.name" :sy="true" :sy1="false">
      <span slot="left"></span>
      <span slot="right"></span>
    </header-top>
    <div class="c">
      <div class="fl swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item,index) in list" :key="index">
            <router-link tag="div" :to="{name:'foote',params:{tit:k.title}}" v-for="k in item" :key="k.id">
              <img :src="'https://fuss10.elemecdn.com'+k.image_url">
              <span>{{k.title}}</span>
            </router-link>
          </li>
        </ul>
        <div class="swiper-pagination"></div>
      </div>
      <p class="nr1"></p>
       <p class="nr0">
          <!-- <img src="../../images/11.png">附近商家 -->
        </p>
      <nr :geoha="this.$route.params.geoha" :lat="this.$route.params.latitude" :log="this.$route.params.longitude"></nr>
    </div>
    <ele-footer></ele-footer>
  </div>
</template>

<script>
import HeaderTop from "../../components/header/head";
import Nr from "../../components/shoplist/nr";
import EleFooter from "../../components/ele/Footer";
import Swiper from "swiper";
import "../../style/swiper.min.css";
export default {
  components: {
    HeaderTop,
    EleFooter,
    Nr
  },
  data() {
    return {
      data: "",
      list: [],
      list1: []
    };
  },
  mounted() {
    
    //获取传过来的name
    this.axios
      .get("http://elm.cangdu.org/v2/pois/" + this.$route.params.geoha)
      .then(res => {
        if (res.data) {
          this.data = res.data;
         
        
        }
      });
    //渲染轮播
    this.axios
      .get(
        "http://elm.cangdu.org/v2/index_entry?geohash=" +
          this.$route.params.geoha +
          "&group_type=1&flags[]=F"
      )
      .then(res => {
        if (res.data) {
          this.list = res.data;
          let len = res.data.length;
          let resArr = res.data;
          let foodArr = [];
          for (let i = 0, j = 0; i < len; i += 8, j++) {
            foodArr[j] = resArr.splice(0, 8);
          }
          this.list = foodArr;
          // console.log(this.list)
        }
      })
      .then(() => {
        new Swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination"
          },
          loop: true
        });
      });

  
  },
  methods: {}
};
</script>

<style lang="less" scoped>
// @import "./src/style/swiper.min.css";
.b {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 2rem;
  background: #3792e5;
  display: flex;
  li {
    width: 2.2rem;
    text-align: center;
    line-height: 2rem;
    img {
      width: 1rem;
    }
  }
  li:nth-of-type(2) {
    flex: 1;
    color: white;
    font-size: 0.6rem;
  }
}
.c {
  width: 100%;
  flex: 1;
  overflow: auto;

  .fl {
    height: 8rem;
    width: 100%;
    ul {
      flex: 1;
      height: 100%;
      // display: flex;
      // flex-wrap: wrap;

      li {
        width: 100%;
        // text-align: center;
        font-size: 0.5rem;
        padding: 0.5rem;
        color: gray;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        div {
          width: 25%;
          text-align: center;

          img {
            width: 1.6rem;
            height: 1.6rem;
          }
          span {
            width: 100%;
            display: inline-block;
          }
        }
      }
    }
  }
  .nr1 {
    width: 100%;
    height: 0.5rem;
    background: gainsboro;
  }
.nr0{
      width: 100%;
      padding: 0.4rem;
      font-size: 0.5rem;
      color: gray;
      img {
        width: 0.8rem;
        vertical-align: middle;
        margin-right: 0.4rem;
      }
    }
}
</style>
