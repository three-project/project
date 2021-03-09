<template>
  <div class="DetailContents">
    <!-- 外层100%盒子 -->
    <div class="Detail">
      <!-- 导航条部分 -->
      <div class="nav">
        <span>首页</span>
        <span>></span>
        <span>宠物详情</span>
      </div>
      <!-- 商品详细信息 -->
      <div class="ProductDetails">
        <div class="DetailMainimg">
          <div class="DetailMainbigimg">
            <img :src="bigImg" />
          </div>
          <div class="DetailMainsmallimg" v-if="shopCartList.goodsInfo">
            <img
              v-for="(item, index) in shopCartList.goodsInfo.imgList"
              :key="item"
              @click="handersmallimg(index, item)"
              :class="currindex === index ? 'active' : ''"
              :src="item"
              alt=""
            />
          </div>
        </div>
        <div class="DetailText" v-if="shopCartList.goodsInfo">
          <div class="MainTitle">{{ shopCartList.goodsName }}</div>
          <div class="IntroductionText">{{ shopCartList.goodsInfo.intro }}</div>
          <div class="OriginalPrice">
            价格:<span>￥{{ shopCartList.originalPrice }}</span>
          </div>
          <div class="discountPrice">
            促销价:<span>￥{{ shopCartList.discountPrice }}</span>
          </div>
          <div class="coupon">
            <div class="couponText">优惠券:</div>
            <button class="couponButton">优惠券</button>
          </div>
          <div class="ShipAddress">
            <div>上海</div>
            <div>至</div>
            <div>
              北京<span>|</span>运费{{ shopCartList.goodsInfo.postage }}元
            </div>
          </div>
          <div class="Instock">
            <div class="Instock_Buttom">
              <button @click="addcar"></button>
              <div>{{ count }}</div>
              <button @click="deletecar"></button>
            </div>
            <div class="Instock_Text">库存：{{ InStock }}</div>
          </div>
          <div class="BuyButton">
            <button>立即购买</button>
            <button>加入购物车</button>
          </div>
          <div class="Sales">
            <div>
              <span>总销量</span>
              <span>{{ shopCartList.saleVolume }}</span>
            </div>
            <div>
              <img src="../images/3.png" alt="" />
              <span>6</span>
            </div>
            <div>
              <img src="../images/love.svg" alt="" />
              <span>{{ shopCartList.likeNum }}</span>
            </div>
          </div>
        </div>
        <div class="DetailSmallimg">
          <div class="DetailSmallimgtext">
            <span>——看了又看——</span>
          </div>
          <!-- 轮播图部分 -->
          <swiper
            style="margin-top: -10px"
            :options="{
              slidesPerView: 3, //显示几张图
              slidesPerGroup: 3, //每次移动几个图片
              direction: 'vertical',
              loop: true,
              grabCursor: true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            }"
          >
            <swiper-slide
              v-for="(more, index) in moreshopList.moreGoodsList"
              :key="index"
              ><img
                class="action"
                :class="currindex2 == index ? 'active' : ''"
                v-lazy="more.masterImg"
                @click="handerswiper(index)"
              />
              <span class="carname">{{ more.goodsName }}</span>
            </swiper-slide>
            <div
              class="swiper-button-prev iconfont icon-jiantoushang"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next iconfont icon-jiantouxia"
              slot="button-next"
            ></div>
          </swiper>
          <div class="Detailanniu"></div>
        </div>
      </div>
      <!-- 评论区部分 -->
      <div class="CommentAea">
        <div class="CommentAeaH1">
          评论({{ Comments.commentList[0].list.length }})
        </div>
        <div class="ShortComment">
          <div class="top">
            <div class="ShortComment_left">
              <el-rate v-model="value1" class="wx"></el-rate>
              <span>{{ value1 }}</span>
            </div>
            <div class="ShortComment_right">
              <div class="text">短评</div>
              <div class="EvaluationCollection">
                <div class="el">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    >+ 新弹幕</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="LongEvaluation"
          v-for="(item, index) in Comments.commentList[0].list"
          :key="index"
        >
          <div class="LongEvaluationItem">
            <div class="toxiang">
              <span class="iconfont icon-touxiang"></span>
              <span class="iconfont icon-huangguan"></span>
            </div>
            <div class="yonghuming">
              <span class="qq">22***m</span>
              <span class="iconfont icon-vip"></span>
            </div>
            <span class="time">{{ item.createAt }}</span>
            <div class="commit">
              <p>{{ item.comment }}</p>
              <div class="dianzan">
                <span
                  class="iconfont icon-dianzan"
                  :class="isdianzan === index ? 'zang' : ''"
                  @click="dianzang(index)"
                  >1</span
                >
                <span
                  class="iconfont icon-tubiaozhizuomoban-21"
                  :class="iscai === index ? 'zang' : ''"
                  @click="cai(index)"
                  >1</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="img">
            <img :src="this.shopCartList.goodsInfo.imgList[0]" alt="" />
          </div>
          <div class="hold">
            <el-rate v-model="value" class="wx"></el-rate>
            <span>{{ value }}</span>
          </div>
          <div class="int">
            <input type="text" placeholder="说说你对猫咪的评价吧" ref="long" />
            <span class="iconfont icon-qingchu" @click="clear"></span>
            <button class="btn" @click="longcomment">发送评论</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引入vuex辅助函数
import { mapState } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      //默认购买的数量
      count: 1,
      //默认库存
      InStock: 999,
      currindex: 0,
      currindex2: 0,
      //五星评分系统--element-ui
      value1: null,
      value: null,
      comm: [],
      isdianzan: null,
      iscai: null,
      //默认存储图片
      bigImg:
        "https://gd4.alicdn.com/imgextra/i4/2200828121620/O1CN01sqP54e1Nq0BW6v1Y8_!!2200828121620.jpg_.webp",
      //tag标签---element-ui
      dynamicTags: ["好可爱", "太他妈可爱了", "太太太可爱了"],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    //增加商品数量
    addcar() {
      if (this.count < 1) {
        this.count = 1;
      } else if (this.InStock <= 0) {
        this.InStock = 0;
      } else {
        this.count = this.count + 1;
        this.InStock = this.InStock - 1;
      }
    },
    //减少商品数量
    deletecar() {
      if (this.count <= 1) {
        this.count = 1;
      } else {
        this.count = this.count - 1;
        this.InStock = this.InStock + 1;
      }
    },
    //点击小图
    handersmallimg(index, item) {
      this.currindex = index;
      this.bigImg = item;
    },
    //点击右侧轮播
    handerswiper(index) {
      this.currindex2 = index;
    },
    //点赞
    dianzang(index) {
      this.isdianzan = index;
    },
    //踩
    cai(index) {
      this.iscai = index;
    },
    //清空文本框
    clear() {
      this.$refs.long.value = "";
    },
    //tag标签---element-ui
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      // 书写短评
      let WhiteShortComment = {
        goodsId: this.shopCartList.goodsId,
        brief: inputValue,
        color: "#409EFF",
      };
      this.$store.dispatch("getWhiteShortCommentList", WhiteShortComment);
      //修改完成之后再次刷新短评列表
      this.$store.dispatch("getShortCommentListData", 100002);
    },
    //发表评论
    longcomment() {
      let LongComment = {
         goodsId:this.shopCartList.goodsId,
         comment:this.$refs.long.value,
         rate:5
      }
     if((this.$refs.long.value).trim() == ''){
       this.$message.error('评论不能为空')
     }else {
         //发表评论
      this.$store.dispatch("getWhiteLongCommentList",LongComment)
      //刷新页面
      this.$store.dispatch("getComments", 100001);
      //提示用户
      this.$message.success('评论发表成功')
     }
    },
  },
  mounted() {
    this.$store.dispatch("getshopCartList"),
    this.$store.dispatch("getshopList");
    this.$store.dispatch("getmoreshopList", 6);
    this.$store.dispatch("getShortCommentListData", 100001);
    this.$store.dispatch("getComments", 100001);
    setTimeout(()=>{
       const brief = this.ShortCommentListData.briefList.map((item) => {
      return item.brief;
    });
    this.dynamicTags = brief;
    },1000)
  },
  //计算属性
  computed: {
    ...mapState({
      shopCartList: (state) => state.car.shopCartList,
      moreshopList: (state) => state.car.moreshopList,
      ShortCommentListData: (state) => state.car.ShortCommentListData,
      WhiteShortCommentList: (state) => state.car.WhiteShortCommentList,
      Comments: (state) => state.car.Comments,
    }),
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.DetailContents {
  width: 100%;
}
.DetailContents .Detail {
  width: 100%;
  margin: 0 auto;
}
/* 导航条样式 */
.DetailContents .Detail .nav {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
  background: #f2f2f2 !important;
  display: flex;
}
.DetailContents .Detail .nav span {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 40px;
}
.DetailContents .Detail .nav span:nth-child(2) {
  margin-left: 10px;
  color: rgb(192, 196, 204);
}
.DetailContents .Detail .nav span:nth-child(3) {
  margin-left: 10px;
  color: #ff7c25 !important;
}
/* 商品详细信息样式 */
.DetailContents .ProductDetails {
  display: flex;
  justify-content: space-around;
  width: 1200px;
  height: 505px;
  margin: 15px auto;
}
/* 左边主图样式 */
.DetailContents .ProductDetails .DetailMainimg {
  width: 372px;
  height: 100%;
}

.DetailContents .ProductDetails .DetailMainimg .DetailMainbigimg img {
  width: 100%;
  height: 100%;
}
.DetailContents .ProductDetails .DetailMainimg .DetailMainsmallimg {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.DetailContents .ProductDetails .DetailMainimg .DetailMainsmallimg img {
  width: 62px;
  height: 62px;
}
/* 鼠标移入添加边框 */
.active {
  border: 1px solid black;
}
.action {
  width: 118px;
  height: 118px;
  position: relative;
}
.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 20px !important;
  color: #1b251f;
  font-weight: 700;
  opacity: 0;
  position: absolute;
  top: 300px;
}
.icon-jiantoushang:before,
.icon-jiantouxia:before {
  position: absolute;
  color: #1b251f;
  top: 207px;
}
.carname {
  position: absolute;
  color: white;
  left: 50%;
  width: 118px;
  margin-left: -58px;
  bottom: 18px;
  font-size: 12px;
  background: rgba(255, 68, 0, 0.5);
}
/* 中间样式 */
.DetailContents .ProductDetails .DetailText {
  width: 571px;
  height: 100%;
  position: relative;
}
.DetailContents .ProductDetails .DetailText .MainTitle {
  font-size: 24px;
  color: #1b251f;
  font-family: Adobe Heiti Std R;
  font-weight: 700;
  position: absolute;
  left: 0;
}
.DetailContents .ProductDetails .DetailText .IntroductionText {
  font-size: 18px;
  color: #ff7c25;
  position: absolute;
  top: 60px;
  left: 0;
}
.DetailContents .ProductDetails .DetailText .OriginalPrice {
  position: absolute;
  top: 120px;
  font-size: 21px;
  font-family: Source Han Sans CN;
  color: #333;
  height: 20px;
}
.DetailContents .ProductDetails .DetailText .discountPrice {
  position: absolute;
  top: 180px;
  font-size: 21px;
  font-family: Source Han Sans CN;
  color: #333;
  height: 20px;
}
.DetailContents .ProductDetails .DetailText .OriginalPrice span {
  font-size: 20px !important;
  margin-right: 0 !important;
  color: #999 !important;
  text-decoration: line-through;
}
.DetailContents .ProductDetails .DetailText .coupon {
  display: flex;
  position: absolute;
  top: 240px;
}
.DetailContents .ProductDetails .DetailText .coupon .couponText {
  font-size: 21px;
  font-family: Source Han Sans CN;
  color: #333;
}
.DetailContents .ProductDetails .DetailText .coupon .couponButton {
  width: 88px;
  height: 33px;
  font-size: 16px;
  margin-left: 15px;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  background: rgb(255, 68, 0);
}
.DetailContents .ProductDetails .DetailText .coupon .couponButton:hover {
  /* font-weight: 700; */
  background: rgb(205, 105, 51);
  transform: scale(1.1);
  transition: all ease 1s;
}
.DetailContents .ProductDetails .DetailText .ShipAddress {
  display: flex;
  position: absolute;
  top: 300px;
  vertical-align: middle;
}
.DetailContents .ProductDetails .DetailText .ShipAddress div:nth-child(1) {
  font-size: 21px;
  font-family: Source Han Sans CN;
  color: #333;
}
.DetailContents .ProductDetails .DetailText .ShipAddress div:nth-child(2) {
  font-size: 18px;
  color: #f40;
  margin: 3px 20px;
}
.DetailContents .ProductDetails .DetailText .ShipAddress div:nth-child(3) {
  font-size: 22px;
  color: #333;
}
.DetailContents .ProductDetails .DetailText .ShipAddress div:nth-child(3) span {
  font-size: 26px;
  color: #ddd;
}
.DetailContents .ProductDetails .DetailText .Instock {
  display: flex;
  position: absolute;
  top: 360px;
}
.DetailContents .ProductDetails .DetailText .Instock .Instock_Buttom {
  display: flex;
  border: 2px solid #f0f0f0;
}
.DetailContents .ProductDetails .DetailText .Instock .Instock_Buttom button {
  width: 25px;
  height: 25px;
}
.DetailContents .ProductDetails .DetailText .Instock .Instock_Buttom div {
  box-shadow: inset 0 0 6px transparent;
  width: 30px;
  height: 25px;
  line-height: 25px;
  background: white;
}
.DetailContents
  .ProductDetails
  .DetailText
  .Instock
  .Instock_Buttom
  button:first-of-type {
  outline: none;
  border: none;
  background: rgb(240, 240, 240) url(../images/1.svg) no-repeat 50%;
  background-size: 15px 15px;
}
.DetailContents
  .ProductDetails
  .DetailText
  .Instock
  .Instock_Buttom
  button:last-of-type {
  outline: none;
  border: none;
  background: rgb(240, 240, 240) url(../images/2.svg) no-repeat 50%;
  background-size: 15px 15px;
}
.DetailContents .ProductDetails .DetailText .Instock .Instock_Text {
  font-size: 21px;
  color: #333;
  margin: -4px 0 0 30px;
}
.DetailContents .ProductDetails .DetailText .Sales {
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  height: 46px;
  top: 420px;
  border-top: 1px solid #eeebe7;
  border-bottom: 1px solid #eeebe7;
}
.DetailContents .ProductDetails .DetailText .Sales div {
  display: flex;
  align-items: center;
}
.DetailContents .ProductDetails .DetailText .Sales div:nth-child(1) {
  font-size: 18px;
  font-family: Source Han Sans CN;
  color: #b2b2b2;
}
.DetailContents
  .ProductDetails
  .DetailText
  .Sales
  div:nth-child(1)
  span:last-child {
  padding-left: 5px;
  color: #ff4400;
}
.DetailContents .ProductDetails .DetailText .Sales div:nth-child(2) img {
  width: 25px;
  height: 23px;
  padding-right: 5px;
}
.DetailContents .ProductDetails .DetailText .Sales div:nth-child(3) img {
  width: 18px;
  height: 18px;
  padding-right: 5px;
}
.DetailContents .ProductDetails .DetailText .BuyButton {
  position: absolute;
  top: 480px;
}
.DetailContents .ProductDetails .DetailText .BuyButton button {
  border: none;
  outline: none;
  background: #ff4400;
  color: white;
  width: 183px;
  height: 45px;
  font-size: 18px;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
}
.DetailContents .ProductDetails .DetailText .BuyButton button:last-child {
  margin-left: 100px;
}
/* 右侧小图区域 */
.DetailContents .ProductDetails .DetailSmallimg {
  width: 150px;
  height: 100%;
  box-shadow: -7px -6px 13px 14px transparent;
  background: white;
  border-radius: 6px;
  -moz-box-shadow: 2px 2px 10px #909090;
  -webkit-box-shadow: 2px 2px 10px #909090;
  box-shadow: 2px 2px 10px #909090;
  overflow: hidden;
  position: relative;
}
.DetailContents .ProductDetails .DetailSmallimg .DetailSmallimgtext {
  height: 49px;
  line-height: 49px;
}
.swiper-container {
  width: 118px;
  height: 405px !important;
}
.Sideview {
  height: 118px !important;
}
.swiper-container img {
  width: 100%;
}
.DetailContents .ProductDetails .DetailSmallimg .Sideview img {
  width: 116px;
  height: 30px;
}
.DetailContents .ProductDetails .DetailSmallimg .Detailanniu {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.DetailContents .CommentAea {
  width: 1150px;
  /* height: 500px; */
  /* border: 1px solid black; */
  margin: 0 auto;
  margin-top: 50px;
}
.DetailContents .CommentAea .ShortComment .top {
  display: flex;
  border-bottom: 1px solid rgb(225, 225, 225);
}
.DetailContents .CommentAea .CommentAeaH1 {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #e8e8e8;
  font-size: 26px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333;
}
.DetailContents .CommentAea .ShortComment .ShortComment_left {
  width: 187px;
  height: 110px;
  border-right: 2px dashed #f40;
  margin-left: 20px;
  position: relative;
}
.DetailContents .CommentAea .ShortComment .ShortComment_left .wx {
  position: absolute;
  left: 50%;
  margin-left: -55px;
  /* transform: translateX(-50%); */
  bottom: 50px;
}
.DetailContents .CommentAea .ShortComment .ShortComment_left span {
  position: relative;
  /* top: 20px; */
  font-size: 40px;
  font-family: Source Han Sans CN;
  font-weight: 800;
  color: #f40;
  text-align: center;
}
.DetailContents .CommentAea .ShortComment .ShortComment_right {
  width: 1000px;
  display: flex;
  align-items: center;
}
.DetailContents .CommentAea .ShortComment .ShortComment_right .text {
  writing-mode: tb-rl;
  font-family: Source Han Sans CN;
  padding-left: 8px;
  font-size: 25px;
  font-weight: 400;
  color: #f40;
  letter-spacing: 3px;
}
.DetailContents
  .CommentAea
  .ShortComment
  .ShortComment_right
  .EvaluationCollection {
  width: 900px;
  height: 100%;
  margin-left: 10px;
  display: flex;
}
.DetailContents
  .CommentAea
  .ShortComment
  .ShortComment_right
  .EvaluationCollection
  .el {
  margin: 10px 0;
}
.LongEvaluation {
  width: 1150px;
  margin: 0 auto;
}
.LongEvaluation .LongEvaluationItem {
  display: flex;
  height: 88px;
  border: 1px solid #eeebe7;
}
.LongEvaluation .LongEvaluationItem .toxiang {
  position: relative;
  margin: 10px 0 0 55px;
}
.LongEvaluation .LongEvaluationItem .toxiang .icon-touxiang {
  font-size: 50px;
  color: #999;
}
.LongEvaluation .LongEvaluationItem .toxiang .icon-huangguan {
  position: absolute;
  bottom: 0;
  top: 36px;
  left: 36px;
  color: rgb(238, 238, 10);
}
.LongEvaluation .LongEvaluationItem .yonghuming {
  position: relative;
}
.LongEvaluation .LongEvaluationItem .yonghuming .qq {
  position: absolute;
  top: 25px;
  left: 15px;
}
.LongEvaluation .LongEvaluationItem .yonghuming .icon-vip {
  position: absolute;
  right: -105px;
  top: 24px;
  font-size: 25px;
}
.LongEvaluation .LongEvaluationItem .time {
  position: relative;
  font-size: 12px;
  color: #999;
  top: 65px;
  left: -46px;
}
.LongEvaluation .LongEvaluationItem .commit {
  position: relative;
  width: 700px;
  height: 100%;
  left: 25px;
  /* border: 1px solid red; */
}
.LongEvaluation .LongEvaluationItem .commit p {
  position: absolute;
  box-shadow: inset 0 0 6px transparent;
  color: #999;
  top: 25px;
}
.LongEvaluation .LongEvaluationItem .commit .dianzan {
  right: -150px;
  top: 35px;
  position: absolute;
}
.LongEvaluation .LongEvaluationItem .commit .dianzan span:last-child {
  margin-left: 20px;
}
.zang {
  font-weight: 700;
}
.bottom {
  display: flex;
  /* justify-content: space-around; */
  width: 100%;
  border: 1px solid #eeebe7;
  position: relative;
}
.bottom .img img {
  width: 90px;
  height: 90px;
  padding: 20px;
}
.bottom .hold {
  top: 80px;
  left: 40px;
  position: relative;
}
.el-rate {
  display: flex;
  height: 20px;
  top: 30px;
  left: -36px;
  position: absolute;
}
.bottom .hold span {
  position: relative;
  top: -46px;
  font-size: 40px;
  font-family: Source Han Sans CN;
  font-weight: 800;
  color: #f40;
  /* text-align: center; */
}
.bottom .int {
  position: relative;
  width: 890px;
  /* border: 1px solid yellow; */
  left: 100px;
  display: flex;
  align-items: center;
}
.bottom .int input {
  width: 750px;
  height: 40px;
  font-family: Source Han Sans CN;
  color: #333;
  border: 1px solid #eeebe7;
}
.bottom .int .icon-qingchu {
  margin-left: -26px;
  color: #ccc;
}
.bottom .int .btn {
  position: absolute;
  right: 20px;
  width: 100px;
  border: none;
  height: 40px;
  outline: none;
  background: #f40;
  color: #fff;
}
/* tag样式修改--element */
.input-new-tag {
  width: 62px !important;
  height: 32px !important;
}
.el-tag {
  margin: 0 10px;
}
.el-button {
  height: 32px;
}
.button-new-tag {
  margin: 0 10px !important;
}
</style>