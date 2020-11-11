import Http from '../lib/http'

const APIService = {
  //查询区块链信息-自定义
  async getBlockQuery() {
    const res = await Http.post('/tracebaas_system/tracebaas/blockquery')
    return res
  },
  //查询区块交易统计表-折线数据
  async getBusinessVolume() {
    const res = await Http.post('/tracebaas_system/tracebaas/businessVolume')
    return res
  },
  //查询交易列表-表格数据
  async getOrderData() {
    const res = await Http.post('/tracebaas_system/tracebaas/listHash')
    console.log("表格数据：",res)
    return res
  },
  //根据区块值搜索信息
  async getBlockByNumber(params) {
    const res = await Http.post('/tracebaas_system/tracebaas/tracebaas/searchByHash?hash' + params)
    return res
  },
  //用户信息查询接口
  async selectAuthInfo(){
    const res = await Http.post('/tracebaas_system/selectAuthInfo')
    return res
  },
  //令牌申请接口
  async getSecretKey(params) {
    const res = await Http.post('/tracebaas_system/getSecretKey', params)
    return res
  },
  //个人认证信息上传
  async userAuthentication(params) {
    const res = await Http.post('/tracebaas_system/userAuthentication', params)
    return res
  },
  //企业认证信息上传
  async companyAuthentication(params) {
    const res = await Http.post('/tracebaas_system/companyAuthentication', params)
    return res
  },
}
export default APIService