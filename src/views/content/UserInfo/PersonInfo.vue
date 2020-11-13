<style  lang="less" scoped>
.personinfo {
  background: #fff;
  position: relative;
  overflow: hidden;

  .ivu-layout-header {
    background: #fff;
    padding: 0 10px;
    height: 64px;
    line-height: 64px;
  }
  .ivu-card-head p,
  .ivu-card-head-inner {
    height: 32px;
    line-height: 32px;
  }

  .ivu-layout-content {
    flex: auto;
  }
  .layout-footer-center {
    background: #f1f6fc;
    text-align: center;
  }
  .ivu-layout-footer {
    background: #f5f7f9;
    padding: 18px 50px;
  }
  /deep/.ivu-card-head {
    border-bottom: 1px solid #e8eaec;
    padding: 0px 16px;
    line-height: 1;
    margin: 0px 110px;
  }
  .ivu-card-body {
    padding: 0px 16px;
  }
  .formStyle {
    margin: 0px 100px;
  }
  .formShStyle {
    margin: 0px 100px;
    // /deep/.
  }
}
</style>
  <template>
  <div class="personinfo">
    <Layout :style="{background:'#F1F6FC',minHeight:'100vh'}">
      <Header>
        <authHeader />
      </Header>
      <Content :style="{padding: '0 50px',flex:1}">
        <div style="min-height: 568px;margin:20px 0px;">
          <Card style="width:700px;position: relative;top: 70px;left: 25%;">
            <div v-show="isLoginType==1">
              <Form
                ref="formInline"
                :model="formInline"
                :rules="ruleInline"
                class="formStyle"
                :label-width="90"
                :hide-required-mark="false"
                :label-colon="true"
                style="margin-top:6%"
              >
                <FormItem
                  label="姓名"
                  prop="userName"
                >
                  <i-Input
                    v-model="formInline.userName"
                    placeholder="请输入"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="联系电话"
                  prop="userPhone"
                >
                  <i-Input
                    v-model="formInline.userPhone"
                    placeholder="请输入"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="证件类型"
                  prop="userIdType"
                >
                  <Select
                    v-model="formInline.userIdType"
                    placeholder=" 请选择"
                  >
                    <Option value="1">居民身份证</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="证件号码"
                  prop="userIdNo"
                >
                  <i-Input
                    v-model="formInline.userIdNo"
                    placeholder="请输入"
                  ></i-Input>
                </FormItem>
                <!-- <FormItem label="证件图片">
                  <Upload
                    :before-upload="fjUpload"
                    action="http"
                    accept=".png, .jpg, .jpeg"
                    :show-upload-list="true"
                  >
                    <Button type="primary">点击上传图片</Button>
                  </Upload>
                </FormItem> -->
                <FormItem>
                  <Button
                    type="primary"
                    size="large"
                    long
                    @click="handleSubmit('formInline')"
                  >提交</Button>
                </FormItem>
              </Form>
            </div>
            <div v-show="isLoginType!=1">
              <Form
                ref="formShInline"
                :model="formShInline"
                :rules="ruleShInline"
                class="formShStyle"
                :label-width="90"
                :hide-required-mark="false"
                :label-colon="true"
                style="margin-top:6%"
              >
                <FormItem
                  label="商家名称"
                  prop="companyName"
                >
                  <i-Input
                    v-model="formShInline.companyName"
                    placeholder="请输入商家名称"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="联系人"
                  prop="userName"
                >
                  <i-Input
                    v-model="formShInline.userName"
                    placeholder="请输入联系人"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="联系电话"
                  prop="userPhone"
                >
                  <i-Input
                    v-model="formShInline.userPhone"
                    placeholder="请输入联系电话"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="企业性质"
                  prop="companyNature"
                >
                  <Select
                    v-model="formShInline.companyNature"
                    placeholder="请选择企业性质"
                  >
                    <Option value=1>国企</Option>
                    <Option value=2>央企</Option>
                    <Option value=3>私企</Option>
                    <Option value=4>外企</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="经营范围"
                  prop="businessScope"
                >
                  <i-Input
                    v-model="formShInline.businessScope"
                    placeholder="请输入经营范围"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="企业规模"
                  prop="enterpriseSize"
                >
                  <Select
                    v-model="formShInline.enterpriseSize"
                    placeholder="请选择企业规模"
                  >
                    <Option
                      v-for="item in qygmSelect"
                      :key="item.value"
                      :value="item.value"
                    >{{item.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="企业法人"
                  prop="corporate"
                >
                  <i-Input
                    v-model="formShInline.corporate"
                    placeholder="请输入企业法人"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="注册资金"
                  prop="registeredCapital"
                >
                  <i-Input
                    type='number'
                    v-model="formShInline.registeredCapital"
                    placeholder="请输入注册资金"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="注册时间"
                  prop="registrationDate"
                >
                  <DatePicker
                    type="date"
                    v-model="formShInline.registrationDate"
                    style="width:100%"
                    placeholder="请输入注册时间"
                  ></DatePicker>
                  <!-- <i-Input
                    v-model="formShInline.registrationDate"
                    placeholder="请输入注册时间"
                  ></i-Input> -->
                </FormItem>
                <FormItem
                  label="信用代码"
                  prop="creditCode"
                >
                  <i-Input
                    v-model="formShInline.creditCode"
                    placeholder="请输入信用代码"
                  ></i-Input>
                </FormItem>
                <FormItem
                  label="办公地址"
                  prop="businessAddress"
                >
                  <i-Input
                    v-model="formShInline.businessAddress"
                    placeholder="请输入办公地址"
                  ></i-Input>
                </FormItem>
                <!-- <FormItem label="营业执照">
                  <Upload
                    :before-upload="qyfjUpload"
                    action="http"
                    accept=".png, .jpg, .jpeg"
                    :show-upload-list="true"
                  >
                    <Button type="primary">点击上传图片</Button>
                  </Upload>
                </FormItem> -->
                <FormItem>
                  <Button
                    type="primary"
                    size="large"
                    long
                    @click="handleShSubmit('formShInline')"
                  >提交</Button>
                </FormItem>
              </Form>
            </div>
          </Card>
        </div>
      </Content>
      <Footer class="layout-footer-center">黑龙江邮政易通信息网络有限责任公司所属</Footer>
    </Layout>
  </div>
</template>
<script>
import APIservice from "../../../service/stock.service.js";
import authHeader from "../../../views/authHeader";
Date.prototype.format = function(format) { var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)) } for (var k in o) { if (new RegExp("(" + k + ")").test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)) } } return format };

//身份证验证
const isIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//电话验证
const isPhone = /^(1[3,4,5,6,7,8,9][0-9])\d{8}$/;
export default {
  components: {
    authHeader,
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!isPhone.test(value)) {
        callback(new Error("联系电话格式不正确"));
      }
      callback();
    };
    const validateIdCard = (rule, value, callback) => {
      if (!isIdCard.test(value)) {
        callback(new Error("身份证号格式不正确"));
      }
      callback();
    };
    return {
      isLoginType: 1,
      formInline: {
        userName: "",
        userPhone: "",
        userIdType: "1",
        userIdNo: "",
        userIdPhoto: "",
        userFlag: 1,
      },
      ruleInline: {
        userName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        userPhone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        userIdType: [
          { required: true, message: "证件类型不能为空", trigger: "blur" },
        ],
        userIdNo: [
          {
            required: true,
            message: "证件号码不能为空",
            trigger: "blur",
          },
          { validator: validateIdCard, trigger: "blur" },
        ],
      },
      formShInline: {
        companyName: "",
        userName: "",
        userPhone: "",
        companyNature: "",
        businessScope: "",
        enterpriseSize: "",
        corporate: "",
        registeredCapital: "",
        registrationDate: "",
        creditCode: "",
        businessAddress: "",
        businessLicensePhoto: "",
      },
      ruleShInline: {
        companyName: [
          { required: true, message: "商家名称不能为空", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
        userPhone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        // creditCode: [
        //   { required: true, message: "信用代码不能为空", trigger: "blur" },
        // ],
      },
      qygmSelect: [
        {
          name: "微型企业(人数<50)",
          value: 1,
        },
        {
          name: "小型企业 (50<人数<500)",
          value: 2,
        },
        {
          name: "中型企业(500<人数<20000)",
          value: 3,
        },
        {
          name: "大型企业(人数>20000)",
          value: 4,
        },
      ],
      file: null,
    };
  },
  mounted() {
    this.isLoginType = this.$route.params.type;
    this.formInline = {
      userName: "",
      userPhone: "",
      userIdType: "1",
      userIdNo: "",
      userIdPhoto: "",
      userFlag: 1,
    };
    this.formShInline = {
      companyName: "",
      userName: "",
      userPhone: "",
      companyNature: "",
      businessScope: "",
      enterpriseSize: "",
      corporate: "",
      registeredCapital: "",
      registrationDate: "",
      creditCode: "",
      businessAddress: "",
      businessLicensePhoto: "",
    };
    this.$nextTick(() => {
      this.handleReset("formInline");
      this.handleReset("formShInline");
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.userAuthentication(this.formInline);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleShSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
           this.formShInline.registrationDate = this.timeStampChange(this.formShInline.registrationDate, 'date')
          this.formShInline.companyNature = parseInt(
            this.formShInline.companyNature
          );
          this.companyAuthentication(this.formShInline);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    fjUpload(file) {
      this.formInline.userIdPhoto = file;
      console.log(this.formInline.userIdPhoto);
      return false;
    },
    qyfjUpload(file) {
      this.formInline.businessLicensePhoto = file;
      console.log(this.formInline.businessLicensePhoto);
      return false;
    },
    //用户认证信息上传接口
    async userAuthentication(param) {
      const res = await APIservice.userAuthentication(param);
      if (res.code === 0) {
        this.$Modal.info({
          title: "温馨提示",
          content: "提交成功，请耐心等待审核",
          onOk: () => {
            this.$router.push("/Login");
          },
        });
      } else {
        this.$Message.error(res.msg);
      }
    },
    //企业认证信息上传接口
    async companyAuthentication(param) {
      const res = await APIservice.companyAuthentication(param);
      let _this = this;
      if (res.code === 0) {
        _this.$Modal.info({
          title: "温馨提示",
          content: "提交成功，请耐心等待审核",
          onOk: () => {
            _this.$router.push("/Login");
          },
        });
      } else {
        _this.$Message.error(res.msg);
      }
    },
    // 时间转换
    timeStampChange(param, type) {
      if (typeof param == "object") {
        if (type == "date") {
          return param.format("yyyy-MM-dd");
        } else if (type == "datetime") {
          return param.format("yyyy-MM-dd hh:mm");
        } else if (type == "datetimes") {
          return param.format("yyyy-MM-dd hh:mm:ss");
        }
      } else {
        return param;
      }
    },
  },
};
</script>