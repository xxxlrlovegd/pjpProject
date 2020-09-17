import Http from '../lib/http';

let LoginService = {
  getList() {

  },
  //获取登录信息
  async login(params) {
    let res = await Http.post('/api/login', params)
    return res;
  },
  async updatePassword() {
    let res = await Http.get('/api/updatepassword')
    return res;
  },
}

export default LoginService