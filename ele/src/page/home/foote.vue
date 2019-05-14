<template>
  <div>
    <div class="np">
      <header-top :go="true" :title=" this.$route.params.tit" :sy="false" :sy1="true">
    </header-top>
      <div><button>分类</button><button>排序</button><button>筛选</button></div>
    
    </div>
     <nr class="g"></nr>

  </div>
</template>

<script>
import HeaderTop from "../../components/header/head";
import Nr from "../../components/shoplist/nr";
export default {
  components: {
    HeaderTop,
    Nr
  }
};
</script>
<style lang="scss" scoped>
.np{
  width: 100%;
  height: 4rem;
  background: gold;
}
.g{
  overflow: auto;
  flex: 1;
}
</style>
