<template>
  <div class="index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="navMsg[0].label" name="first">
        <!--滑动区域-->
        <Scroll :tab="navMsg[0].tab" scroll="scroll1"/>
      </el-tab-pane>
      <el-tab-pane :label="navMsg[1].label" name="second">
        <Scroll :tab="navMsg[1].tab" scroll="scroll2"/>
      </el-tab-pane>
      <el-tab-pane :label="navMsg[2].label" name="third">
        <Scroll :tab="navMsg[2].tab" scroll="scroll3"/>
      </el-tab-pane>
      <el-tab-pane :label="navMsg[3].label" name="fourth">
        <Scroll :tab="navMsg[3].tab" scroll="scroll4"/>
      </el-tab-pane>
      <el-tab-pane :label="navMsg[4].label" name="five">
        <Scroll :tab="navMsg[4].tab" scroll="scroll5"/>
      </el-tab-pane>
      <el-tab-pane :label="navMsg[5].label" name="sex">
        <Scroll :tab="navMsg[5].tab" scroll="scroll6"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Scroll from './Scroll'
  export default {
    name: 'index',
    components: {
      Scroll
    },
    data () {
      return {
        navMsg: [
          { label: '全部', tab: 'all' },
          { label: '精华', tab: 'good' },
          { label: '分享', tab: 'share' },
          { label: '问答', tab: 'ask' },
          { label: 'weex', tab: 'weex' },
          { label: '招聘', tab: 'job' }
        ],
        activeName: 'first'
      }
    },
    mounted () {
    },
    methods: {
      handleClick (tab, event) {
  //      console.log(tab, event);
      }

    }
  }
</script>

<style lang="less">
  .index,.el-tabs,.el-tab-pane{
    height:100%
  }
  .el-tabs__header{
}
  .el-tabs__content{
    height:calc(100% - 10px)
  }
  #dataList>li{
    font-size: .7rem;
    text-align: left;
    word-break: break-all;
    padding: .6rem 1rem;
    margin-bottom: .2rem;
    border-bottom: 2px solid #e4e7e1;
    a{
      color: #000;
    }
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
