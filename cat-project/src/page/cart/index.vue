<template>
  <div>
    <!-- 面包屑内容 -->
    <div class="crumbsTitle">
      <div class="crumbs">
        <p>首页</p>
        >
        <p>购物车</p>
      </div>
      <div class="car_cord">
        <p>购物车</p>
      </div>
    </div>
    <div class="partition"></div>

    <div class="cart" v-if="shopCartList.length !== 0">
      <!-- 购物车内容 -->
      <div class="centent">
        <div class="cartContent">
          <div class="list">
            <p></p>
            <p>宠物信息</p>
            <p>单价</p>
            <p>数量</p>
            <p>金额</p>
            <p>编辑</p>
          </div>

          <div
            class="data_list"
            v-for="(listItem, index) in shopCartList"
            :key="listItem.id"
          >
            <div class="selected" @click="changeSeletcted(index)">
              <span
                class="iconfont icon-xuanzhong"
                :class="listItem.isSelected ? 'active' : ''"
              ></span>
            </div>
            <div class="picture">
              <img :src="listItem.masterImg" alt="" />
            </div>
            <div class="price">
              <p>￥{{ listItem.originalPrice }}</p>
              <p>￥{{ listItem.discountPrice }}</p>
            </div>
            <div class="counter">
              <button @click="addShopItem(index)">+</button>
              <span>{{ listItem.likeNum }}</span>
              <button @click="removeShopItem(index)">-</button>
            </div>
            <div class="coupon">
              <p>￥{{ listItem.memberPrice }}</p>
              <button>优惠券</button>
            </div>
            <div class="delete" @click="deleteShopItem(index)">
              <span class="iconfont icon-shanchu1"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="footer">
        <div class="footer_left" @click="changeAllSelected">
          <span
            class="iconfont icon-xuanzhong"
            :class="AllSeleted ? 'active' : ''"
          ></span>
          <p>全选</p>
        </div>
        <div class="footer_right">
          <div class="count">
            <p>
              已选商品<span>{{ totalNum }}</span
              >件
            </p>
          </div>
          <div class="combined">
            <p>合计:</p>
            <span class="q">￥</span>
            <span class="num">{{ totalPrice }}</span>
          </div>
          <div class="settlement">
            <p>结算</p>
          </div>
        </div>
      </div>
      <div class="partition"></div>
    </div>
    <div class="tip" v-else>
      <div>
        <img src="./image/tip.svg" alt="" />
      </div>
      <p>购物车暂无数据，赶快去逛逛吧~</p>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce"
export default {
  name: "cart",
  data() {
    return {
      //控制全选按钮
      AllSeleted: false,
      //总数量
      totalNum: 0,
      //总价格
      totalPrice: 0,
      userId: "257627902303",
      pageSize: 6,
      curPage: 0,
      goodsIdList: [],
      goodsNum: [],
      goodsId: "100001",
      //定义一个存储购物车信息数据的数组
      shopCartList: [],
    };
  },
  async mounted() {
    //获取购物车列表数据
    const res1 = await this.$API.reqShopCarList(
      this.userId,
      this.pageSize,
      this.curPage
    );
    if (res1.code === 10000) {
      // 遍历里面的数据id 和  数量
      let IdNum = res1.data.cartList.map((item, index) => {
        return [item.goodsId, item.goodsNum];
      });
      //将id存储在数组中
      IdNum.forEach((item) => {
        this.goodsIdList.push(item[0]);
        this.goodsNum.push(item[1]);
      });
    }
    //遍历id数组 得到每个id
    this.goodsIdList.map(async (item) => {
      //获取商品详情信息
      const res2 = await this.$API.getShopItem(item);
      // console.log(res2)
      if (res2.code === 10000) {
        this.shopCartList.push(res2.data.goodsInfoList[0]);
        this.$set(res2.data.goodsInfoList[0], "isSelected", false);
        this.$set(res2.data.goodsInfoList[0], "likeNum", 2);
      }
    });
  },
  methods: {
    //点击改变选中效果
    changeSeletcted(index) {
      this.shopCartList[index].isSelected = !this.shopCartList[index]
        .isSelected;
      const AllSeleted = this.shopCartList.every((item) => {
        return item.isSelected;
      });
      this.AllSeleted = AllSeleted;
      this.sum();
    },
    //点击改变全选的状态
    changeAllSelected() {
      this.AllSeleted = !this.AllSeleted;
      this.shopCartList.some((item) => {
        item.isSelected = this.AllSeleted;
      });
      this.sum();
    },
    //点击添加商品的数量
    addShopItem:debounce(function(index) {
      this.shopCartList[index].likeNum += 1;
      this.sum();
    },200),
    //减少商品的数量
    removeShopItem:debounce(function(index) {
      if (this.shopCartList[index].likeNum === 0) {
        this.shopCartList[index].likeNum = 0;
      } else {
        this.shopCartList[index].likeNum -= 1;
      }
      this.sum();
    },200),
    //计算总数量及总价格
    sum() {
      //控制总数量
      let totalNum = 0;
      //控制总价格
      let totalPrice = 0;
      this.shopCartList.map((item) => {
        if (item.isSelected) {
          totalPrice += item.discountPrice * item.likeNum;
          totalNum += item.likeNum;
        }
      });

      this.totalNum = totalNum;
      this.totalPrice = totalPrice;
    },
    //点击删除购物车列表
    async deleteShopItem(index) {
      this.$confirm("您要删除该商品吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //删除购物车接口
          const { userId, goodsIdList } = this;
          let goodsId = goodsIdList[index];
          const res3 = await this.$API.DeleteList({ userId, goodsId });
          if(res3.code===10000){
            //刷新当前的页面
          location.reload();
          this.$message.success("删除成功");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.cart {
  width: 100%;
}
.crumbsTitle {
  width: 100%;
  margin: 0 auto;
  background-color: #eee;
}
.crumbs {
  width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.crumbs p {
  padding: 0 5px;
  font-size: 20px;
}
.crumbs p:nth-child(2) {
  color: #ff4400;
}
.car_cord {
  width: 1200px;
  max-width: 1200px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  background-color: #fff;
  padding-left: 10px;
}
.centent {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
}
.cartContent {
  width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
}
.list {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.list p {
  width: 17%;
  text-align: center;
  line-height: 50px;
}
.partition {
  width: 100%;
  height: 10px;
  background-color: #eee;
}
.data_list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px 0;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.selected span {
  text-align: center;
}
.picture {
  margin: 0 auto;
}
.picture img {
  width: 50%;
  height: 50%;
}
.price p:nth-child(1) {
  text-decoration: line-through;
  color: #ccc;
}
.data_list > div:first-child,
.data_list > div:nth-child(2),
.data_list > div:nth-child(3),
.data_list > div:nth-child(5),
.data_list > div:last-child {
  width: 17%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.counter {
  width: 17%;
  display: flex;
  justify-content: center;
}

.counter button {
  width: 25px;
  height: 25px;
  background-color: #eee;
  border: none;
}
.counter span {
  width: 30px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.coupon button {
  width: 100px;
  height: 30px;
  background-color: red;
  text-align: center;
  line-height: 30px;
  color: white;
  border: none;
  margin-top: 10px;
}
.coupon p {
  width: 100px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
.footer {
  width: 1200px;
  max-width: 1200px;
  height: 50px;
  background-color: #eee;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
}
.footer_left {
  width: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.footer_left img {
  width: 20px;
  height: 20px;
}
.footer_right {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.count {
  width: 150px;
  text-align: center;
  line-height: 60px;
}
.count span {
  font-size: 26px;
  color: red;
}
.combined {
  width: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.q {
  font-size: 16px;
  color: red;
}
.num {
  font-size: 30px;
  color: red;
}
.settlement {
  width: 100px;
  text-align: center;
  line-height: 60px;
  background-color: red;
  color: white;
}
.iconfont {
  font-size: 20px;
  color: #c1c1c1;
}
.iconfont.active {
  color: red;
}
.delete .iconfont:hover {
  color: red;
}
.tip {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.tip div {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.tip div img {
  width: 100%;
  height: 100%;
}
.tip p {
  text-align: center;
  font-size: 14px;
  color: #bbb;
}
</style>