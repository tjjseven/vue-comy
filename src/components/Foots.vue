<template>
    <el-row id="foots">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <router-link to='/'>{{footer[0]}}</router-link>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <div class="grid-content bg-purple">
            <router-link to='/message'>{{footer[1]}}</router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <router-link to='/about'>{{footer[2]}}</router-link>
        </div>
      </el-col>
    </el-row>
</template>
<script>
  export default{
    name: 'foots',
    data () {
      return {
        footer: ['首页', '消息', '关于']
      }
    }
  }
</script>
<style lang="less">
  #foots{
    text-align: center;
    .actClass{
      color: #41b883;
    }
    .el-col{
      line-height: 60px;
    }
  }

</style>
