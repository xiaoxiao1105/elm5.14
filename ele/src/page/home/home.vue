<template>
  <div>
     <header-top :go="false" title=" " :sy="false" :sy1="true">
      <span slot="left"></span> 
       <span slot="right"></span>
    </header-top>
    <div class="content">
      <p>
        <span>当前定位城市:</span>
        <span></span>
        <span>定位不准时，请在城市列表中选择</span>
      </p>
      <p>
        <span>{{hot.name}}</span>
        <span></span>
       
        <router-link tag="span" to="'/home1'">
          <img src="../../../static/15.png">
        </router-link>
      </p>
    </div>
    <div class="hr"></div>
    <div class="con">
      <p>热门城市</p>
      <ul>
        
<router-link tag="li" :to="{name:'home1',params:{id:item.id}}"  v-for="(item) in data" :key="item.id">{{item.name}}</router-link>
      
      </ul>
    </div>
    <div class="hr"></div>
    <div class="coe" v-for="(i,index) in sortlist">
      <p>
        {{index}}
        <span>(按字母排序)</span>
      </p>
      <ul>
        <router-link tag="li" :to="{name:'home1',params:{id:ite.id}}" v-for="ite in list[index]" :key="ite.id">{{ite.name}}</router-link>
       
      </ul>
    </div>
  </div>
</template>


<script>
import HeaderTop from "../../components/header/head"

export default {
  components:{
    HeaderTop
  },
  data() {
    return {
      data: [],
      list: [],
      hot: "",
      lid: []
    };
  },
  methods:{
    
  },
  mounted() {
    //热门城市
    this.axios.get("http://elm.cangdu.org/v1/cities?type=hot").then(res => {
      if (res.data) {
        this.data = res.data;
        // console.log(this.data);
      }
    }),
      //获取当前城市
      this.axios.get("http://elm.cangdu.org/v1/cities?type=guess").then(res => {
        if (res.data) {
          // this.data = res.data;
          this.hot = res.data;
          // console.log(this.hot.id)
        }
      }),
      //获取全部城市
      this.axios.get("http://elm.cangdu.org/v1/cities?type=group").then(res => {
        
         if (res.data) {
         this.list = res.data;
          // console.log(this.list.A[0].id)
        }
      });
  },
  computed: {
    sortlist() {
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        
        if (this.list[String.fromCharCode(i)]) {
          // console.log(this.list[String.fromCharCode(i)])
          sortobj[String.fromCharCode(i)] = this.list[String.fromCharCode(i)
          ];
        }
      }
      return sortobj;
    }
  }
};
</script>


<style lang="less" scoped>
header {
  width: 100%;
  height: 2.5rem;
  background: #3792e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.6rem;
  p:nth-of-type(1) {
    font-size: 1rem;
    color: white;
  }
  p:nth-of-type(3) {
    img {
      width: 1.3rem;
      height: 1.6rem;
    }
  }
}
.content {
  width: 100%;
  & > p:nth-of-type(1) {
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0.6rem 0.3rem 0.6rem;
    border-bottom: 1px solid #cccccc;
    span {
      display: block;
      font-size: 0.5rem;
      color: #bebebe;
    }
  }
  p:nth-of-type(2) {
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.6rem;
    span {
      display: block;
      font-size: 0.5rem;
      color: #3792e5;
      img {
        width: 1.3rem;
        height: 1.4rem;
      }
    }
  }
}
.hr {
  width: 100%;
  height: 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #f2f2f2;
  border-top: 1px solid #f2f2f2;
}
.con {
  width: 100%;
  p {
    font-size: 0.5rem;
    color: #6d6d6d;
    padding: 0.3rem;
  }
  ul {
    width: 100%;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      line-height: 2rem;
      text-align: center;
      color: #3792e5;
      font-size: 0.5rem;
      border: 1px solid #f5f5f5;
    }
  }
}
.coe {
  width: 100%;
  p {
    font-size: 0.5rem;
    color: #6d6d6d;
    padding: 0.3rem;
    span {
      font-size: 0.5rem;
      color: #b7b7b7;
    }
  }
  ul {
    width: 100%;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      font-size: 0.5rem;
      line-height: 2rem;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #b7b7b7;
      border: 1px solid #f5f5f5;
    }
  }
}
</style>