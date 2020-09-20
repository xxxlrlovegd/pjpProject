<template>
      <a :href="downUrl" target="_blank" :download="downNm">下载{{ downTplNm }}文件</a>
</template>
<script>
export default {
    data () {
        return {
             downUrl :"../tpls/接口文档.pdf",
      downNm :"接口文档.pdf",
      downTplNm:"接口文档",
        }
    }
}
</script>