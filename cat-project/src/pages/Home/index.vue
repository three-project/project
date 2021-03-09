<template>
  <div class="home">
    <!-- 面包屑 -->
    <div class="bread">
      <div class="bread-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>宠物列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="good-list-container">
      <div class="left-price">
        <span class="left-price-head">价格范围</span>

        <el-checkbox-group
          v-model="checked"
          class="el-checkbox-group left-price-content"
          :min="1"
          @change="onChange"
        >
          <el-checkbox
            v-for="(item, key) in PRICE_RANGE"
            :label="item.value"
            :key="key"
            >{{ item.label }}</el-checkbox
          >
          <!-- <el-checkbox label="ALL" checked></el-checkbox>
          <el-checkbox label="0.00-100.00"></el-checkbox>
          <el-checkbox label="100.00-500.00"></el-checkbox>
          <el-checkbox label="500.00-1000.00"></el-checkbox>
          <el-checkbox label="1000+"></el-checkbox> -->
        </el-checkbox-group>
      </div>

      <div class="right-goods">
        <!-- 排序 -->
        <div class="right-goods-top">
          <div class="paixu">
            <span>排序</span>
            <i
              class="el-icon-top"
              :class="down ? 'down' : ''"
              @click="handledown()"
            ></i>
          </div>
        </div>
        <!-- 猫猫列表 -->
        <div class="right-goods-middle" v-if="goodsList">
          <div
            class="goods"
            v-for="goodsList in goodsList.goodsList"
            @click="$router.push(`/detail?goodsId=${goodsList.goodsId}`)"
            :key="goodsList.goodsId"
          >
            <div class="goods-item">
              <div class="cat-pic">
                <img :src="goodsList.masterImg" alt="" />
              </div>
              <div class="cat-title">
                <div class="title-name">
                  <span>{{ goodsList.goodsName }}</span>
                  <span>包邮</span>
                </div>
                <div class="title-like">
                  <img src="../../assets/image/like_0.0ba626c3.svg" alt="" />
                  <span>{{ goodsList.likeNum }}</span>
                </div>
              </div>
              <div class="cat-price">
                <div class="money">
                  <span class="money-icon" style="color: rgb(221, 82, 77)"
                    >￥</span
                  >
                  <span class="money-text" style="color: rgb(221, 82, 77)">{{
                    goodsList.discountPrice
                  }}</span>
                </div>
                <div class="money discount">
                  <span class="money-icon" style="color: rgb(221, 82, 77)"
                    >￥</span
                  >
                  <span class="money-text" style="color: rgb(221, 82, 77)">{{
                    goodsList.originalPrice
                  }}</span>
                </div>
              </div>
              <div class="cat-vip">
                <img src="../../assets/image/vip.png" alt="" />
                <span>会员价</span>
                <div class="money">
                  <span class="money-icon" style="color: rgb(221, 82, 77)"
                    >￥</span
                  >
                  <span class="money-text" style="color: rgb(221, 82, 77)">{{
                    goodsList.memberPrice
                  }}</span>
                </div>
              </div>
              <div class="cat-addtocart">
                <button @click.stop="openToCart()">加入购物车</button>
              </div>
            </div>
          </div>
          <!-- 去购物车对话框 -->
          <el-dialog title="提示" :visible.sync="toLogin" width="400px" center>
            <span>加入购物成功</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click.stop="$router.push(`/cart`)"
                >去购物车</el-button
              >
              <el-button @click.stop="centerDialogVisible = false"
                >取 消</el-button
              >
            </span>
          </el-dialog>
        </div>

        <!-- 无限加载 -->
        <!-- <div
          class="load-infinite infinite-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="10"
        >
          <img src="../../assets/image/ball.svg" alt="" v-show="loading" />
        </div> -->
        <img src="../../assets/image/ball.svg" alt="" v-show="loading" />
      </div>
    </div>
  </div>
</template>
<script>
import { PRICE_RANGE } from "@/config/constant";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      down: false,
      toLogin: false,
      checked: ["ALL"],
      PRICE_RANGE,
      loading: false,
      busy: false,
    };
  },
  methods: {
    // 改变价格选项
    onChange() {
      this.checked.shift();
      this.$emit("change", this.PRICE_RANGE[this.checked[0]].value);
      let price = `${this.PRICE_RANGE[this.checked[0]].value}`;
      let paixu;
      if (this.down) {
        paixu = "DESC";
      } else {
        paixu = "ASC";
      }
      this.$store.dispatch("getGoodsList", {
        priceRange: price,
        sortType: paixu,
      });
    },
    handledown() {
      this.down = !this.down;
      let price = `${this.PRICE_RANGE[this.checked[0]].value}`;
      let paixu;
      if (this.down) {
        paixu = "DESC";
      } else {
        paixu = "ASC";
      }
      this.$store.dispatch("getGoodsList", {
        priceRange: price,
        sortType: paixu,
      });
    },
    toDetail() {},
    openToCart() {
      this.toLogin = true;
    },
    // 无限加载
    // loadMore() {
    //   console.log("移下来了");
    //   this.busy = true;
    //   this.loading = true;
    //   let currentPage = 0;
    //   setTimeout(() => {
    //     this.$store.dispatch("getGoodsList", {
    //       priceRange: "ALL",
    //       currentPage: ++currentPage,
    //       sortType: "ASC",
    //     });
    //   }, 5000);
    // },
  },
  mounted() {
    // console.log(Object.prototype.toString.call(price));

    this.$store.dispatch("getGoodsList", {
      priceRange: "ALL",
      currentPage: 0,
      sortType: "ASC",
    });
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.home.goodsList.data,
    }),
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.bread {
  background-color: #f2f2f2;
  width: 100%;
  .bread-container {
    width: 1200px;
    align-items: center;
    display: flex;
    height: 40px;
    justify-content: left !important;
    padding-left: 20px;
    /deep/ .el-breadcrumb {
      font-size: 14px;
      line-height: 1;
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-size: 18px;
        }
        .breadcrumb__separator {
          margin: 0 6px;
        }
      }
      .el-breadcrumb__item:last-child {
        .el-breadcrumb__inner {
          color: #ff7c25 !important;
        }
      }
    }
  }
}
.good-list-container {
  width: 1200px;
  display: flex;
  justify-content: left;

  margin-left: 20px;
  margin-top: 10px;
  .left-price {
    width: 235px;
    height: 312px;
    background: #fff;
    text-align: left;
    .left-price-head {
      width: 215px;
      display: inline-block;
      font-size: 16px;
      color: #666;
      margin-top: 10px;
      margin-left: 10px;
      margin-bottom: 5px;
      padding: 7px 2px;
      border-bottom: 1px solid #ddd;
    }
    .left-price-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;
      /deep/ .el-checkbox {
        color: #ff7c25;
        font-size: 24px;
        .el-checkbox__label {
          color: #ff7c25 !important;
          transition: all 0.5s;
        }
        .el-checkbox__label:hover {
          margin-left: 10px;
        }
        .el-checkbox__inner {
          background-color: #fff !important;
          border-color: #ff7c25 !important;
          width: 18px;
          height: 18px;
          position: relative;
        }
        .el-checkbox__inner::after {
          border: 2px solid #ff7c25;
          width: 5px;
          height: 10px;
          position: absolute;
          left: 5px;
          border-left: 0;
          border-top: 0;
        }
      }
    }
  }

  .right-goods {
    display: flex;
    flex-direction: column;
    .right-goods-top {
      width: 920px;
      height: 53px;
      margin-left: 26px;
      justify-content: flex-end;
      background: #fff;
      display: flex;
      align-items: center;
      .paixu {
        margin-right: 30px;
        font-size: 14px;
        color: #666;
        font-weight: 400;
        display: flex;
        align-items: center;
        .el-icon-top {
          transition: all 0.4s ease;
          font-size: 25px;
          margin-left: 10px;
        }
        .down {
          transform: rotate(180deg);
        }
      }
    }
    .right-goods-middle {
      width: 920px;
      margin-left: 26px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      /deep/ .el-dialog__wrapper {
        .el-dialog {
          border-radius: 5px;
          .el-dialog__body {
            padding: 30px 0 50px 22px;
            text-align: center;
            font-size: 24px;
          }
          .el-dialog__footer {
            padding: 0;
            height: 60px;
            .dialog-footer {
              width: 400px;
              height: 60px;
              display: flex;
              border-bottom-right-radius: 5px;
              border-bottom-left-radius: 5px;
              button {
                width: 50%;
                height: 60px;
                border: 0;
                border-radius: 0;
                outline: none;
                padding: 0;
                margin: 0;
                color: #fff;
                font-size: 22px;
              }
              button:first-child {
                background-color: #ff7c25;
              }
              button:nth-child(2) {
                background-color: #b5becd;
                border-bottom-right-radius: 5px;
              }
            }
          }
        }
      }
      .goods {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 288px;
        height: 505px;
        margin-top: 10px;
        /deep/ .goods-item {
          width: 265px;
          height: 480px;
          background: #fff;
          border-radius: 8px;
          padding: 0 4px;
          transition: all 0.2s ease-out;
          .cat-pic {
            width: 260px;
            height: 258px;
            border-radius: 10px;
            display: block;
            margin: 10px auto;
            overflow: hidden;
            box-sizing: border-box;
            img {
              width: 260px;
              height: 258px;
              transition: transform 1s;
            }
            img:hover {
              transform: scale(1.2);
            }
          }
          .cat-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title-name {
              display: flex;
              align-items: flex-start;
              span:nth-of-type(1) {
                font-size: 24px;
              }
              span:nth-of-type(2) {
                font-size: 12px;
                display: inline-block;
                background: #ff7c25;
                border-radius: 4px;
                padding: 1px 5px;
                color: #fff;
                margin-top: 5px;
                margin-left: 10px;
              }
            }
            .title-like {
              display: flex;
              align-items: center;
              font-size: 16px;
              font-weight: 200;
              color: #888;
              height: 20px;
              img {
                width: 18px;
                height: 18px;
                margin-right: 5px;
              }
            }
          }
          .cat-price {
            margin-top: 10px;
            display: flex;
            align-items: flex-end;
            .money {
              display: flex;
              align-items: center;
              .money-icon {
                margin-right: 5px;
                font-size: 20px;
              }
              .money-text {
                font-size: 30px;
              }
            }
            .money.discount {
              padding-bottom: 3px;
              margin-left: 10px;
              span {
                font-size: 20px;
                margin-right: 0;
                color: #999 !important;
                text-decoration: line-through;
              }
            }
          }
          .cat-vip {
            margin-top: 10px;
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 17px;
            }
            span {
              font-size: 16px;
              margin-left: 16px;
              margin-right: 37px;
              color: #666;
            }
            .money {
              display: flex;
              align-items: center;
              .money-icon {
                margin: 0 5px 0 0;
                font-size: 14px;
              }
              .money-text {
                font-size: 20px;
                margin: 0;
              }
            }
          }
          .cat-addtocart {
            margin-top: 15px;
            border-top: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            button {
              width: 273px;
              height: 43px;
              margin-top: 15px;
              background: #ff6b67;
              border-radius: 10px;
              border: none;
              outline: none;
              color: #fffefe;
              font-size: 20px;
            }
          }
        }
        .goods-item:hover {
          border: 2px solid #ff7c25;
          box-shadow: 0 0 5px #ff5400;
        }
      }
    }
    .load-infinite {
      margin-top: 50px;
      overflow-y: auto;
      text-align: center;
      height: 100px;

      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>