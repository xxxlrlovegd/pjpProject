<style lang="less" scoped>
</style>
<template>
  <div class="resetPossword">
    <Card style="width:40%;margin:10% 30%">
      <Form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        :label-width="80"
        :hide-required-mark="true"
        :label-colon="true"
        style="margin-top: 6%;"
      >
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
        <FormItem style="text-align: right">
          <Button
            type="primary"
            @click="handleSubmit('formInline')"
          >完成</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import LoginService from "../../../service/login.service.js";
import * as CryptoJS from "crypto-js";
const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#%^&`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#%^&`~()-+=]+$)(?![0-9\W_!@#%^&`~()-+=]+$)[a-zA-Z0-9\W_!@#%^&`~()-+=]{8,16}$/;
export default {
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
        password: "",
        repassword: "",
      },
      ruleInline: {
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validateRePass, trigger: "blur" }],
      },
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
          this.updatePassword(this.formInline.password);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //重新修改密码
    async updatePassword(param) {
      const res = await LoginService.updatePassword(param);
      if (res.code === 0) {
         this.$Modal.info({
            title: '温馨提示',
            content: '密码修改成功！',
            onOk: () => {
               this.$router.push("/Login");
            },
          })
      } else {
        this.$Message.error(res.msg);
      }
    },
  },
};
</script>