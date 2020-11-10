<style  lang="less" scoped>
.ivu-menu-light {
  &:after {
    height: 0px !important;
  }
}
.header-text {
  vertical-align: middle;
}
.span-cell {
  display: block;
  margin-top: -9px;
  font-weight: bold;
  white-space: nowrap;
}
.ivu-btn-text:hover {
  color: #fff;
  border-bottom: 2px solid #fff;
  border-radius: 0px;
}
/deep/.ivu-select-input {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0 24px 0 8px;
  font-size: 14px;
  outline: 0;
  border: none;
  box-sizing: border-box;
  color: #515a6e;
  background-color: transparent;
  position: relative;
  cursor: pointer;
}
</style>
  <template>
  <div>
    <Row>
      <i-Col span="8">
        <Row>
          <i-Col
            span="12"
            style="text-align:right;"
          >
            <img
              src="../../assets/img/login/logo.png"
              alt
              style="margin-top:11px;width:60%;height:80%;"
            />
          </i-Col>
          <i-Col
            span="1"
            style="text-align:center;"
          >
            <Divider
              type="vertical"
              style="color:#dcdee2;height:35px;width:3px"
            />
          </i-Col>
          <i-Col span="11">
            <div class="header-text">
              <span
                style="font-size: 21px;height:28px"
                class="span-cell"
              >公&nbsp;共&nbsp;溯&nbsp;源&nbsp;平&nbsp;台</span>

              <span
                style="font-size: 12px;height:30px;"
                class="span-cell"
              >Blockchain&nbsp;Platform&nbsp;of&nbsp;China&nbsp;Post</span>
            </div>
          </i-Col>
        </Row>
      </i-Col>
      <i-Col span="8">
        <div
          v-for="(item,index) in menuItem"
          :key="index"
          :name="item.id"
          style="display: inline-block;position: relative;top: -6px;"
        >
          <Button
            type="text"
            ghost
            size="large"
            style="font-size:16px; margin: 20px;"
            @click="selectMenu(item.path)"
          >{{item.name}}</Button>
        </div>
      </i-Col>
      <i-Col
        span="7"
        style="text-align:right"
      >
        <!-- <Select v-model="model" style="width: 96px;margin-right:2px" @on-change="qkSelectEvent">
          <Option v-for="item in selectList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Input
          icon="ios-search"
          placeholder="请输入"
          style="width: auto"
          class="inputStyle"
          v-model="qkData"
          @on-enter="seachEvent"
          @on-click="seachEvent"
        /> -->
      </i-Col>
    </Row>
  </div>
</template>
<script>
import APIservice from "../../service/stock.service.js";
export default {
  data() {
    return {
      model: "交易hash",
      menuItem: [
        { id: 1, name: "首页", path: "/homePage" },
        { id: 3, name: "接口文档", path: "/getInterface?type=wybsm" },
        { id: 4, name: "农产品系统", path: "" },
      ],
      selectList: [
        { id: 1, name: "交易hash" },
        { id: 2, name: "区块高度" },
        // { id: 3, name: '区块hash' },
      ],
      qkData: "",
    };
  },
  mounted() {},
  methods: {
    selectMenu(path) {
      if (path) {
        this.$router.push(path);
      }else{
        var tempwindow=window.open('_blank')
        tempwindow.location= 'https://ggsypt.56saas.com.cn/apts_web/login'; 
      }
    },
    qkSelectEvent(value) {
      console.log(value);
      this.model = value;
    },
    async seachEvent() {
      if (!this.qkData) return;
      console.log(this.qkData, "-----------", this.model);
      this.$router.push({
        path: "/saveDataDetail",
        query: {
          number: this.qkData,
          model: this.model,
        },
      });
    },
  },
};
</script>