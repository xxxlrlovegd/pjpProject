<style lang="less" scoped>
::-webkit-scrollbar {
  width: 5px; /*对垂直流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e8e8e8;
}

/*定义两端按钮的样式*/
::-webkit-scrollbar-button {
  display: none;
}
</style>
<template>
  <div class="developerInfo">
    <Layout :style="{padding: '24px 0', margin:'0 10%', background: '#fff'}">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="activeName" theme="light" width="250px" :open-names="['1']"   >
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-list-box-outline" />在线帮助
            </template>
            <MenuItem
              v-for="(item,index) in menuItem"
              :key="index"
              :name="item.id"
              :to="item.toRouter"
              :replace="true"
            >{{item.name}}</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Content
        :style="{margin:'0 0 1% 6% ', height: '420px',overflowY:'auto', background: '#fff',flex:1}"
      >
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 1,
      menuItem: [
        {
          id: 1,
          name: '获取唯一标识码接口',
          toRouter: { path: '/getInterface', query: { type: 'wybsm' } },
        },
        {
          id: 2,
          name: '批量获取唯一标识码接口',
          toRouter: { path: '/getInterface', query: { type: 'plwybsm' } },
        },
        {
          id: 3,
          name: '单条数据上链接口',
          toRouter: { path: '/getInterface', query: { type: 'dtsj' } },
        },
        {
          id: 4,
          name: '批量数据上链接口',
          toRouter: { path: '/getInterface', query: { type: 'plsj' } },
        },
        {
          id: 5,
          name: '哈希值信息单条查询接口',
          toRouter: { path: '/getInterface', query: { type: 'hashsj' } },
        },
        {
          id: 6,
          name: '唯一标识码信息单条查询接口',
          toRouter: { path: '/getInterface', query: { type: 'wybsxxm' } },
        },
        {
          id: 7,
          name: '唯一标识码信息批量查询接口',
          toRouter: { path: '/getInterface', query: { type: 'plwybsxxm' } },
        },
        { id: 8, name: 'SDK下载', toRouter: '/downFile' },
      ],
    }
  },
  mounted() {
    this.$router.push({ path: '/getInterface', query: { type: 'wybsm' } })
  },
  methods: {
    selectMenu(name) {
      this.activeName = name
    },
  },
}
</script>