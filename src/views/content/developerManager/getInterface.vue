<template>
    <div class="getInterface">
          <List :split="false">
                <template slot="header">
                 <h2>{{dataList.title}}</h2>
            </template>
            <ListItem>{{dataList.describe}}</ListItem>
            <ListItem> <h5>请求地址</h5></ListItem>
            <ListItem><span>{{dataList.url}}</span></ListItem>
            <ListItem> <h5>请求参数</h5></ListItem>
            <ListItem> <Table border  :columns="dataList.request.columns" :data="dataList.request.data"></Table></ListItem>
            <ListItem> <h5>返回参数</h5></ListItem>
            <ListItem><Table border  :columns="dataList.return.columns" :data="dataList.return.data"></Table></ListItem>
        </List>
    </div>
</template>
<script>
    const rqcolums=[
        {
        title: '名称',
        key: 'name',
        },
        {
        title: '类型',
        key: 'type',
        },
        {
        title: '含义',
        key: 'mean',
        },
        {
        title: '是否必要',
        key: 'need',
        },
        {
        title: '备注',
        key: 'remark',
        },
    ];
    const rtcolums=[
    {
    title: '字段名',
    key: 'name',
    },
        {
    title: '含义',
    key: 'mean',
    },
    {
    title: '类型',
    key: 'type',
    },
    {
    title: '是否必要',
    key: 'need',
    },
    {
    title: '备注',
    key: 'remark',
    },
];
export default {
    data () {
        return {
            type:'',
            dataList:{
                title:'',
                describe:'',
                url:'',
                request:{
                    columns:[],
                    data:[],
                },
                return:{
                    columns:[],
                    data:[],
                }
            }
        }
    },
    created(){
        this.dataList={
                title:'',
                describe:'',
                url:'',
                request:{
                    columns:[],
                    data:[],
                },
                return:{
                    columns:[],
                    data:[],
                }
            }
    },
    mounted () {
        this.type=this.$route.query.type
        console.log(this.type)
        this.getDataEvent(this.type)
    },
    watch: {
      $route(){
          this.type=this.$route.query.type
      },
      type() {
        this.getDataEvent(this.type)
      },
    },
    methods: {
        getDataEvent(type){
            switch (type) {
                case 'wybsm':
                 this.dataList={
                        title:'获取唯一标识码接口',
                        describe:'获取一条唯一标识码,注册到平台,并将该唯一标识 Id 返回给调用者。',
                        url:'http://ip:port/upload/getProductId',
                        request:{
                            columns:rqcolums,
                            data:[
                                {
                                    name:'credential',
                                    type:'String',
                                    mean:'令牌',
                                    need:'是',
                                    remark:'请求参数',
                                }
                            ],
                        },
                        return:{
                            columns:rtcolums,
                            data:[
                                {
                                    name:'code',
                                    mean:'错误代码',
                                    type:'String',
                                    need:'是',
                                    remark:'成功：0000/失败 9999',
                                },
                                {
                                    name:'message',
                                    mean:'错误信息',
                                    type:'String',
                                    need:'是',
                                    remark:'成功：成功/失败：失败+原因',
                                },
                                 {
                                    name:'msgBody',
                                    mean:'唯一标识码',
                                    type:'String',
                                    need:'是',
                                    remark:'唯一标识码',
                                }
                            ],
                        }
                    };
                    break; 
                case 'plwybsm':
                    this.dataList={
                        title:'批量获取唯一标识码接口',
                        describe:'批量获取多条唯一标识码,注册到后台,并将获取的多条唯一标识码返回给调用者。',
                        url:'http://ip:port/upload/getProductIdList',
                        request:{
                            columns:rqcolums,
                            data:[
                                {
                                    name:'credential',
                                    type:'String',
                                    mean:'令牌',
                                    need:'是',
                                    remark:'',
                                },
                                {
                                    name:'num',
                                    type:'int',
                                    mean:'数量',
                                    need:'是',
                                    remark:'获取数量（<=1000）',
                                }
                            ],
                        },
                        return:{
                            columns:rtcolums,
                            data:[
                                {
                                    name:'code',
                                    mean:'错误代码',
                                    type:'String',
                                    need:'是',
                                    remark:'成功：0000/失败 9999',
                                },
                                {
                                    name:'message',
                                    mean:'错误信息',
                                    type:'String',
                                    need:'是',
                                    remark:'成功：成功',
                                },
                                 {
                                    name:'msgBody',
                                    mean:'返回结果集',
                                    type:'List<String>',
                                    need:'是',
                                    remark:'',
                                }
                            ],
                        }
                    };
                    break; 
                    case 'dtsj':
                    this.dataList={
                        title:'单条数据上链接口',
                        describe:'将数据保存到区块链上,并将保存返回的交易哈希保存到后台,并将交易哈希返回给调用者。',
                        url:'http://ip:port/upload/uploadInfo',
                        request:{
                            columns:rqcolums,
                            data:[
                                {
                                    name:'credential',
                                    type:'String',
                                    mean:'令牌',
                                    need:'是',
                                    remark:'平台唯一',
                                },
                                {
                                    name:'productId',
                                    type:'String',
                                    mean:'唯一标识码',
                                    need:'是',
                                    remark:'',
                                },
                                 {
                                    name:'depositMessage',
                                    type:'String',
                                    mean:'上链数据',
                                    need:'是',
                                    remark:'',
                                }
                            ],
                        },
                        return:{
                            columns:rtcolums,
                            data:[
                                {
                                    name:'code',
                                    mean:'错误代码',
                                    type:'String',
                                    need:'是',
                                    remark:'成功：0000/失败 9999',
                                },
                                {
                                    name:'message',
                                    mean:'错误信息',
                                    type:'String',
                                    need:'是',
                                    remark:'成功：成功/失败：”失败”+错误原因',
                                },
                                 {
                                    name:'msgBody',
                                    mean:'返回结果集',
                                    type:'String',
                                    need:'是',
                                    remark:'单条数据 hash值',
                                }
                            ],
                        }
                    };
                    break; 
                    case 'plsj':
                        this.dataList={
                            title:'批量数据上链接口',
                            describe:'将多条不同数据保存到区块链上,并将保存返回的交易哈希保存到后台,并将交易哈希返回给调用者。',
                            url:'http://ip:port/upload/asynUploadInfoList',
                            request:{
                                columns:rqcolums,
                                data:[
                                    {
                                        name:'credential',
                                        type:'String',
                                        mean:'令牌',
                                        need:'是',
                                        remark:'平台唯一',
                                    },
                                    {
                                        name:'uploadBodyList',
                                        type:'List<uploadBody>',
                                        mean:'唯一标识码',
                                        need:'是',
                                        remark:'',
                                    },
                                ],
                            },
                            return:{
                                columns:rtcolums,
                                data:[
                                    {
                                        name:'code',
                                        mean:'错误代码',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：0000/失败 9999/部分成功：1111',
                                    },
                                    {
                                        name:'message',
                                        mean:'错误信息',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：成功/失败：”失败”+错误原因/部分成功：部分成功+失败productId:+错误信息',
                                    },
                                    {
                                        name:'msgBody',
                                        mean:'返回结果集',
                                        type:'List<uploadResult>',
                                        need:'是',
                                        remark:'',
                                    }
                                ],
                            }
                        };
                    break; 
                     case 'hashsj':
                        this.dataList={
                            title:'哈希值信息单条查询接口',
                            describe:'根据之前上链成功返回的交易哈希来查询该交易哈希在区块链上保存的数据信息。并将信息返回。',
                            url:'http://ip:port/search/getMsgByHash',
                            request:{
                                columns:rqcolums,
                                data:[
                                    {
                                        name:'credential',
                                        type:'String',
                                        mean:'令牌',
                                        need:'是',
                                        remark:'平台唯一',
                                    },
                                    {
                                        name:'txHash',
                                        type:'String',
                                        mean:'交易哈希值',
                                        need:'是',
                                        remark:'交易哈希值',
                                    },
                                ],
                            },
                            return:{
                                columns:rtcolums,
                                data:[
                                    {
                                        name:'code',
                                        mean:'错误代码',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：0000/失败 9999',
                                    },
                                    {
                                        name:'message',
                                        mean:'错误信息',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：成功/失败：”失败”+错误原因',
                                    },
                                    {
                                        name:'msgBody',
                                        mean:'链上信息',
                                        type:'depositInfo',
                                        need:'是',
                                        remark:'链上信息',
                                    }
                                ],
                            }
                        };
                    break; 
                    case 'wybsxxm':
                        this.dataList={
                            title:'唯一标识码信息单条查询接口',
                            describe:'根据唯一标识码(ProductId)查询在区块链上与该标识码相关的所有数据信息。并将查询到的信息返回。',
                            url:'http://ip:port/search/getMsgById',
                            request:{
                                columns:rqcolums,
                                data:[
                                    {
                                        name:'credential',
                                        type:'String',
                                        mean:'令牌',
                                        need:'是',
                                        remark:'平台唯一',
                                    },
                                    {
                                        name:'productId',
                                        type:'String',
                                        mean:'唯一标识码',
                                        need:'是',
                                        remark:'唯一标识码',
                                    },
                                ],
                            },
                            return:{
                                columns:rtcolums,
                                data:[
                                    {
                                        name:'code',
                                        mean:'错误代码',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：0000/失败 9999',
                                    },
                                    {
                                        name:'message',
                                        mean:'错误信息',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：成功/失败：”失败”+错误原因',
                                    },
                                    {
                                        name:'msgBody',
                                        mean:'存证数据集合',
                                        type:'list<depositInfo>',
                                        need:'是',
                                        remark:'链上数据集合',
                                    }
                                ],
                            }
                        };
                    break; 
                 case 'plwybsxxm':
                        this.dataList={
                            title:'唯一标识码信息批量查询接口',
                            describe:'根据唯一标识码批量查询在区块链上与这些标识码相关的所有数据信息。并将查询到的信息返回。',
                            url:'http://ip:port/search/getMsgByIdList',
                            request:{
                                columns:rqcolums,
                                data:[
                                    {
                                        name:'credential',
                                        type:'String',
                                        mean:'令牌',
                                        need:'是',
                                        remark:'平台唯一',
                                    },
                                    {
                                        name:'productIdList',
                                        type:'List<String>',
                                        mean:' 唯一标识码集合',
                                        need:'是',
                                        remark:' 唯一标识码集合',
                                    },
                                ],
                            },
                            return:{
                                columns:rtcolums,
                                data:[
                                    {
                                        name:'code',
                                        mean:'错误代码',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：0000/失败 9999/部分成功：1111',
                                    },
                                    {
                                        name:'message',
                                        mean:'错误信息',
                                        type:'String',
                                        need:'是',
                                        remark:'成功：成功/失败：”失败”+错误原因/部分成功：”部分成功”+失败原因 map',
                                    },
                                    {
                                        name:'msgBody',
                                        mean:'存证数据集合',
                                        type:'List<ProductInfo>',
                                        need:'是',
                                        remark:'产品信息集合',
                                    }
                                ],
                            }
                        };
                    break; 
            } 
        }
    }
}
</script>