<template>
  <div>
    <ul>
      <router-link tag="li" to="/msite/:geoha">
      <i class="fa fa-fw fa-snowflake-o"></i>
        <span>外卖</span>
      </router-link>
      <router-link tag="li" to="/search">
      <i class="fa fa-fw fa-search"></i>
        <span>搜索</span>
      </router-link>
      <router-link tag="li" to="/order">
      <i class="fa fa-fw fa-indent"></i>
        <span>订单</span>
      </router-link>
      <router-link tag="li" to="/my">
      <i class="fa fa-user-o fa-fw"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>


<script>
export default {};
</script>


<style lang="less" scoped>
 ul{
        padding: 0.4rem 0;
        width: 100%;
        height: 100%;
        border-top: 1px solid #e4e4e4;
        list-style: none;
        display: flex;
        li{
            flex: 1;
            text-align: center;
            img{
                width: 1rem;
                height: 1rem;
            }
            span{
                display: block;
                font-size: 0.5rem;
                color: #7b7b7b;
            }
        }
    }
</style>
