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
    mounted () {
        this.type=this.$route.query.type
        console.log(this.type)
        this.getDataEvent(this.type)
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
                            columns:[
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
                            ],
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
                            columns:[
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
                            ],
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
                case 0:
                    console.log("test11")
                    break; 
                default: 
                  console.log("test22")
            } 
        }
    }
}
</script>