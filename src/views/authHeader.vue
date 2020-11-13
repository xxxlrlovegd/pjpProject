<style  lang="less" scoped>
.ivu-menu-light {
  &:after {
    height: 0px !important;
  }
}
.header-text{
  vertical-align:middle;
}
.span-cell{
  display: block;
  margin-top: -9px;
  font-weight: bold;
  white-space: nowrap;
}
.imgStyle {
  width:9%;
  position: relative;
  top: 4px;
}
</style>
  <template>
  <div>
    <Row>
      <i-Col span="8">
        <Row>
          <i-Col span="12" style="text-align:right;">
              <img src="../assets/img/login/logo.png" alt style="margin-top:11px;width:60%;height:80%;" />
          </i-Col>
          <i-Col span="1" style="text-align:center;">
            <Divider type="vertical" style="color:#dcdee2;height:35px;width:3px"/>
          </i-Col>
          <i-Col span="11">
            <div class="header-text">
                <span
                      style="font-size: 21px;height:28px" class="span-cell"
                    >公&nbsp;共&nbsp;溯&nbsp;源&nbsp;平&nbsp;台</span>

                    <span
                      style="font-size: 12px;height:30px;" class="span-cell"
                    >Blockchain&nbsp;Platform&nbsp;of&nbsp;China&nbsp;Post</span>
            </div>
          </i-Col>
        </Row>
      </i-Col>
      <i-Col span="10">
        <Menu mode="horizontal" theme="light" :active-name="activeName"  @on-select="selectMenu">
          <MenuItem
            v-for="(item,index) in menuItem"
            :key="index"
            :name="item.id"
            :to="item.path"
          >{{item.name}}</MenuItem>
        </Menu>
      </i-Col>
      <i-Col span="5">
        <img src="../assets/img/icon/dhIcon.png" class="imgStyle" />
        <span style="margin-left:8px;font-style: italic;color:#32C098;font-size:20px;">0451-86292460</span>
      </i-Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 0,
      menuItem: [
        { id: 1, name: '首页', path: '/index' },
        { id: 3, name: '在线帮助', path: '/developer' },
        { id: 4, name: '农产品系统'},
      ],
    }
  },
  mounted() {},
  methods: {
    selectMenu(name) {
      this.activeName = name
      console.log("name",name)
      if(name==4){
        var tempwindow=window.open('_blank')
        tempwindow.location= 'https://ggsypt.56saas.com.cn/apts_web/login'; 
      }
    },
  },
}
</script>