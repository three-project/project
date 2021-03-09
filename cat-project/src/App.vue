<template>
  <div id="app">
     <!-- 头部的内容部分 -->
     <NavBanner />
     <Cart/>
     <NavFooter/>
  </div>
</template>

<script>
//引入购物车界面
import Cart from "./page/cart"
export default {
  name: 'App',
  components:{
    Cart
  }
}
</script>

<style>

</style>
