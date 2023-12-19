<template>
  <div>
    <div class="box" style="text-align: center">
      <h3>账号密码登录</h3>
      <input
        type="text"
        placeholder="请输入账号"
        style="
          width: 65%;
          padding-left: 10px;
          border: 1px solid rgb(168, 168, 165);
          margin-bottom: 25px;
        "
      />
      <input
        type="text"
        id="pwd"
        @input="change"
        style="
          width: 65%;
          padding-left: 10px;
          border: 1px solid rgb(168, 168, 165);
          margin-bottom: 25px;
        "
        placeholder="请输入密码"
      />
      <div>
        <div class="content">
          <span>密码强弱等级：</span>
          <span v-if="grade == 1 || grade == 2 || grade == 3" class="col1 col"
            >弱</span
          >
          <span v-else class="col"> </span>
          <span v-if="grade == 2 || grade == 3" class="col2 col">中</span>
          <span v-else class="col"> </span>
          <span v-if="grade == 3" class="col3 col">强</span>
          <span v-else class="col"> </span>
        </div>
      </div>
      <button style="width: 55%" @click="toLogin">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Password: "",
      grade: "",
    };
  },
  methods: {
    change() {
      var a = document.getElementById("pwd");
      // this.test = functions.checkStrong(this.Password);
      this.check(a.value);
    },
    check(sValue) {
      if (sValue.length >= 6) {
        if (/\d/.test(sValue) && /[a-z]/.test(sValue) && /[A-Z]/.test(sValue)) {
          this.grade = 3;
        } else if (/\d/.test(sValue) && /[a-z]/.test(sValue)) {
          this.grade = 2;
        } else if (
          /\d/.test(sValue) ||
          /[a-z]/.test(sValue) ||
          /[A-Z]/.test(sValue)
        ) {
          this.grade = 1;
        }
        console.log(this.grade);
      } else if (sValue.length == 0) {
        this.grade = 0;
      }
      console.log("长度", sValue.length);
    },
    toLogin(){
      this.$router.push({path:'/bigData'})
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid rgb(150, 146, 146);
  border-radius: 10px;
  padding: 50px 25px;
  width: 550px;
  background-color: #fff;
  margin-left: 35%;
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  h3 {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 50px;
  }
}
.content {
  display: flex;
  // margin-top: 20px;
  margin-left: 20%;
  margin-bottom: 30px;
  .col,
  .col1,
  .col2,
  .col3 {
    width: 50px;
    height: 20px;
    color: #fff;
    margin-right: 10px;
  }
  .col {
    background-color: rgb(206, 206, 204);
  }
  .col1 {
    background-color: rgb(231, 23, 8);
  }
  .col2 {
    background-color: rgb(231, 153, 8);
  }
  .col3 {
    background-color: rgb(97, 231, 8);
  }
}
</style>