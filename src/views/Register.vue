<style  lang="less" scoped>
.register {
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
  .menuItem {
    margin: 0 50px 0 50px;
    font-size: 20px;
  }
}
</style>
  <template>
  <div class="register">
    <Layout :style="{background:'#F1F6FC',minHeight:'100vh'}">
      <Header>
        <authHeader />
      </Header>
      <Content :style="{padding: '0 50px',flex:1}">
        <div style="min-height: 568px;margin:20px 0px;">
          <Card style="width:700px;position: relative;top: 70px;left: 25%;">
            <Menu
              slot="title"
              mode="horizontal"
              theme="light"
              active-name="1"
              @on-select="selectMenu"
            >
              <MenuItem
                name="1"
                class="menuItem"
              >企业注册</MenuItem>
              <MenuItem
                name="2"
                class="menuItem"
              >用户注册</MenuItem>
            </Menu>
            <Form
              ref="formInline"
              :model="formInline"
              :rules="ruleInline"
              class="formStyle"
              :label-width="80"
              :hide-required-mark="true"
              :label-colon="true"
            >
              <FormItem
                label="用户名"
                prop="user"
              >
                <i-Input
                  v-model="formInline.user"
                  placeholder="请输入用户名"
                ></i-Input>
              </FormItem>
              <FormItem
                label="用户密码"
                prop="password"
              >
                <i-Input
                  type="password"
                  v-model="formInline.password"
                  placeholder="请输入用户密码"
                ></i-Input>
              </FormItem>
              <FormItem
                label="确认密码"
                prop="repassword"
              >
                <i-Input
                  type="password"
                  v-model="formInline.repassword"
                  placeholder="请输入用户密码"
                ></i-Input>
              </FormItem>
              <FormItem
                label="邮箱"
                prop="email"
              >
                <i-Input
                  v-model="formInline.email"
                  placeholder="请输入邮箱"
                ></i-Input>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  size="large"
                  long
                  @click="handleSubmit('formInline')"
                >提交</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </Content>
      <Footer class="layout-footer-center">黑龙江邮政易通信息网络有限责任公司所属</Footer>
    </Layout>
  </div>
</template>
<script>
import LoginService from "../service/login.service.js";
import * as CryptoJS from "crypto-js";
import authHeader from "../views/authHeader";
const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#%^&`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#%^&`~()-+=]+$)(?![0-9\W_!@#%^&`~()-+=]+$)[a-zA-Z0-9\W_!@#%^&`~()-+=]{8,16}$/;
export default {
  components: {
    authHeader,
  },

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (!reg.test(value)) {
          callback(
            new Error("长度至少8位且由大小写字母、数字、特殊字符任意三种构成")
          );
        }
        if (this.formInline.passwdCheck !== "") {
          this.$refs.formInline.validateField("repassword");
        }
        callback();
      }
    };
    const validateRePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.formInline.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "",
        password: "",
        repassword: "",
        email: "",
        userFlag: 1,
      },
      ruleInline: {
        user: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validateRePass, trigger: "blur" }],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
          { type: "email", message: "邮箱地址不正确", trigger: "blur" },
        ],
      },
      registerModal: false,
    };
  },
  mounted() {
    this.formInline = {
      user: "",
      password: "",
      repassword: "",
      email: "",
      userFlag: 1,
    };
  },
  methods: {
    // 加密方法
    encrypt(password) {
      const key = CryptoJS.enc.Utf8.parse("10ynnr3j4wzvzsht");
      const iv = CryptoJS.enc.Utf8.parse("vbujk8lhfmr19jb2");
      const encrypted = CryptoJS.AES.encrypt(password, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      });
      return encrypted.toString();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            userName: this.formInline.user,
            password: this.formInline.password,
            email: this.formInline.email,
          };
          this.Register(data);
        } else {
          this.$Message.error("验证未通过!");
        }
      });
    },
    async Register(param) {
      let res
      if (this.formInline.userFlag == 1) {
         res = await LoginService.companyRegister(param);
      } else {
         res = await LoginService.userRegister(param);
      }
      if (res.code === 0) {
        this.$Message.info("注册成功！");
        this.$router.push("/Login");
        this.formInline = {
          user: "",
          password: "",
          repassword: "",
          email: "",
          userFlag: 1,
        };
      } else {
        this.$Message.error({
          content:res.msg,
          duration: 10,
          closable: true
        })
      }
    },
    selectMenu(name) {
      this.formInline.userFlag = name;
    },
  },
};
</script>