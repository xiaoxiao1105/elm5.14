<template>
  <div class="hot">
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
    <div class="goods">
      <div class="left" ref="left">
        <ul>
          <li
            v-for="(item, index) in data1"
            :key="index"
            :class="{click: selector==index}"
            @click="toHash(item, index)"
          ><a :href="'#'+item.id">{{item.name}}</a></li>
        </ul>
      </div>
      <div class="right" @scroll="listScroll">
        <ul>
          <li v-for="(good, index1) in data1" :key="index1" >
            <h1 class="goodTitle">
             <a :name="good.id"> {{good.name}}</a>
              <span>{{good.description}}</span>
            </h1>
            <ul class="good" v-for="(item, index2) in good.foods" :key="index2">
              <!-- <!-- {{good.foods}} -->
              <li>
                <dl>
                  <dt>
                    <img :src="'//elm.cangdu.org/img/'+item.image_path" alt>
                  </dt>
                  <dd>
                    <h3>{{item.name}}</h3>
                    <p>{{item.description}}</p>
                    <div>{{item.tips}}</div>
                    <p v-if="item.activity">
                      <span>{{item.activity.image_text}}</span>
                    </p>
                  </dd>
                </dl>
              </li>
              <li>
                <div class="pre">
                  <span>￥</span>
                  <span v-if="ino==0" v-for="(i1,ino) in item.specfoods">{{i1.price}}</span>起
                </div>
                <div>
                  <div :class="{pop: true, mov: item.__v>0}">
                    <i class="fa fa-fw fa-minus-circle" @click="reduce(item)"></i>
                    {{item.__v}}
                  </div>
                  <i class="fa fa-fw fa-plus-circle" @click="increase(item, $event)"></i>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 运动的小球 -->
    <div id="points">
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
    </div>

    <div class="footer">
      <div>
        <i class="fa fa-fw fa-shopping-cart"></i>
        <!--记录订单总数  -->
        <div class="total" v-show="total>0">{{total}}</div>
      </div>
      <div :class="{pay: true, notPay: total==0}">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selector: 0,
      total: 0, // 购买总量
      data: "",
      data1: ""
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
    this.axios
      .get(
        "http://elm.cangdu.org/shopping/v2/menu?restaurant_id=" +
          this.$route.params.id
      )
      .then(res => {
        console.log(res.data);
        this.data1 = res.data;
      });
  },
  methods: {
    // 点击右侧导航栏
    toHash(item, index) {
      this.selector = index;
// window.location.hash = item.id;
      // 导航栏向上滚动相应距离，一个li的高度为54px
      this.$refs.left.scrollTop = (index > 7 ? index - 7 : 0) * 54;
    },
    // 食品选购按钮
    increase(item, event) {
      this.total++;
      item.__v++;

      // 小球动画
      var top = event.clientY, // 小球降落起点
        left = event.clientX,
        endTop = window.innerHeight - 30, // 小球降落终点
        endLeft = 20;

      // // 小球到达起点
      var outer = $("#points .pointPre")
        .first()
        .removeClass("pointPre")
        .css({
          left: left + "px",
          top: top + "px"
        });
      var inner = outer.find(".point-inner");

      setTimeout(function() {
        // 将jquery对象转换为DOM对象
        outer[0].style.webkitTransform =
          "translate3d(0," + (endTop - top) + "px,0)";
        inner[0].style.webkitTransform =
          "translate3d(" + (endLeft - left) + "px,0,0)";

        // 小球运动完毕恢复到原点
        setTimeout(function() {
          outer.removeAttr("style").addClass("pointPre");
          inner.removeAttr("style");
        }, 1000); //这里的延迟值和小球的运动时间相关
      }, 1);
    },
    reduce(item) {
      this.total--;
      item.__v--;
    },
    // 右侧菜单滑动
    listScroll() {
      // 为了达到联动效果，右侧滑动则改变左侧导航栏样式
      var titles = document.getElementsByClassName("goodTitle");

      for (var i = 0; i < titles.length; i++) {
        // var style = titles[i].getBoundingClientRect();
// console.log(style.top)
        if (titles[i].getBoundingClientRect().top == 107) {
          this.toHash(titles[i].innerHTML, i);
          console.log(titles[i].innerHTML)
        }
      }
    }
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
* {
  padding: 0;
  margin: 0;
  color: #494949;
}
li {
  list-style: none;
}
a {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: #000;
}
.goodTitle {
  font-size: 0.7rem;
  padding-bottom: 0.2rem;
  span {
    font-size: 0.4rem;
    color: gainsboro;
    margin-left: 0.3rem;
  }
}
.goods {
  display: flex;
  position: absolute;
  top: 105px;
  bottom: 46px;
  width: 100%;
  background-color: #eee;
  padding-top: 2px;
  /* overflow: hidden; */
}
.left {
  /* grow  shrink basis */
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
  overflow: scroll;
  font-size: 0.6rem;
}
.left > ul > li {
  height: 54px;
  line-height: 54px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.click {
  background-color: #fff;
}
.right {
  flex: 1;
  background-color: #fff;
  overflow: scroll;
}
.right li h1 {
  padding-left: 5%;
  background-color: #f3f5f7;
  position: sticky;
  top: 0;
  z-index: 10;
}
.good {
  // min-height: 300px;
  background-color: #fff;
  margin: 0 5%;
}
.good > li {
  border-bottom: 1px solid #ccc;
  height: 40px;
  font-size: 0.5rem;
  width: 95%;
  line-height: 40px;
  // text-align: right;
  display: flex;
  margin-bottom: 0.3rem;
  justify-content: space-between;
  overflow: hidden;
}
.good > li i {
  font-size: 0.8rem;
  line-height: 40px;
  color: #00a0dc;
}
/* 点击添加按钮缓慢弹出订单个数以及减少按钮 */
.pop {
  display: inline-block;
  position: relative;
  left: 48px;
  opacity: 0;
  transition: all ease 0.5s;
}
.pop i {
  transform: rotate(0deg);
  transition: all ease 0.5s;
}
.mov {
  left: 0;
  opacity: 1;
}
.pop.mov i {
  transform: rotate(-360deg);
}
.good li > div > i {
  position: relative;
  background-color: #fff;
  z-index: 0;
}

.footer {
  background-color: #555;
  width: 100%;
  height: 46px;
  line-height: 46px;
  bottom: 0;
  position: fixed;
  font-size: 45px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.footer i {
  color: #fff;
}
.footer .total {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0px;
  left: 46px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
  background-color: #00a0dc;
  font-size: 10px;
}
.pay {
  /* background-color: rgb(78, 207, 45); */
  background-color: #00a0dc;
  color: #fff;
  font-size: 18px;
  padding: 0 20px;
}
.notPay {
  background-color: #bbb;
}

/* 运动小球 */
.pointPre {
  /* 动画的小球 */
  display: none;
}
.pointOuter {
  position: absolute;
  z-index: 114;
  /* 当小球抛出时遵循贝塞尔曲线过渡 */
  -webkit-transition: all 1s cubic-bezier(0.39, -0.4, 0.83, 0.23) 0s;
  transition: all 1s cubic-bezier(0.39, -0.4, 0.83, 0.23) 0s;
}

.point-inner {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #00a0dc;
  /* 过渡属性名称 过渡时间 过渡曲线 延迟时间 */
  transition: all 1s ease 0s;
  -webkit-transition: all 1s ease 0s;
}
.good {
  width: 95%;
  li:nth-of-type(1) {
    width: 95%;
    height: 4rem;
    margin-bottom: 0;
    border-bottom: none;
    background: red;
    dl {
      width: 100%;
      display: flex;
      background: white;
      dt {
        width: 3rem;
        img {
          width: 3rem;
        }
      }
      dd {
        padding-left: 0.3rem;
        flex: 1;
        h3 {
          font-size: 0.7rem;
          height: 0.8rem;
        }
        p:nth-of-type(1) {
          color: gray;
          height: 0.8rem;
          font-size: 0.5rem;
        }
        p:nth-of-type(2) {
          height: 0.8rem;
          font-size: 0.5rem;

          span {
            border: 1px solid red;
            border-radius: 5px;
            color: red;
          }
        }
        div {
          font-size: 0.5rem;
          height: 0.8rem;
          // margin-top: 0.3rem;
        }
      }
    }
  }
}
.pre {
  color: gainsboro;
  span {
    color: orange;
    font-size: 0.7rem;
    font-weight: 600;
    margin-right: 0.3rem;
  }
  span:nth-of-type(1) {
    font-size: 0.3rem;
    margin-right: 0.1rem;
  }
}
header {
  width: 100%;
  height: 100%;
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
</style>