<template>
  <div class="banner">
    <div class="title">
      <!-- 头部的左侧 -->
      <div class="banner_left">
        <img src="./images/github.a5ee684f.png" alt="" />
        <p><span>丑小喵</span></p>
      </div>
      <!-- 头部的右侧 -->
      <div class="banner_right" v-if="userInfo">
        <!-- 个人信息 -->
        <el-dropdown v-if="userInfo.userInfo.data" style="margin-right: 30px">
          <img src="./images/hou1.webp" alt="" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              >邮箱:
              {{ userInfo.userInfo.data.userInfo.email }}</el-dropdown-item
            >
            <el-dropdown-item
              >昵称:
              {{ userInfo.userInfo.data.userInfo.nickName }}</el-dropdown-item
            >
            <el-dropdown-item>我的余额</el-dropdown-item>
            <el-dropdown-item>我的主页</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="loginorregister" v-else>
          <el-button type="warning" plain @click="toLoginDialog()"
            >登录</el-button
          >
          <el-button type="warning" plain @click="toRegisterDialog()"
            >注册</el-button
          >
        </div>

        <!-- 登录对话框 -->
        <el-dialog
          :title="isLogin ? '登录' : '注册'"
          :visible.sync="centerDialogVisible"
          width="300px"
          center
        >
          <el-input placeholder="请输入邮箱" v-model="email">
            <img slot="prefix" src="../../assets/image/email.png" />
          </el-input>
          <el-input placeholder="请输入密码" v-model="password" type="password">
            <img slot="prefix" src="../../assets/image/pwd.png" />
            <img
              slot="suffix"
              src="../../assets/image/showfalse.png"
              class="eyes"
            />
          </el-input>
          <!-- 注册页面才有的 -->
          <el-input v-if="!isLogin" v-model="password" type="password">
            <img slot="prefix" src="../../assets/image/pwd.png" />
            <img
              slot="suffix"
              src="../../assets/image/showfalse.png"
              class="eyes"
            />
          </el-input>
          <el-input
            v-if="!isLogin"
            placeholder="邮箱验证码"
            v-model="verifyCode"
          >
            <img slot="prefix" src="../../assets/image/email.png" />
            <el-button
              v-if="time === 60"
              class="get-verify-code"
              slot="suffix"
              @click="getVerifyCode"
              >获取验证码
            </el-button>
            <span v-else class="get-verify-code-span" slot="suffix"
              >{{ time }}秒再次获取</span
            >
          </el-input>
          <div class="button-group">
            <el-button round @click="login" v-if="isLogin">登录</el-button>
            <el-button round @click="register" v-else>注册</el-button>
            <div class="footer-btn">
              <el-button @click="isLogin = !isLogin">{{
                isLogin ? "立即注册" : "立即登录"
              }}</el-button>
              <el-button> 忘记密码?</el-button>
            </div>
          </div>
        </el-dialog>

        <img src="./images/cart.png" alt="" />
      </div>
    </div>
    <!-- 轮播图 -->

    <el-carousel :interval="5000" arrow="always">
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
import { mapState } from "vuex";
export default {
  name: "NavBanner",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      centerDialogVisible: false,
      isLogin: true,
      email: "",
      password: "",
      verifyCode: "", // 邮箱验证码
      time: 60,
      getCode: "", //存储邮箱验证码
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.home,
    }),
  },
  methods: {
    handleClick() {
      alert("button click");
    },
    // 登录弹窗
    toLoginDialog() {
      this.isLogin = true;
      this.centerDialogVisible = true;
    },
    // 注册弹窗
    toRegisterDialog() {
      this.isLogin = false;
      this.centerDialogVisible = true;
    },
    // 登录
    async login() {
      const { email, password } = this;
      try {
        // 分发action
        await this.$store.dispatch("login", { email, password });
        // console.log("登录成功");
        this.$message.success("登录成功");
        this.centerDialogVisible = false;
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    //发送邮箱验证码
    async getVerifyCode() {
      try {
        const result = await this.$API.reqVerify(this.email);
        // console.log(this.email);
        this.getCode = result.data;
        this.$message.success("验证码发送成功");
        this.timeId = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(this.timeId);
          } else {
            this.time--;
          }
        }, 1000);
      } catch (error) {
        this.$message.error(error.message || "验证码发送失败");
        clearInterval(this.timeId);
        this.time = 0;
      }
    },
    // 注册
    async register() {
      clearInterval(this.timeId);
      this.time = 0;
      try {
        const { email, verifyCode, password } = this;
        await this.$store.dispatch("register", { email, password, verifyCode });
        this.$message.success("注册成功了");
        this.centerDialogVisible = false;
      } catch (error) {
        this.$message.error(error.message);
        this.centerDialogVisible = false;
      }
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
  height: 100px;
  display: flex;
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

.banner_right >>> .el-dialog__wrapper .el-dialog__body {
  padding: 30px 20px;
  font-size: 14px;
  word-break: break-all;
  color: #606266;
}
.banner_right
  >>> .el-dialog__wrapper
  .el-dialog__body
  .el-input
  .el-input__inner {
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  font-size: 16px;
  border-radius: 0;
}
.banner_right
  >>> .el-dialog__wrapper
  .el-dialog__body
  .el-input
  .el-input__prefix
  img {
  width: 22px;
  height: 22px;
  padding-top: 7px;
}
.banner_right
  >>> .el-dialog__wrapper
  .el-dialog__body
  .el-input
  .el-input__suffix
  img {
  width: 22px;
  height: 22px;
  padding-top: 7px;
}
.button-group {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.button-group >>> .el-button {
  margin-top: 15px;
  font-size: 18px;
  outline: none;
  background-color: #ff6900;
  width: 85%;
  color: #fff;
}
.footer-btn {
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 10px auto -20px;
}
.footer-btn >>> .el-button {
  color: #f40;
  background: 0;
  padding-left: 0;
  padding-right: 0;
  border: 0;
  font-size: 14px;
}
</style>