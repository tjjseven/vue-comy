/* eslint-disable */
<template>
  <el-row id="foots">
    <el-col :span="8"><div class="grid-content bg-purple">{{footer[0]}}</div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light">{{footer[1]}}</div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">{{footer[2]}}</div></el-col>
  </el-row>
</template>
<script>
  export default{
    name : "foots",
    data(){
      return{
        footer : ['首页','消息','关于']
      }
    }
  }
</script>
<style lang="less">
  #foots{
    color:#fff;
    .el-col{
       line-height: 60px;
     }
  }

</style>
