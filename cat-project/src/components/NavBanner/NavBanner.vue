<template>
  <div class="banner">
    <div class="title">
      <!-- 头部的左侧 -->
      <div class="banner_left">
        <img src="./images/github.a5ee684f.png" alt="" />
        <p><span>丑小喵</span></p>
      </div>
      <!-- 头部的右侧 -->
      <div class="banner_right">
        <el-dropdown>
          <img src="./images/597170005445.png" alt="" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>邮箱:</el-dropdown-item>
            <el-dropdown-item>昵称:</el-dropdown-item>
            <el-dropdown-item>我的余额</el-dropdown-item>
            <el-dropdown-item>我的主页</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <img src="./images/cart.png" alt="" />
      </div>
    </div>
    <!-- 轮播图 -->

    <el-carousel :interval="5000" arrow="always" autoplay>
      <el-carousel-item>
        <img src="./images/banner_01.6e9153e8.png" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="./images/banner_02.dd330319.png" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="./images/banner_03.40ae7e7c.png" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "NavBanner",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
    };
  },
  method: {
    methods: {
      handleClick() {
        alert("button click");
      },
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.banner {
  width: 100%;
  background-color: #f6f6f6;
}
.title {
  width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title .banner_left {
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title .banner_left img {
  width: 50px;
  height: 50px;
}
.title .banner_left p {
  font-weight: bolder;
  color: #ff4400;
  margin-left: 10px;
}
.title .banner_right {
  width: 120px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title .banner_right img {
  width: 50px;
  height: 55px;
}
/* 头像下拉 */
.banner_right >>> .el-dropdown {
  vertical-align: top;
}
.banner_right >>> .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.banner_right >>> .el-icon-arrow-down {
  font-size: 12px;
}
/* 轮播图 */
.banner_right >>> .el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.banner_right >>> .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.banner_right >>> .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>