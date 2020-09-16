<template>
  <div class="homePage">
    <div class="title">区块链信息</div>
    <div style="min-height: 200px;">
      <div v-for="rowIdx in blockRow" :key="rowIdx">
        <Row type="flex" justify="end">
          <i-Col
            :span="((idx + 1)%5 != 0 && item.id != blockList[blockList.length -1].id) ? 5: 4"
            v-for="(item, idx) in (blockList.slice((rowIdx - 1) * 5, rowIdx * 5))"
            :key="idx"
          >
            <Row>
              <i-Col
                :span="((idx + 1)%5 != 0 && item.id != blockList[blockList.length -1].id)? 20: 24"
              >
                <div class="block">
                  <Row>
                    <i-Col :span="4" style="text-align: center;">
                      <img
                        src="../assets/img/icon/icon6.png"
                        style="margin-top: 18px;margin-left: 12px;"
                      />
                    </i-Col>
                    <i-Col :span="20">
                      <div style="margin:18px 0px 10px 15px;">
                        <span>{{item.date}}:{{item.id}}</span>
                        <p class="block-title">区块：{{item.title}}</p>
                      </div>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col
                :span="4"
                v-if="((idx + 1)%5 != 0 && item.id != blockList[blockList.length -1].id)"
              >
                <img
                  src="../assets/img/icon/icon10.png"
                  style="margin-top: 35px;width:100%;"
                  v-if="item.id != blockList[blockList.length -1].id"
                />
              </i-Col>
            </Row>
          </i-Col>
        </Row>
        <Row v-if="rowIdx != blockRow">
          <i-Col :span="1" style="height: 50px;text-align: center;" offset="22">
            <img src="../assets/img/icon/icon11.png" style="height:100%;" />
          </i-Col>
        </Row>
      </div>
    </div>
    <Row type="flex" :gutter="24">
      <i-Col :span="12">
        <div class="title">区块交易统计表</div>
        <Card :bordered="false">
          <div class="echarts-box" id="echartsBox"></div>
        </Card>
      </i-Col>
      <i-Col :span="12">
        <div class="title">区块交易列表</div>
        <Card :bordered="false" :padding="0">
          <Table :columns="columns" :data="data" ref="table" style="height: 320px"></Table>
          <Page :total="100" show-elevator class="pagination" />
        </Card>
      </i-Col>
    </Row>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      blockRow: 2,
      blockList: [
        {
          id: '1',
          date: '2020-09-15',
          title: 'asfasd123123',
        },
        {
          id: '2',
          date: '2020-09-15',
          title: 'asfasd123123',
        },
        {
          id: '3',
          date: '2020-09-15',
          title: 'asfasd123123',
        },
        {
          id: '4',
          date: '2020-09-15',
          title: 'asfasd123123',
        },
        {
          id: '5',
          date: '2020-09-15',
          title: 'asfasd123123',
        },

        {
          id: '8',
          date: '2020-09-15',
          title: 'asfasd123123',
        },
        {
          id: '7',
          date: '2020-09-15',
          title: 'asfasd123123',
        },
        {
          id: '6',
          date: '2020-09-15',
          title: 'asfasd123123',
        },
      ],
      tableHeight: 250,
      columns: [
        {
          title: '上传时间',
          key: 'uploadTime',
        },
        {
          title: '唯一标识符',
          key: 'uniqueId',
        },
        {
          title: '认证Hash',
          key: 'hash',
        },
        {
          title: '区块高度',
          key: 'height',
        },
      ],
      data: [],
    }
  },
  created() {
    let dataList = []
    for (let index = 0; index < 100; index++) {
      dataList.push({
        uploadTime: '2020-06-11',
        uniqueId: 'afdasdfasdfasfdas123123',
        hash: '#1231232321343222',
        height: '1241',
      })
    }
    this.data = dataList
  },
  mounted() {
    // this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 300;
    this.myEcharts()
  },
  methods: {
    myEcharts() {
      let myChart = echarts.init(document.getElementById('echartsBox'))
      // 指定图表的配置项和数据
      let option = {
        legend: {
          show: true,
        },
        xAxis: {
          type: 'category',
          name: '时间/天',
          boundaryGap: true,
          data: [
            '2020-06-11',
            '2020-06-12',
            '2020-06-13',
            '2020-06-14',
            '2020-06-15',
            '2020-06-16',
          ],
        },
        yAxis: {
          type: 'value',
          name: '上传数据量/条',
          axisPointer: {
            snap: true,
          },
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 2,
              color: 'green',
            },
            {
              gt: 2,
              lte: 3,
              color: 'red',
            },
            {
              gt: 3,
              lte: 4,
              color: 'green',
            },
            {
              gt: 4,
              lte: 6,
              color: 'red',
            },
          ],
        },
        series: [
          {
            name: '交易统计表',
            type: 'line',
            data: [180, 110, 140, 130, 20, 50],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
  },
}
</script>

<style scoped>
.block {
  height: 80px;
  background-image: url(../assets/img/icon/icon7.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.block:hover {
  background-image: url(../assets/img/icon/icon8.png);
}
.block-title {
  font-size: 16px;
  font-weight: bold;
  color: #63bda6;
}
.title {
  font-size: 16px;
  border-left: 3px solid #27a1b8;
  padding-left: 10px;
  font-weight: bold;
  margin: 20px 0;
}
.echarts-box {
  height: 350px;
  widows: 200px;
}
.table {
  height: calc(100vh – 220px);
}
.pagination {
  text-align: center;
  padding: 15px 0;
}
</style>