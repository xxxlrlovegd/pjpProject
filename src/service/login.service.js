import Http from '../lib/http';

let LoginService = {
  getList() {

  },
  //获取登录信息
  async login(params) {
    let res = await Http.post('/api/login', params)
    return res;
  },
  //个人注册
  async userRegister(params) {
    let res = await Http.post('/api/userRegister', params)
    return res;
  },
  //企业注册
  async login(params) {
    let res = await Http.post('/api/companyRegister', params)
    return res;
  },
  //修改密码
  async updatePassword() {
    let res = await Http.get('/api/changePassword')
    return res;
  },
}

export default LoginService