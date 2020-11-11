import Http from '../lib/http';

let LoginService = {
  getList() {

  },
  //获取登录信息
  async login(params) {
    let res = await Http.post('/tracebaas_system/login?loginName='+params.loginName+"&password="+params.password)
    return res;
  },
  //个人注册
  async userRegister(params) {
    let res = await Http.post('/tracebaas_system/userRegister?userName='+params.userName+"&password="+params.password+"&email="+params.email)
    return res;
  },
  //企业注册
  async companyRegister(params) {
    let res = await Http.post('/tracebaas_system/companyRegister?userName='+params.userName+"&password="+params.password+"&email="+params.email)
    return res;
  },
  //修改密码
  async updatePassword(params) {
    let res = await Http.post('/tracebaas_system/changePassword?newPassWord='+params)
    return res;
  },
}

export default LoginService