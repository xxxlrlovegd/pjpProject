<template>
      <a :href="downUrl" target="_blank" :download="downNm">下载{{ downTplNm }}文件</a>
</template>
<script>
export default {
    data () {
        return {
            downUrl :"./tpls/接口文档SDK.zip",
            downNm :"接口文档SDK",
            downTplNm:"SDK",
        }
    }
}
</script>