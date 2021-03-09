<template>
    <div class="footer">
        <div class="footer_header">
            <el-tooltip class="item" effect="dark" content="https://github.com/ccxm" placement="top-start">
              <span class="iconfont icon-github github"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="15217808825" placement="top-start">
              <span class="iconfont icon-weixin-copy weixin"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="1532917281" placement="top-start">
              <span class="iconfont icon-QQ qq"></span>
          </el-tooltip>
        </div>
        <div class="footer_center">
          <div>
              <img src="./image/ewm.png" alt="">
              <p>公众号</p>
          </div>
          <div>
              <img src="./image/ewm.png" alt="">
              <p>个人号</p>
          </div>
        </div>
        <div class="footer_bottom">
         <span>ICP备12345678号</span>
         <span>Copyright© 2019 Cxm. All Rights Reserved. 丑小喵 版权所有</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"navfooter"
}
</script>
<style scoped>
  .footer{
      width: 100%;
      height: 300px;
  }
  .footer_header{
      width: 15%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 25px;
      margin-bottom: 25px;
  }
  .iconfont{
      font-size: 30px;
  }
  .github{
      color: #4b9afb;
  }
  .weixin{
      color: #61b053;
  }
  .qq{
      color: #12acfc;
  }
  .footer_center{
      width: 18%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
  }
  .footer_center div{
      width: 100px;
      height: 100px;
      text-align: center;
      font-size: 22px;
  }
  .footer_center div img{
      width: 70px;
      height: 70px;
  }
  .footer_center div p{
      margin-top:-1.5px;
  }
 .footer_bottom{
     width: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin-top: 30px;
     font-size: 20px;
 }
 .footer_bottom span{
     margin-top: 10px;
 }
</style>