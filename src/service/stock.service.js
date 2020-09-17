import Http from '../lib/http'

const APIService = {
  //查询区块链信息-自定义
  async getBlockQuery() {
    const res = await Http.post('/api/tracebaas/blockquery')
    return res
  },
  //查询区块交易统计表-折线数据
  async getBusinessVolume() {
    const res = await Http.post('/api//tracebaas/businessVolume')
    return res
  },
  //查询交易列表-表格数据
  async getOrderData() {
    const res = await Http.post('/api/tracebaas/listHash')
    return res
  },
  //根据区块值搜索信息
  async getBlockByNumber(params) {
    const res = await Http.post('/api/tracebaas/tracebaas/queryBlockByNumber?number' + params)
    return res
  },

  // 修改密码
  async resetMerchantsPwd(params) {
    const res = await Http.post('/api/resetmerchantpwd', params)
    return res
  },

}
export default APIService