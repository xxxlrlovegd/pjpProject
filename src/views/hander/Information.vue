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
      username: JSON.parse(sessionStorage.getItem('UserInfo')).userName,
    }
  },
  methods: {
    downMenuEvent(name) {
      console.log(name)
      if (name == 'grxx') {
        this.$router.push('/information')
      }else{
        sessionStorage.clear();
        window.location.href='/'
      }
    },
  },
}
</script>