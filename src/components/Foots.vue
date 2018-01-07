<template>
  <mt-tabbar id="foots" fixed>
    <mt-tab-item>
      <router-link to='/'>{{footer[0]}}</router-link>
    </mt-tab-item>
    <mt-tab-item>
      <router-link to='/message'>{{footer[1]}}</router-link>
    </mt-tab-item>
    <mt-tab-item>
      <router-link to='/about'>{{footer[2]}}</router-link>
    </mt-tab-item>
  </mt-tabbar>
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
    .mint-tab-item-label{
      font-size:14px;
    }
    .actClass{
      color: #41b883;
    }
    .mint-tab-item{
      background:#1f2d3d;
      padding: 0;
    }
    .mint-tab-item-label a{
      padding: 18px 0;
      display: block;
    }
  }

</style>
