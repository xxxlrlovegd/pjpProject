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
        <Icon type="md-person" />11111
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="grxx">个人信息</DropdownItem>
        <DropdownItem name="tc">退出</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: sessionStorage.setItem('UserInfo'),
    }
  },
  methods: {
    downMenuEvent(name) {
      console.log(name)
      if (name == 'grxx') {
        this.$router.push('/information')
      }
    },
  },
}
</script>