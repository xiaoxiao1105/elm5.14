<template>
  <div class="heade">
    <slot name="left"></slot>
    <slot name="right"></slot>
<!-- angle-left -->
    <div @click="$router.go(-1)">
      <span slot="left">
        <span v-if="go">
          <i class="fa fa-angle-left"></i>
        </span>
        <span v-else>ele.me</span>
      </span>
    </div>
    <div>{{title}}</div>
    <div>
      <!-- <router-link tag="span" to="/home" slot="left"> -->
      <span @click="dj">
<span v-show="sy">{{right}}</span>
        <span v-show="sy1">
          <i class="fa fa-user fa-fw"></i>
        </span>
      </span>
        
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["go", "title", "sy","sy1",'right'],
  data() {
    return {
    };
  },
  mounted(){
    
  },
  methods:{
    dj(){
        if(this.right==='编辑'){
      this.$router.push('/my')
    }
    }
  }
};
</script>

<style lang="scss" scoped>
.heade {
  width: 100%;
  height: 2rem;
  display: flex;
  font-weight: 600;
  color: white;
   background: #3190e8;
  & > div {
    width: 15%;
    font-size: 0.6rem;
    line-height: 2rem;
    text-align: center;
    img {
      width: 30%;
      margin-top: 0.4rem;
    }
  }
  & > div:nth-of-type(2) {
    flex: 1;
  }
}
</style>
