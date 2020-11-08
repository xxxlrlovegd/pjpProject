<template>
  <div class="homePage">
    <div class="title">区块链信息</div>
    <div style="min-height: 200px;">
      <div
        v-for="rowIdx in blockRow"
        :key="rowIdx"
      >
        <Row
          type="flex"
          justify="end"
        >
          <i-Col
            :span="((idx + 1)%5 != 0 && item.id != blockList[blockList.length -1].id) ? 5: 4"
            v-for="(item, idx) in (blockList.slice((rowIdx - 1) * 5, rowIdx * 5))"
            :key="idx"
          >
            <Row>
              <i-Col :span="((idx + 1)%5 != 0 && item.id != blockList[blockList.length -1].id)? 20: 24">
                <div class="block">
                  <Row>
                    <i-Col
                      :span="4"
                      style="text-align: center;"
                    >
                      <img
                        src="../assets/img/icon/icon6.png"
                        style="margin-top: 18px;margin-left: 12px;"
                      />
                    </i-Col>
                    <i-Col :span="20">
                      <div style="margin:18px 0px 10px 15px;">
                        <span>{{item.date}}</span>
                        <p class="block-title">区块：{{item.number}}</p>
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
          <i-Col
            :span="1"
            style="height: 50px;text-align: center;"
            offset="22"
          >
            <img
              src="../assets/img/icon/icon11.png"
              style="height:100%;"
            />
          </i-Col>
        </Row>
      </div>
    </div>
    <Row
      type="flex"
      :gutter="24"
    >
      <i-Col :span="12">
        <div class="title">区块交易统计表</div>
        <Card :bordered="false">
          <div
            class="echarts-box"
            id="echartsBox"
          ></div>
        </Card>
      </i-Col>
      <i-Col :span="12">
        <div class="title">区块交易列表</div>
        <Card
          :bordered="false"
          :padding="0"
        >
          <Table
            :columns="columns"
            :data="tableData"
            ref="table"
            height="380"
          ></Table>
        </Card>
      </i-Col>
    </Row>
  </div>
</template>
<script>
import APIservice from "../service/stock.service.js";
import * as echarts from "echarts";
export default {
  data() {
    return {
      blockRow: 2,
      blockList: [],
      tableHeight: 250,
      columns: [
        {
          title: "上传时间",
          key: "createTime",
        },
        {
          title: "唯一标识符",
          key: "productId",
        },
        {
          title: "认证Hash",
          key: "hash",
        },
        // {
        //   title: '区块高度',
        //   key: 'height',
        // },
      ],
      tableData: [],
      echartData: {
        xData: [],
        yData: [],
      },
    };
  },
  created() {},
  mounted() {
    // this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 300;
    this.myEcharts();
    this.getOrderData();
    this.getBusinessVolume();
    this.getBlockQuery();
  },
  methods: {
    myEcharts() {
      let myChart = echarts.init(document.getElementById("echartsBox"));
      // 指定图表的配置项和数据
      let option = {
        legend: {
          show: true,
        },
        xAxis: {
          axisLabel: {
            interval: 0, //X轴信息全部展示
            rotate: 10, //60 标签倾斜的角度
          },
          type: "category",
          name: "时间/天",
          boundaryGap: true,
          data: this.echartData.xData,
        },
        yAxis: {
          type: "value",
          name: "上传数据量/条",
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
              color: "green",
            },
            {
              gt: 2,
              lte: 3,
              color: "red",
            },
            {
              gt: 3,
              lte: 4,
              color: "green",
            },
            {
              gt: 4,
              lte: 6,
              color: "red",
            },
          ],
        },
        series: [
          {
            name: "交易统计表",
            type: "line",
            data: this.echartData.yData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    //自定义数据
    async getBlockQuery() {
      const res = await APIservice.getBlockQuery();
      this.blockList = res.reverse();
      this.blockList = this.defineDataEvent(this.blockList);
      this.blockList.forEach((item, index) => {
        item.id = index + 1;
      });
      // 后台并没有返回code码 此处没有逻辑判断拦截
      // if (res.code === 0) {
      //   console.log('自定义数据', res)
      // } else {
      //   this.$Message.error(res.msg)
      // }
    },
    //获取折线信息
    async getBusinessVolume() {
      const res = await APIservice.getBusinessVolume();
      console.log(res);
      this.echartData.xData = this.echartDataEvent(res, "date");
      this.echartData.yData = this.echartDataEvent(res, "num");
      this.myEcharts();
      // 后台并没有返回code码 此处没有逻辑判断拦截
      // if (res.code === 0) {
      //   console.log("折线数据", res.data);
      // } else {
      //   this.$Message.error(res.msg);
      // }
    },
    //获取表格数据
    async getOrderData() {
      const res = await APIservice.getOrderData();
      this.tableData = res;
      // 后台并没有返回code码 此处没有逻辑判断拦截
      // if (res.code === 0) {
      //   console.log("表格数据", res.data);
      // } else {
      //   this.$Message.error(res.msg);
      // }
    },
    /**
     * 数据处理转换成echarts
     *  @param  {Array} params {String} key
     *  @return {Array}
     * */
    echartDataEvent(params, key = "name") {
      let array = params.map((item) => item[key]);
      return array;
    },
    /**
     * 自定义数据处理后五个的排序此方法只是针对自定义的数据进行处理
     * @param {Array} param
     * @return {Array}
     */
    defineDataEvent(param) {
      var newArr = param.slice(0, 5);
      var newArrSort = param.slice(5).reverse();
      return newArr.concat(newArrSort);
    },
  },
};
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