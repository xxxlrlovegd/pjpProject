<style lang="less" scoped>
.information {
  * {
    text-align: left;
    font-size: 18px;
    color: #4d4d4d;
  }
}
</style>
<template>
  <div class="information">
    <Dropdown @on-click="downMenuEvent">
      <a href="javascript:void(0)">
        <Icon type="md-person" />
        {{username}}
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="grxx" v-show="username!='游客'">个人信息</DropdownItem>
        <DropdownItem name="tc">退出</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    console.log(sessionStorage.getItem("userInfo"));
    if (sessionStorage.getItem("userInfo")) {
      this.username = JSON.parse(sessionStorage.getItem("userInfo")).userName;
    } else {
      this.username = "游客";
    }
  },
  methods: {
    downMenuEvent(name) {
      console.log(name);
      if (name == "grxx") {
        this.$router.push("/information");
      } else {
        sessionStorage.removeItem("Authorization");
        sessionStorage.removeItem("UserInfo");
        sessionStorage.clear();
        window.location.href = "/index";
      }
    },
  },
};
</script>