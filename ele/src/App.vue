<template>
  <div class="box">
    <!-- <router-view></router-view> -->
    <!-- <div class="con"><router-view></router-view></div> -->
    <!-- <keep-alive> -->
      <transition name="fade">
        <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </transition>
    
    <!-- </keep-alive> -->
    <!-- <div class="footer"><ele-footer></ele-footer></div>  -->
  </div>
</template>

<script>
// import EleFooter from "./components/ele/Footer";

export default {
   components: {
    // EleFooter
  }
}
</script>

<style lang="scss">
// @import './style/common';
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
ul{
  list-style: none;
}
html,body,#app,.box{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.con{
  width:100%;
  flex: 1;
  overflow: auto;
}

</style>
