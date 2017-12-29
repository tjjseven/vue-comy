<template>
  <div class="index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="labelName[0]" name="first">
        <!--滑动区域-->
        <Scroll/>

      </el-tab-pane>
      <el-tab-pane :label="labelName[1]" name="second">配置管理</el-tab-pane>
      <el-tab-pane :label="labelName[2]" name="third">角色管理</el-tab-pane>
      <el-tab-pane :label="labelName[3]" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane :label="labelName[4]" name="five">定时任务补偿</el-tab-pane>
      <el-tab-pane :label="labelName[5]" name="sex">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Scroll from './Scroll'
  export default {
  name: 'index',
  components:{
    Scroll
  },
  data () {
    return {
      labelName : ['全部','精华','分享','问答','weex','招聘'],
      activeName: 'first',
    }
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
//      console.log(tab, event);
    }

  }
}
</script>

<style lang="less">
  .index,.el-tabs,.el-tabs__content,.el-tab-pane{
    height:100%
  }
  .el-tabs__header{
    /*position: absolute;*/
    /*background: #fff;*/
  }
  .el-tabs__content{
    /*padding-top: 45px;*/
  }
  #dataList>li{
    font-size: .7rem;
    text-align: left;
    word-break: break-all;
    padding: .6rem;
    margin-bottom: .2rem;
    border-bottom: 2px solid #e4e7e1;
  }
  /*超过两行显示省略号*/
  .data_title{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }

</style>
