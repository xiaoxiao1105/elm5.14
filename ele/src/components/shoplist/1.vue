<template>
  <div class="box">
    <header>
      <router-link tag="div" :to="{name:'home2'}" class="dw"><</router-link>
      <div class="yi">
        <dl>
          <dt>
            <img :src="'//elm.cangdu.org/img/'+data.image_path">
          </dt>
          <dd>
            <h3>{{data.name}}</h3>
            <p>商家配送/分钟送达/配送费￥5</p>
            <div>
              公告：{{data.promotion_info}}
              <span class="l">></span>
            </div>
          </dd>
        </dl>
      </div>
      <div class="er" v-for="i in data.activities" v-if="data.activities">
        <span>{{i.icon_name}}</span>
        <span>{{i.description}}(APP专享)</span>
        <span>2个活动</span>
      </div>
    </header>
    <div class="center">
      <div class="nr1">
        <ul>
          <li>商品</li>
          <li>评价</li>
        </ul>
      </div>
      <div class="nr2">
        <div class="zuo">
          <ul>
            <li v-for="(i2,index) in data1" >{{i2.name}}</li>
            <!-- <li>优惠</li> -->
          </ul>
        </div>
        <div class="you">
          <div class="top">
            <p class="one">
              <span>热销榜</span>大家喜欢吃，才叫真好吃
            </p>
            <dl>
              <dt>
                <img src="../../../static/17.png" alt>
              </dt>
              <dd>
                <h3>我的牛肉面</h3>
                <p>商家配送/分钟送达/配送费￥1</p>
                <div>月售20份 好评100%</div>
                <p>
                  <span>￥20</span>
                  <span>
                    <button>+</button>
                    4
                    <button>-</button>
                  </span>
                </p>
              </dd>
            </dl>
          </div>
          <div class="top">
            <p class="one">
              <span>优惠</span>美味又实惠，大家快来抢
            </p>
            <dl>
              <dt>
                <img src="../../../static/18.png" alt>
              </dt>
              <dd>
                <h3>我的牛肉面</h3>
                <p>商家配送/分钟送达/配送费￥1</p>
                <div>月售20份 好评100%</div>
                
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <ul>
        <li>
          <span></span>
          <p>￥97.00</p>
          <div>配送费￥1</div>
        </li>
        <li>
          <button>去结算</button>
        </li>
      </ul>
    </footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      data: '',
      data1:''
    };
  },

  mounted() {
    this.axios
      .get(
        "http://elm.cangdu.org/shopping/restaurant/" +
          this.$route.params.id +
          "?latitude=" +
          this.$route.params.lat1 +
          "&longitude=" +
          this.$route.params.log1 +
          "&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics"
      )
      .then(res => {
        this.data = res.data;
      });
      this.axios.get("http://elm.cangdu.org/shopping/v2/menu?restaurant_id="+ this.$route.params.id).then(res=>{
        console.log(res.data)
        this.data1=res.data
      })
  }
};
</script>
<style lang="scss" scoped>
.l {
  position: absolute;
  top: 50px;
  right: 20px;
}
.dw {
  position: absolute;
  top: 20px;
  left: 10px;
  color: blue;
}
footer {
  width: 100%;
  ul {
    list-style: none;
    display: flex;
    li:nth-of-type(1) {
      position: relative;
      flex: 4;
      background: #3d3d3f;
      span {
        position: absolute;
        bottom: 0.7rem;
        left: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../../../static/55_03.jpg);
        background-size: 100% 100%;
      }
      p {
        font-size: 0.7rem;
        font-weight: bold;
        color: white;
        margin-left: 4rem;
      }
      div {
        color: white;
        font-size: 0.4rem;
        margin-left: 4rem;
      }
    }
    li:nth-of-type(2) {
      flex: 1;
      button {
        width: 100%;
        height: 1.5rem;
        background: #53d76a;
        color: white;
        text-align: center;
        border: none;
        border: 1px solid #53d76a;
      }
    }
  }
}
header {
  width: 100%;
  background: #788bc2;
  .yi {
    width: 100%;
    dl {
      widows: 100%;
      display: flex;
      margin-top: 0.3rem;
      dt {
        padding-left: 0.3rem;
        flex: 1;
        img {
          width: 100%;
          vertical-align: middle;
        }
      }
      dd {
        flex: 4;
        padding-left: 0.3rem;
        h3 {
          font-size: 0.7rem;
          color: white;
        }
        p {
          font-size: 0.5rem;
          color: white;
          padding-top: 0.3rem;
        }
        div {
          font-size: 0.5rem;
          color: white;
          padding-top: 0.3rem;
          span {
            margin-left: 8rem;
            font-size: 0.7rem;
          }
        }
      }
    }
  }
  .er {
    width: 100%;
    span:nth-of-type(1) {
      margin-left: 0.4rem;
      width: 0.4rem;
      height: 0.3rem;
      color: white;
      background: #ee7476;
      font-size: 0.5rem;
    }
    span:nth-of-type(2) {
      font-size: 0.5rem;
      color: white;
    }
    span:nth-of-type(3) {
      font-size: 0.5rem;
      color: white;
    }
    span:nth-of-type(4) {
      font-size: 0.5rem;
      color: white;
      margin-left: 6rem;
    }
  }
}
.center {
  width: 100%;
  flex: 1;
  overflow: auto;
  background: #f5f5f5;
}
.nr1 {
  width: 100%;
  background: white;
  border-bottom: 1px solid #ebebeb;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    li {
      font-size: 0.9rem;
      color: #666666;
      padding-bottom: 0.3rem;
      padding-top: 0.3rem;
    }
  }
}
.nr2 {
  width: 100%;
  display: flex;
}
.zuo {
  flex: 1;
  ul {
    li {
      text-align: center;
      font-size: 0.7rem;
      color: #666666;
      padding-top: 0.3rem;
      padding-bottom: 0.5rem;
    }
    li:nth-of-type(1) {
      border-left: 2px solid #3792e5;
      background: white;
    }
  }
}
.you {
  flex: 3;
}
.top {
  width: 100%;
  .one {
    font-size: 0.5rem;
    background: #f5f5f5;
    margin-top: 0.3rem;
    padding-bottom: 0.3rem;
    span {
      font-size: 0.7rem;
      color: #666666;
      font-weight: bold;
      margin-left: 0.3rem;
    }
  }
  dl {
    widows: 100%;
    display: flex;
    background: white;
    dt {
      flex: 1;
      img {
        width: 100%;
      }
    }
    dd {
      padding-left: 0.3rem;
      flex: 2;
      h3 {
        font-size: 0.7rem;
      }
      p:nth-of-type(1) {
        color: gray;
        font-size: 0.5rem;
        margin-top: 0.3rem;
      }
      div {
        font-size: 0.5rem;
        margin-top: 0.3rem;
      }
      p:nth-of-type(2) {
        font-size: 0.7rem;
        margin-top: 0.6rem;
        margin-bottom: 0.4rem;
        span:nth-of-type(1) {
          color: #fc6721;
        }
        span:nth-of-type(2) {
          margin-left: 3rem;
          color: #666666;
          button {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
            border: none;
            border: 1px solid #3792e5;
            outline: none;
          }
          button:nth-of-type(1) {
            background: #3792e5;
            color: white;
          }
        }
      }
    }
  }
}
</style>