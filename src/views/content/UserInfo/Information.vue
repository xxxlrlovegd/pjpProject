<style lang="less" scoped>
.cardTitle {
  color: #47b393;
  text-align: center;
  margin: 10px 0px;
}
.fontSizeBig {
  font-size: 26px;
  font-weight: bold;
  height: 32px;
  line-height: 32px;
}
.fontSizeSamll {
  font-size: 18px;
}
.dlmmStyle {
  text-align: right;
  margin-top: 2%;
  * {
    color: #29a986;
  }
}
/deep/.ivu-form-item {
  margin-bottom: 8px;
}
/deep/.ivu-form .ivu-form-item-label {
  font-size: 16px;
  font-weight: bold;
}
/deep/.ivu-form-item-content {
  font-size: 16px;
  line-height: 36px;
}
</style>
<template>
  <div class="information">
    <Card style="width:50%;margin:2% 26%">
      <p
        slot="title"
        class="cardTitle fontSizeBig"
      >个人信息详情</p>
      <Form
        :model="formItem"
        :label-width="250"
        style="margin:0 8%;"
        :label-colon="true"
      >
        <FormItem label="姓名">
          <span>{{formItem.userName||'暂无'}}</span>
        </FormItem>
        <!-- <FormItem label="年龄">
          <span>{{formItem.age}}</span>
        </FormItem> -->
        <FormItem label="身份证号">
          <span>{{formItem.userIdNo||'暂无'}}</span>
        </FormItem>
        <FormItem label="联系电话">
          <span>{{formItem.userPhone||'暂无'}}</span>
        </FormItem>
        <FormItem label="注册时间">
          <span>{{formItem.createdTime||'暂无'}}</span>
        </FormItem>
        <FormItem label="现住址">
          <span>{{formItem.addres||'暂无'}}</span>
        </FormItem>
        <FormItem label="籍贯">
          <span>{{formItem.jg||'暂无'}}</span>
        </FormItem>
        <FormItem label="区块链BaaS平台API接口申请">
          <Button
            type="primary"
            @click="instance('info')"
            :disabled="lpFlag"
          >令牌申请</Button>
        </FormItem>
        <FormItem label="令牌">
          <span>{{formItem.credential}}</span>
        </FormItem>
        <FormItem label="key">
          <span>{{formItem.secretkey}}</span>
        </FormItem>
      </Form>
      <div class="dlmmStyle">
        <a @click="toRestPassword" >重置登录密码</a>
      </div>
    </Card>
  </div>
</template>
<script>
import APIservice from "../../../service/stock.service.js";
export default {
  data() {
    return {
      formItem: {
        userName: "",
        age: "",
        userIdNo: "",
        userPhone: "",
        createdTime: "",
        addres: "",
        jg: "",
        credential: "",
        secretkey: "",
      },
      lpFlag: false,
    };
  },
  mounted() {
    //此处逻辑有点问题，我只要点击了后台返回值之后就不应该在进行点击！
    // this.lpFlag = this.formItem.credential  ? true : false
    this.selectAuthInfo();
  },
  methods: {
    //个人信息查询
    async selectAuthInfo() {
      const res = await APIservice.selectAuthInfo();
      if (res.code === 0) {
        console.log("自定义数据", res.data);
        this.formItem = res.data;
        if (this.formItem.credential && this.formItem.secretkey) {
          this.lpFlag = true;
        } else {
          this.lpFlag = false;
        }
      } else {
        this.$Message.error(res.msg);
      }
    },
    //令牌申请接口
    async getSecretKey() {
      const res = await APIservice.getSecretKey();
      if (res.code === 0) {
        var arr = res.msg.split(",");
        this.formItem.credential = arr[1];
        this.formItem.secretkey = arr[0];
        this.$forceUpdate();
      } else {
        this.$Message.error(res.msg);
      }
    },
    instance(type) {
      if (type == "info") {
        this.$Modal.info({
          title: "令牌申请",
          content: "是否进行令牌申请",
          onOk: () => {
            //令牌请求
            this.getSecretKey();
            this.lpFlag = true;
          },
        });
      } else {
        return;
      }
    },
    //跳转到重置密码页面
    toRestPassword(){
  this.$router.push("/resetPassword");
    }
  },
};
</script>